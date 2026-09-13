#!/bin/sh
set -eu

# ==============================================================
# Script de instalação — API Rede.Médica (Docker)
# Uso: sudo bash install_redemedica.sh          (instalar)
#       sudo bash install_redemedica.sh uninstall (desinstalar)
#
# API REST com Fastify + SQLite (node:sqlite built-in) em container
# Docker. O site estático é servido pelo GitHub Pages; este script
# sobe apenas a API/SQLite, exposta em
# https://api.projetosdinamicos.com.br/redemedica/ via location no Nginx
# (mesmo padrão do install_crebortoli.sh).
# Requer: Debian 11+ (sudo apt para dependências)
# ==============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INSTALL_DIR="/var/www/redemedica"
SRC_DIR="$INSTALL_DIR/api/src"
NGINX_CONF="/etc/nginx/sites-available/default"
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { printf "${GREEN}[INFO]${NC} %s\n" "$1"; }
warn()  { printf "${YELLOW}[WARN]${NC} %s\n" "$1" >&2; }
error() { printf "${RED}[ERRO]${NC} %s\n" "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || error "Execute como root: sudo bash install_redemedica.sh"


# ==============================================================
# Uninstall
# ==============================================================
uninstall() {
  echo ""
  info "===== Iniciando desinstalação da API Rede.Médica (Docker) ====="

  echo ""

  [ -f "$INSTALL_DIR/.env" ] && . "$INSTALL_DIR/.env" || true

  dname="${COMPOSE_PROJECT_NAME:-redemedica}"

  _dc_cmd="docker compose"
  docker compose version >/dev/null 2>&1 || _dc_cmd="docker-compose"

  echo ""
  info "[1/4] Parando e removendo containers Docker ($dname)..."
  if [ -f "$INSTALL_DIR/docker-compose.yml" ]; then
    $_dc_cmd -f "$INSTALL_DIR/docker-compose.yml" down -v --rmi local 2>/dev/null && \
      info "Containers, volumes e imagens do projeto removidos" || \
      warn "Falha ao derrubar containers"
  else
    warn "docker-compose.yml não encontrado"
  fi

  echo ""
  info "[2/4] Removendo configuracao nginx..."
  NGINX_LOCATIONS="/etc/nginx/${dname}-locations.conf"
  rm -f "$NGINX_LOCATIONS" && info "${NGINX_LOCATIONS} removido" || warn "Falha ao remover ${NGINX_LOCATIONS}"
  sed -i "/${dname}-locations.conf/d" "$NGINX_CONF" 2>/dev/null || true
  sed -i "/# BEGIN ${dname}_site/,/# END ${dname}_site/d" "$NGINX_CONF" 2>/dev/null || true
  if nginx -t 2>/dev/null; then
    systemctl reload nginx.service 2>/dev/null && info "Nginx recarregado" || warn "Falha ao recarregar nginx"
  else
    warn "Configuração do nginx inválida — verifique manualmente"
  fi

  echo ""
  info "[3/4] Removendo imagens Docker do projeto..."
  dimg=$(printf '%s' "$dname" | tr '[:upper:]' '[:lower:]')
  for img in "${dimg}-api:latest" "${dimg}_api:latest"; do
    docker images -q "$img" 2>/dev/null | xargs -r docker rmi -f 2>/dev/null || true
  done
  [ -z "$(docker images -q "${dimg}-api:latest" "${dimg}_api:latest" 2>/dev/null)" ] && \
    info "Imagens Docker do projeto removidas" || warn "Falha ao remover algumas imagens"

  echo ""
  info "[4/4] Removendo diretório $INSTALL_DIR..."
  rm -rf "$INSTALL_DIR" && info "Diretório $INSTALL_DIR removido com sucesso" || warn "Falha ao remover diretório $INSTALL_DIR"

  echo ""
  info "Desinstalação concluída!"
}

case "${1:-}" in
  uninstall) uninstall; exit 0 ;;
esac

echo ""
info "===== Iniciando instalação da API Rede.Médica (Docker) ====="
echo ""


# --------------------------------------------------------------
# Checagem de dependências — Debian 11+ (Magalu Cloud)
# --------------------------------------------------------------
info "===== Verificando dependências do servidor ====="

_apt_update_done=0
_apt_update() {
  if [ "$_apt_update_done" -eq 0 ]; then
    info "Executando apt-get update..."
    apt-get update -qq || error "Falha ao executar apt-get update"
    _apt_update_done=1
  fi
}

# Verificar Debian/Ubuntu
if [ ! -f /etc/debian_version ]; then
  error "Este script requer Debian 11+ ou Ubuntu. /etc/debian_version não encontrado."
fi
DEB_VER=$(cat /etc/debian_version 2>/dev/null || echo "desconhecido")
info "Sistema: Debian $DEB_VER"

# curl — necessário para download e healthcheck
if ! command -v curl >/dev/null 2>&1; then
  warn "curl não encontrado — instalando..."
  _apt_update && apt-get install -y -qq curl
  command -v curl >/dev/null 2>&1 && info "curl instalado" || error "Falha ao instalar curl"
else
  info "curl: $(curl --version 2>&1 | head -1)"
fi

# openssl — necessário para gerar API_TOKEN
if ! command -v openssl >/dev/null 2>&1; then
  warn "openssl não encontrado — instalando..."
  _apt_update && apt-get install -y -qq openssl
  command -v openssl >/dev/null 2>&1 && info "openssl instalado" || error "Falha ao instalar openssl"
else
  info "openssl: $(openssl version 2>&1)"
fi

# ss ou lsof — necessário para verificar portas
if ! command -v ss >/dev/null 2>&1 && ! command -v lsof >/dev/null 2>&1; then
  warn "ss/lsof não encontrado — instalando iproute2..."
  _apt_update && apt-get install -y -qq iproute2
  command -v ss >/dev/null 2>&1 && info "ss instalado" || warn "ss não disponível — verificação de portas limitada"
else
  info "ss/lsof: disponível"
fi

# fuser — necessário para liberar portas
if ! command -v fuser >/dev/null 2>&1; then
  warn "fuser não encontrado — instalando psmisc..."
  _apt_update && apt-get install -y -qq psmisc
  command -v fuser >/dev/null 2>&1 && info "fuser instalado" || warn "fuser não disponível"
fi


# --------------------------------------------------------------
# Docker Engine — instala via apt se não existir
# --------------------------------------------------------------
info "Verificando Docker Engine..."
if ! command -v docker >/dev/null 2>&1; then
  warn "Docker não encontrado — instalando docker.io via apt..."
  _apt_update && apt-get install -y -qq docker.io
  systemctl enable --now docker
  sleep 2
  if docker --version >/dev/null 2>&1; then
    info "Docker instalado: $(docker --version)"
  else
    error "Falha ao instalar Docker Engine"
  fi
else
  info "Docker: $(docker --version 2>&1)"
fi

# Verificar se Docker daemon está rodando
if ! docker info >/dev/null 2>&1; then
  warn "Docker daemon não está rodando — tentando iniciar..."
  systemctl start docker 2>/dev/null || service docker start 2>/dev/null
  sleep 3
  docker info >/dev/null 2>&1 || error "Docker daemon não está rodando. Verifique: systemctl status docker"
fi
info "Docker daemon: ativo"


# --------------------------------------------------------------
# Docker Compose — plugin ou standalone
# --------------------------------------------------------------
info "Verificando Docker Compose..."
DOCKER_COMPOSE_CMD=""
if docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD="docker compose"
  info "Docker Compose (plugin): $(docker compose version --short 2>/dev/null || echo 'ok')"
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD="docker-compose"
  info "Docker Compose (standalone): $(docker-compose --version 2>&1)"
else
  warn "Docker Compose não encontrado — instalando plugin..."
  _apt_update && apt-get install -y -qq docker-compose-plugin 2>/dev/null || \
    apt-get install -y -qq docker-compose 2>/dev/null || {
      # Fallback: instalar standalone via curl
      warn "apt falhou — instalando docker-compose standalone via curl..."
      COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)
      curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
        -o /usr/local/bin/docker-compose
      chmod +x /usr/local/bin/docker-compose
    }
  if docker compose version >/dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker compose"
    info "Docker Compose (plugin) instalado: $(docker compose version --short 2>/dev/null || echo 'ok')"
  elif docker-compose --version >/dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker-compose"
    info "Docker Compose (standalone) instalado: $(docker-compose --version 2>&1)"
  else
    error "Falha ao instalar Docker Compose — instale manualmente"
  fi
fi


# --------------------------------------------------------------
# Nginx
# --------------------------------------------------------------
info "Verificando Nginx..."
if ! command -v nginx >/dev/null 2>&1; then
  warn "Nginx não encontrado — instalando..."
  _apt_update && apt-get install -y -qq nginx
  systemctl enable nginx 2>/dev/null || true
  systemctl start nginx 2>/dev/null || true
  command -v nginx >/dev/null 2>&1 && info "Nginx instalado" || error "Falha ao instalar Nginx"
else
  info "Nginx: $(nginx -v 2>&1)"
fi


# --------------------------------------------------------------
# Resumo das dependências
# --------------------------------------------------------------
info "===== Resumo das dependências ====="
info "  Docker:         $(docker --version 2>&1 | awk '{print $3}' | tr -d ',')"
info "  Docker Compose: $($DOCKER_COMPOSE_CMD version --short 2>/dev/null || $DOCKER_COMPOSE_CMD --version 2>&1 | awk '{print $NF}')"
info "  Nginx:          $(nginx -v 2>&1 | awk -F/ '{print $2}')"
info "  curl:           $(curl --version 2>&1 | head -1 | awk '{print $2}')"
info "  openssl:        $(openssl version 2>&1 | awk '{print $2}')"
info "===================================="


# --------------------------------------------------------------
# Inputs do usuário
# --------------------------------------------------------------
echo "============ Configuração da instalação ============"

_check_port() {
  local p=$1
  if command -v ss >/dev/null 2>&1; then
    ss -tlnp "sport = :$p" 2>/dev/null | grep -qv 'State.*Recv-Q' && return 0
  elif command -v lsof >/dev/null 2>&1; then
    lsof -i:"$p" 2>/dev/null | grep -q LISTEN && return 0
  fi
  return 1
}

while :; do
  printf "Porta do app (host) [3001]: "; read -r APP_PORT
  APP_PORT=${APP_PORT:-3001}
  if _check_port "$APP_PORT"; then
    warn "Porta $APP_PORT já está em uso!"
    printf "  (M)atar processo, (T)rocar porta, (C)ancelar [M/t/c]: "; read -r PORT_ACT
    case "$PORT_ACT" in
      [Tt]) continue ;;
      [Cc]) error "Instalação cancelada pelo usuário" ;;
      *)
        fuser -k "$APP_PORT/tcp" 2>/dev/null && info "Processo na porta $APP_PORT encerrado" || warn "Não foi possível encerrar — tente trocar a porta"
        sleep 1
        ;;
    esac
  fi
  break
done
info "Porta definida: $APP_PORT"

printf "Nome do projeto Docker/compose [redemedica]: "; read -r COMPOSE_PROJECT_NAME
COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME:-redemedica}; info "COMPOSE_PROJECT_NAME: $COMPOSE_PROJECT_NAME"
APP_DOMAIN=api.projetosdinamicos.com.br


# --------------------------------------------------------------
# Criar diretórios
# --------------------------------------------------------------
info "Criando diretórios..."
mkdir -p "$SRC_DIR" && info "Diretórios criados: $SRC_DIR" || warn "Erro ao criar diretórios"


# --------------------------------------------------------------
# .env  (usado pelo docker-compose e pelo container)
# --------------------------------------------------------------
API_TOKEN=$(openssl rand -hex 16 2>/dev/null || echo "$(date +%s)$RANDOM" | md5sum | head -c 32)
info "Criando .env (PORT=$APP_PORT, API_TOKEN gerado)"
cat > "$INSTALL_DIR/.env" <<ENVEOF
# App
PORT=$APP_PORT
API_TOKEN=$API_TOKEN
API_WRITE_KEY=$API_TOKEN
COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME
PROJECT_NAME=rede.medica

# Banco de dados SQLite (arquivo dentro do volume /data)
DB_PATH=/data/rede.medica.db

PM2_APP_NAME=$COMPOSE_PROJECT_NAME
ENVEOF
chmod 600 "$INSTALL_DIR/.env" && info "Permissões do .env ajustadas (600)" || warn "Falha ao ajustar permissões"


# --------------------------------------------------------------
# package.json
# --------------------------------------------------------------
info "Criando package.json"
cat > "$INSTALL_DIR/api/package.json" <<'JSONEOF'
{
  "name": "redemedica-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js"
  },
  "dependencies": {
    "@fastify/cors": "^9.0.0",
    "@fastify/static": "^7.0.0",
    "dotenv": "^16.4.0",
    "fastify": "^4.28.0"
  }
}
JSONEOF


# --------------------------------------------------------------
# servicos.json (dados iniciais — copiado para o container)
# --------------------------------------------------------------
info "Criando servicos.json"
cat > "$INSTALL_DIR/servicos.json" <<'SVCEOF'
{
  "servicos": [
    { "id": "consulta_geral", "nome": "Consulta Clínica Geral", "categoria": "Consulta", "preco": 150, "duracao_minutos": 30, "ativo": 1 },
    { "id": "consulta_pediatria", "nome": "Consulta Pediátrica", "categoria": "Consulta", "preco": 180, "duracao_minutos": 30, "ativo": 1 },
    { "id": "consulta_cardiologia", "nome": "Consulta Cardiologia", "categoria": "Consulta", "preco": 250, "duracao_minutos": 40, "ativo": 1 },
    { "id": "consulta_retorno", "nome": "Consulta de Retorno", "categoria": "Consulta", "preco": 90, "duracao_minutos": 20, "ativo": 1 },
    { "id": "exame_laboratorial", "nome": "Exames Laboratoriais", "categoria": "Exames", "preco": 120, "duracao_minutos": 15, "ativo": 1 },
    { "id": "eletrocardiograma", "nome": "Eletrocardiograma (ECG)", "categoria": "Exames", "preco": 100, "duracao_minutos": 20, "ativo": 1 },
    { "id": "checkup", "nome": "Check-up Completo", "categoria": "Exames", "preco": 450, "duracao_minutos": 60, "ativo": 1 }
  ]
}
SVCEOF
info "servicos.json criado"


# --------------------------------------------------------------
# categorias.json (dados iniciais — copiado para o container)
# --------------------------------------------------------------
info "Criando categorias.json"
cat > "$INSTALL_DIR/categorias.json" <<'CATEOF'
{
  "categorias": [
    { "id": "clinica_geral", "nome": "Clínica Geral", "descricao": "Consultas de clínica geral e medicina de família", "ativo": 1 },
    { "id": "pediatria", "nome": "Pediatria", "descricao": "Saúde da criança e do adolescente", "ativo": 1 },
    { "id": "cardiologia", "nome": "Cardiologia", "descricao": "Saúde do coração e do sistema circulatório", "ativo": 1 },
    { "id": "dermatologia", "nome": "Dermatologia", "descricao": "Saúde da pele, cabelos e unhas", "ativo": 1 },
    { "id": "ginecologia", "nome": "Ginecologia e Obstetrícia", "descricao": "Saúde da mulher", "ativo": 1 },
    { "id": "ortopedia", "nome": "Ortopedia", "descricao": "Saúde do sistema musculoesquelético", "ativo": 1 },
    { "id": "psicologia", "nome": "Psicologia", "descricao": "Saúde mental e bem-estar emocional", "ativo": 1 },
    { "id": "nutricao", "nome": "Nutrição", "descricao": "Alimentação saudável e reeducação nutricional", "ativo": 1 }
  ]
}
CATEOF
info "categorias.json criado"


# --------------------------------------------------------------
# src/server.js
# --------------------------------------------------------------
info "Criando src/server.js"
cat > "$SRC_DIR/server.js" <<'SVREOF'
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';
import { DatabaseSync } from 'node:sqlite';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const fastify = Fastify({ logger: true });

const PROJECT_NAME = process.env.PROJECT_NAME || 'rede.medica';
const DB_PATH = process.env.DB_PATH || path.join(PROJECT_ROOT, 'data', PROJECT_NAME + '.db');
const DB_DIR = path.dirname(DB_PATH);

const TABLE_DEFS = {
  agendamentos: {
    builtin: true,
    sql: 'id TEXT PRIMARY KEY, cliente TEXT, telefone TEXT, whatsapp TEXT, data TEXT, hora TEXT, servico TEXT, servico_nome TEXT, valor REAL, status TEXT DEFAULT \'PENDENTE\', observacoes TEXT, created_at TEXT',
    columns: ['id', 'cliente', 'telefone', 'whatsapp', 'data', 'hora', 'servico', 'servico_nome', 'valor', 'status', 'observacoes', 'created_at'],
  },
  medicos: {
    builtin: true,
    sql: 'id TEXT PRIMARY KEY, nome TEXT, especialidade TEXT, categoria TEXT, telefone TEXT, whatsapp TEXT, email TEXT, created_at TEXT',
    columns: ['id', 'nome', 'especialidade', 'categoria', 'telefone', 'whatsapp', 'email', 'created_at'],
  },
  pacientes: {
    builtin: true,
    sql: 'id TEXT PRIMARY KEY, nome TEXT, telefone TEXT, whatsapp TEXT, email TEXT, data_nascimento TEXT, created_at TEXT',
    columns: ['id', 'nome', 'telefone', 'whatsapp', 'email', 'data_nascimento', 'created_at'],
  },
  servicos: {
    builtin: true,
    sql: 'id TEXT PRIMARY KEY, nome TEXT, descricao TEXT, categoria TEXT, preco REAL, duracao_minutos INTEGER, ativo INTEGER DEFAULT 1, created_at TEXT',
    columns: ['id', 'nome', 'descricao', 'categoria', 'preco', 'duracao_minutos', 'ativo', 'created_at'],
  },
  categorias: {
    builtin: true,
    sql: 'id TEXT PRIMARY KEY, nome TEXT UNIQUE, descricao TEXT, ativo INTEGER DEFAULT 1, created_at TEXT',
    columns: ['id', 'nome', 'descricao', 'ativo', 'created_at'],
  },
  configuracoes: {
    builtin: true,
    sql: 'id TEXT PRIMARY KEY, chave TEXT UNIQUE, valor TEXT, updated_at TEXT',
    columns: ['id', 'chave', 'valor', 'updated_at'],
  },
};

let db;
function getDb() {
  if (!db) {
    fs.mkdirSync(DB_DIR, { recursive: true });
    db = new DatabaseSync(DB_PATH);
    db.exec('PRAGMA journal_mode = WAL');
    db.exec('PRAGMA busy_timeout = 5000');
  }
  return db;
}

const validateProject = (p) => p === PROJECT_NAME;
const validateTable = (t) => /^[a-z_][a-z0-9_]{0,63}$/.test(t) && !t.startsWith('_') && !t.startsWith('sqlite_');
const validateColumn = (c) => /^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/.test(c);
const validateId = (id) => /^[a-zA-Z0-9_-]{1,128}$/.test(id);
const tableColumns = (table) => (hasTable(table) ? TABLE_DEFS[table].columns : []);
const hasTable = (table) => Object.prototype.hasOwnProperty.call(TABLE_DEFS, table);

// --------------------------------------------------------------
// Autenticação — modo público (apenas pedidos de consulta) vs
// modo administrador (CRUD completo). Token definido em API_TOKEN.
// --------------------------------------------------------------
const ADMIN_TOKEN = process.env.API_TOKEN || process.env.API_WRITE_KEY || '';
const PUBLIC_READ_TABLES = ['servicos', 'categorias', 'medicos'];
const PUBLIC_CREATE_TABLES = ['agendamentos'];

function isAdminRequest(req) {
  if (!ADMIN_TOKEN) return false;
  const auth = req.headers['authorization'] || '';
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  return !!(m && m[1] === ADMIN_TOKEN);
}

function ensureBaseTables(database) {
  database.exec('CREATE TABLE IF NOT EXISTS "_schema" (id TEXT PRIMARY KEY, table_name TEXT UNIQUE, def TEXT, created_at TEXT)');
}

function loadDynamicTables(database) {
  const rows = database.prepare('SELECT table_name, def FROM "_schema"').all();
  for (const r of rows) {
    if (hasTable(r.table_name)) continue;
    try {
      const def = JSON.parse(r.def);
      TABLE_DEFS[r.table_name] = def;
      database.exec('CREATE TABLE IF NOT EXISTS "' + r.table_name + '" (' + def.sql + ')');
    } catch (e) {
      console.error('Erro ao recriar tabela dinamica ' + r.table_name + ':', e.message);
    }
  }
}

const COLUMN_MIGRATIONS = {
  medicos: [['categoria', 'TEXT'], ['whatsapp', 'TEXT']],
  pacientes: [['whatsapp', 'TEXT']],
  agendamentos: [['whatsapp', 'TEXT']],
};

function ensureColumns(database) {
  for (const [table, cols] of Object.entries(COLUMN_MIGRATIONS)) {
    try {
      const existing = database.prepare('PRAGMA table_info("' + table + '")').all().map(r => r.name);
      for (const [name, type] of cols) {
        if (!existing.includes(name)) {
          database.exec('ALTER TABLE "' + table + '" ADD COLUMN "' + name + '" ' + type);
          console.log('Migracao: coluna "' + name + '" adicionada em "' + table + '"');
        }
      }
    } catch (e) {
      console.error('Erro na migracao de ' + table + ':', e.message);
    }
  }
}

await fastify.register(cors, { origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] });
await fastify.register(fastifyStatic, { root: PROJECT_ROOT, prefix: '/', wildcard: false });

fastify.get('/health', async () => {
  const checks = {};
  try { getDb().prepare('SELECT 1').get(); checks[PROJECT_NAME] = 'ok'; }
  catch (err) { checks[PROJECT_NAME] = 'error'; }
  return { status: 'ok', projects: checks, timestamp: new Date().toISOString() };
});

fastify.get('/ping', async () => ({ pong: true }));

fastify.get('/:project/:table', async (req, res) => {
  const { project, table } = req.params;
  const { id } = req.query;
  if (!validateProject(project) || !validateTable(table) || !hasTable(table)) {
    return res.code(400).send({ error: 'Invalid request' });
  }
  if (!PUBLIC_READ_TABLES.includes(table) && !isAdminRequest(req)) {
    return res.code(401).send({ error: 'Acesso restrito ao administrador' });
  }
  if (id) {
    if (!validateId(id)) return res.code(400).send({ error: 'Invalid id' });
    const row = getDb().prepare('SELECT * FROM "' + table + '" WHERE id = ?').get(id);
    if (!row) return res.code(404).send({ error: 'Not found' });
    return res.send(row);
  }
  return res.send(getDb().prepare('SELECT * FROM "' + table + '" ORDER BY created_at DESC').all());
});

fastify.post('/:project/:table', async (req, res) => {
  const { project, table } = req.params;
  if (!validateProject(project) || !validateTable(table) || !hasTable(table)) {
    return res.code(400).send({ error: 'Invalid request' });
  }
  if (!PUBLIC_CREATE_TABLES.includes(table) && !isAdminRequest(req)) {
    return res.code(401).send({ error: 'Acesso restrito ao administrador' });
  }
  const data = (req.body && typeof req.body === 'object') ? req.body : {};
  const allowed = tableColumns(table);
  const clean = {};
  for (const [k, v] of Object.entries(data)) {
    if (validateColumn(k) && allowed.includes(k) && k !== 'id' && k !== 'created_at') {
      clean[k] = (v === undefined || v === '') ? null : v;
    }
  }
  clean.id = (data.id && validateId(data.id)) ? data.id : crypto.randomUUID();
  clean.created_at = new Date().toISOString();
  const cols = Object.keys(clean).map(c => '"' + c + '"').join(', ');
  const vals = Object.keys(clean).map(() => '?').join(', ');
  try {
    const row = getDb().prepare('INSERT INTO "' + table + '" (' + cols + ') VALUES (' + vals + ') RETURNING *').get(...Object.values(clean));
    return res.code(201).send(row);
  } catch (e) {
    return res.code(500).send({ error: e.message });
  }
});

fastify.put('/:project/:table', async (req, res) => {
  const { project, table } = req.params;
  const { id } = req.query;
  if (!validateProject(project) || !validateTable(table) || !hasTable(table) || !validateId(id)) {
    return res.code(400).send({ error: 'Invalid request' });
  }
  if (!isAdminRequest(req)) {
    return res.code(401).send({ error: 'Acesso restrito ao administrador' });
  }
  const data = (req.body && typeof req.body === 'object') ? req.body : {};
  const allowed = tableColumns(table);
  const clean = {};
  for (const [k, v] of Object.entries(data)) {
    if (validateColumn(k) && allowed.includes(k) && k !== 'id' && k !== 'created_at') {
      clean[k] = (v === undefined || v === '') ? null : v;
    }
  }
  if (!Object.keys(clean).length) return res.code(400).send({ error: 'No valid fields' });
  const sets = Object.keys(clean).map(c => '"' + c + '" = ?').join(', ');
  try {
    const row = getDb().prepare('UPDATE "' + table + '" SET ' + sets + ' WHERE id = ? RETURNING *').get(...Object.values(clean), id);
    if (!row) return res.code(404).send({ error: 'Not found' });
    return res.send(row);
  } catch (e) {
    return res.code(500).send({ error: e.message });
  }
});

fastify.delete('/:project/:table', async (req, res) => {
  const { project, table } = req.params;
  const { id } = req.query;
  if (!validateProject(project) || !validateTable(table) || !hasTable(table) || !validateId(id)) {
    return res.code(400).send({ error: 'Invalid request' });
  }
  if (!isAdminRequest(req)) {
    return res.code(401).send({ error: 'Acesso restrito ao administrador' });
  }
  const row = getDb().prepare('DELETE FROM "' + table + '" WHERE id = ? RETURNING id').get(id);
  if (!row) return res.code(404).send({ error: 'Not found' });
  return res.send({ success: true, deleted: true, id: row.id });
});

fastify.get('/api/tables', async () => {
  return Object.entries(TABLE_DEFS).map(([name, def]) => ({
    name,
    builtin: !!def.builtin,
    columns: def.columns,
  }));
});

fastify.get('/api/table/:table', async (req, res) => {
  const { table } = req.params;
  if (!hasTable(table)) {
    return res.code(404).send({ error: 'Tabela nao encontrada' });
  }
  return TABLE_DEFS[table];
});

fastify.post('/api/table/create', async (req, res) => {
  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const table = body.table || body.name;
  const raw = body.columns;
  if (!validateTable(table)) {
    return res.code(400).send({ error: 'Nome de tabela invalido: ' + (table || '') });
  }
  if (hasTable(table)) {
    return res.code(409).send({ error: 'Tabela ja existe' });
  }
  if (!Array.isArray(raw) || raw.length === 0) {
    return res.code(400).send({ error: 'Informe ao menos uma coluna' });
  }
  const names = [];
  const defs = [];
  for (const c of raw) {
    const name = (typeof c === 'object' && c !== null && c.name) ? String(c.name) : (typeof c === 'string' ? c : '');
    const type = (typeof c === 'object' && c !== null && c.type) ? String(c.type).toUpperCase() : 'TEXT';
    if (!validateColumn(name)) return res.code(400).send({ error: 'Coluna invalida: ' + name });
    if (name === 'id' || name === 'created_at') continue;
    if (names.includes(name)) return res.code(400).send({ error: 'Coluna duplicada: ' + name });
    names.push(name);
    defs.push('"' + name + '" ' + (/^(TEXT|INTEGER|REAL|NUMERIC|BLOB)$/.test(type) ? type : 'TEXT'));
  }
  if (names.length === 0) {
    return res.code(400).send({ error: 'Informe ao menos uma coluna valida' });
  }
  const columns = ['id'].concat(names, ['created_at']);
  const sql = 'id TEXT PRIMARY KEY, ' + defs.join(', ') + ', created_at TEXT';
  const def = { builtin: false, sql, columns };
  TABLE_DEFS[table] = def;
  const database = getDb();
  try {
    database.exec('CREATE TABLE IF NOT EXISTS "' + table + '" (' + sql + ')');
    database.prepare('INSERT OR REPLACE INTO "_schema" (id, table_name, def, created_at) VALUES (?, ?, ?, ?)').run(
      crypto.randomUUID(), table, JSON.stringify(def), new Date().toISOString()
    );
    return res.code(201).send({ success: true, table, columns });
  } catch (e) {
    delete TABLE_DEFS[table];
    return res.code(500).send({ error: e.message });
  }
});

fastify.post('/api/table/drop', async (req, res) => {
  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const table = body.table || body.name;
  if (typeof table !== 'string' || !hasTable(table)) {
    return res.code(404).send({ error: 'Tabela nao encontrada' });
  }
  if (TABLE_DEFS[table].builtin) {
    return res.code(400).send({ error: 'Tabela padrao nao pode ser removida' });
  }
  try {
    getDb().exec('DROP TABLE IF EXISTS "' + table + '"');
    getDb().prepare('DELETE FROM "_schema" WHERE table_name = ?').run(table);
    delete TABLE_DEFS[table];
    return { success: true, table };
  } catch (e) {
    return res.code(500).send({ error: e.message });
  }
});

fastify.post('/api/auth', async (req, res) => {
  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const token = String(body.token || '');
  if (ADMIN_TOKEN && token === ADMIN_TOKEN) {
    return res.send({ ok: true, role: 'admin' });
  }
  return res.code(401).send({ ok: false, error: 'Token inválido' });
});

fastify.get('/api/auth/check', async (req, res) => {
  if (isAdminRequest(req)) {
    return res.send({ ok: true, role: 'admin' });
  }
  return res.code(401).send({ ok: false, error: 'Não autenticado' });
});

fastify.setNotFoundHandler(async (req, res) => {
  const indexPath = path.join(PROJECT_ROOT, 'index.html');
  if (fs.existsSync(indexPath)) {
    const content = await fs.promises.readFile(indexPath, 'utf-8');
    res.type('text/html').send(content);
  } else {
    res.code(404).send('Not Found');
  }
});

const start = async () => {
  const db = getDb();
  ensureBaseTables(db);
  for (const [name, def] of Object.entries(TABLE_DEFS)) {
    db.exec('CREATE TABLE IF NOT EXISTS "' + name + '" (' + def.sql + ')');
  }
  loadDynamicTables(db);
  ensureColumns(db);

  const servicosCount = db.prepare('SELECT COUNT(*) AS cnt FROM servicos').get();
  if (servicosCount.cnt === 0) {
    const servicosPath = path.join(PROJECT_ROOT, 'servicos.json');
    if (fs.existsSync(servicosPath)) {
      try {
        const items = JSON.parse(fs.readFileSync(servicosPath, 'utf-8')).servicos || [];
        const stmt = db.prepare('INSERT OR IGNORE INTO servicos (id, nome, descricao, categoria, preco, duracao_minutos, ativo, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        const now = new Date().toISOString();
        for (const s of items) {
          stmt.run(s.id || crypto.randomUUID(), s.nome || '', s.descricao || '', s.categoria || '', s.preco || 0, s.duracao_minutos || 30, s.ativo ?? 1, now);
        }
        console.log('Seed: ' + items.length + ' servicos inseridos de servicos.json');
      } catch (e) {
        console.error('Erro ao fazer seed de servicos.json:', e.message);
      }
    } else {
      console.log('servicos.json nao encontrado em ' + PROJECT_ROOT + ' — seed ignorado');
    }
  }

  const categoriasCount = db.prepare('SELECT COUNT(*) AS cnt FROM categorias').get();
  if (categoriasCount.cnt === 0) {
    const categoriasPath = path.join(PROJECT_ROOT, 'categorias.json');
    if (fs.existsSync(categoriasPath)) {
      try {
        const items = JSON.parse(fs.readFileSync(categoriasPath, 'utf-8')).categorias || [];
        const stmt = db.prepare('INSERT OR IGNORE INTO categorias (id, nome, descricao, ativo, created_at) VALUES (?, ?, ?, ?, ?)');
        const now = new Date().toISOString();
        for (const c of items) {
          stmt.run(c.id || crypto.randomUUID(), c.nome || '', c.descricao || '', c.ativo ?? 1, now);
        }
        console.log('Seed: ' + items.length + ' categorias inseridas de categorias.json');
      } catch (e) {
        console.error('Erro ao fazer seed de categorias.json:', e.message);
      }
    } else {
      console.log('categorias.json nao encontrado em ' + PROJECT_ROOT + ' — seed ignorado');
    }
  }

  const PORT = process.env.PORT || 3001;
  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log('Server: http://0.0.0.0:' + PORT);
};
start();
SVREOF
info "src/server.js criado"


# --------------------------------------------------------------
# Dockerfile
# --------------------------------------------------------------
info "Criando Dockerfile"
cat > "$INSTALL_DIR/Dockerfile" <<'DOCKEREOF'
FROM node:22-alpine

WORKDIR /app

# Dependências primeiro (cache de camada)
COPY api/package.json ./
RUN npm install --production

# Código-fonte da API
COPY api/src/ ./src/

# Dados iniciais de serviços (seed SQLite)
COPY servicos.json ./servicos.json
COPY categorias.json ./categorias.json

EXPOSE 3001

CMD ["node", "src/server.js"]
DOCKEREOF


# --------------------------------------------------------------
# docker-compose.yml
# --------------------------------------------------------------
info "Criando docker-compose.yml"
cat > "$INSTALL_DIR/docker-compose.yml" <<'COMPOSEEOF'
services:
  api:
    build: .
    ports:
      - "127.0.0.1:${PORT}:${PORT}"
    environment:
      PORT: ${PORT}
      PROJECT_NAME: rede.medica
      API_TOKEN: ${API_TOKEN}
      API_WRITE_KEY: ${API_WRITE_KEY}
      DB_PATH: /data/rede.medica.db
    volumes:
      - ./data:/data
      - ./servicos.json:/app/servicos.json:ro
      - ./categorias.json:/app/categorias.json:ro
    restart: unless-stopped
COMPOSEEOF


# --------------------------------------------------------------
# Nginx — location /${COMPOSE_PROJECT_NAME}/ no host api.projetosdinamicos.com.br
# --------------------------------------------------------------
info "Configurando Nginx (location /${COMPOSE_PROJECT_NAME}/)"

NGINX_LOCATIONS="/etc/nginx/${COMPOSE_PROJECT_NAME}-locations.conf"

if ! grep -q "server_name api\.projetosdinamicos\.com\.br" "$NGINX_CONF" 2>/dev/null; then
  error "Server block de ${APP_DOMAIN} não encontrado em ${NGINX_CONF} — configure o domínio principal antes de instalar o projeto."
fi

# Gera arquivo com a location do projeto (proxy_pass com barra remove o prefixo)
cat > "$NGINX_LOCATIONS" <<LOCEOF
# Location para ${COMPOSE_PROJECT_NAME} — adicionado pelo install_redemedica.sh
location = /${COMPOSE_PROJECT_NAME} { return 301 /${COMPOSE_PROJECT_NAME}/; }

location /${COMPOSE_PROJECT_NAME}/ {
    proxy_pass http://127.0.0.1:${APP_PORT}/;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
}
LOCEOF
info "Locations gerado: ${NGINX_LOCATIONS}"

if ! grep -q "${COMPOSE_PROJECT_NAME}-locations.conf" "$NGINX_CONF"; then
  info "Adicionando include ao server block de ${APP_DOMAIN}..."
  sed -i "/^\s*server_name api\.projetosdinamicos\.com\.br;$/a\    include /etc/nginx/${COMPOSE_PROJECT_NAME}-locations.conf;" "$NGINX_CONF"
else
  info "Include já existe no nginx"
fi


# --------------------------------------------------------------
# Docker Compose — build e start
# --------------------------------------------------------------
info "Fazendo build da imagem Docker..."
if $DOCKER_COMPOSE_CMD -f "$INSTALL_DIR/docker-compose.yml" build 2>&1; then
  info "Build concluído com sucesso!"
else
  error "Falha no build da imagem Docker — verifique o Dockerfile e logs acima"
fi

info "Iniciando containers com Docker Compose..."
if $DOCKER_COMPOSE_CMD -f "$INSTALL_DIR/docker-compose.yml" --project-name "$COMPOSE_PROJECT_NAME" up -d 2>&1; then
  info "Containers iniciados!"
else
  error "Falha ao iniciar containers — verifique docker-compose.yml e logs"
fi

info "Aguardando API ficar saudável..."
for i in $(seq 1 30); do
  if curl -sf "http://127.0.0.1:$APP_PORT/health" >/dev/null 2>&1; then
    info "API saudável após ${i}s!"
    break
  fi
  if [ "$i" -eq 30 ]; then
    warn "API não respondeu após 30s — verifique logs: $DOCKER_COMPOSE_CMD logs api"
  fi
  sleep 1
done


# --------------------------------------------------------------
# Nginx reload
# --------------------------------------------------------------
info "Testando e recarregando Nginx"
if nginx -t 2>&1; then
  info "Nginx: configuração válida"
  if systemctl reload nginx.service 2>&1; then
    info "Nginx recarregado com sucesso!"
  else
    warn "Erro ao recarregar nginx — execute manualmente: sudo systemctl reload nginx.service"
  fi
else
  warn "Configuração do nginx inválida — execute manualmente: sudo nginx -t"
fi


# --------------------------------------------------------------
# Final
# --------------------------------------------------------------
echo ""
info "===== Instalação concluída! ====="
echo ""
echo "  API URL:  https://${APP_DOMAIN}/${COMPOSE_PROJECT_NAME}/  (site: GitHub Pages)"
echo "  Porta:    ${APP_PORT}  |  Docker: ${COMPOSE_PROJECT_NAME}"
echo "  .env:     ${INSTALL_DIR}/.env"
echo ""
echo "  Modo administrador: token de acesso em API_TOKEN no .env"
echo "  Modo público:       apenas pedidos de consulta (cria agendamentos)"
echo ""
echo "  Comandos úteis:"
echo "    Logs:     $DOCKER_COMPOSE_CMD -f $INSTALL_DIR/docker-compose.yml logs -f"
echo "    Restart:  $DOCKER_COMPOSE_CMD -f $INSTALL_DIR/docker-compose.yml restart"
echo "    Stop:     $DOCKER_COMPOSE_CMD -f $INSTALL_DIR/docker-compose.yml down"
echo "    Shell:    $DOCKER_COMPOSE_CMD -f $INSTALL_DIR/docker-compose.yml exec api sh"
echo ""

info "Testando API..." && sleep 2
resp=$(curl -s "http://127.0.0.1:$APP_PORT/health" 2>/dev/null) || resp=""
echo "$resp" | grep -q '"status":"ok"\|"ok"' && info "Local:      ✓ http://127.0.0.1:$APP_PORT/health" || warn "Local:      ✗ $resp"
resp2=$(curl -s "http://127.0.0.1:$APP_PORT/ping" 2>/dev/null) || resp2=""
echo "$resp2" | grep -q '"pong":true' && info "Ping:       ✓ http://127.0.0.1:$APP_PORT/ping" || warn "Ping:       ✗ $resp2"

info "Testando API via nginx (location /${COMPOSE_PROJECT_NAME}/)..."
resp3=$(curl -s --max-time 10 "http://127.0.0.1/${COMPOSE_PROJECT_NAME}/health" -H "Host: $APP_DOMAIN" 2>/dev/null) || resp3=""
echo "$resp3" | grep -q '"status":"ok"\|"ok"' && info "Nginx:      ✓ http://127.0.0.1/${COMPOSE_PROJECT_NAME}/health (Host: $APP_DOMAIN)" || warn "Nginx:      ✗ — verifique nginx -t"

info "Testando acesso externo..."
resp4=$(curl -s --max-time 10 "https://${APP_DOMAIN}/${COMPOSE_PROJECT_NAME}/health" 2>/dev/null) || resp4=""
echo "$resp4" | grep -q '"status":"ok"\|"ok"' && info "Externo:    ✓ https://${APP_DOMAIN}/${COMPOSE_PROJECT_NAME}/health" || warn "Externo:    ✗ — verifique DNS/firewall/TLS"

echo "" && info "Testes concluídos!"
echo ""