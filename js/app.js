const PAGES = {
  dashboard: { label: 'Dashboard', icon: 'grid', section: 'Visão Geral' },
  agendamentos: { label: 'Agendamentos', icon: 'calendar', section: 'Agenda' },
  medicos: { label: 'Médicos', icon: 'stethoscope', section: 'Agenda' },
  pacientes: { label: 'Pacientes', icon: 'users', section: 'Agenda' },
  servicos: { label: 'Serviços', icon: 'activity', section: 'Catálogo' },
  categorias: { label: 'Categorias', icon: 'category', section: 'Catálogo' },
  menu: { label: 'Menu', icon: 'menu', section: 'Configurações' },
};

const SECTION_ORDER = ['Visão Geral', 'Agenda', 'Catálogo', 'Configurações', 'Outras tabelas'];

const ENTITIES = {
  agendamentos: { label: 'Agendamento', labelPlural: 'Agendamentos' },
  medicos: { label: 'Médico', labelPlural: 'Médicos' },
  pacientes: { label: 'Paciente', labelPlural: 'Pacientes' },
  servicos: { label: 'Serviço', labelPlural: 'Serviços' },
  categorias: { label: 'Categoria', labelPlural: 'Categorias' },
};

const SUBTITLES = {
  dashboard: 'Visão geral dos agendamentos e categorias',
  agendamentos: 'Gerencie os agendamentos',
  medicos: 'Profissionais da medicina classificados por categorias',
  pacientes: 'Cadastro gratuito de pacientes',
  servicos: 'Serviços oferecidos',
  categorias: 'Registre e gerencie as categorias dos profissionais',
  menu: 'Personalize a ordem, os nomes e a visibilidade dos itens do menu',
};

const ESCAPER = {
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;',
};
const esc = v => String(v ?? '').replace(/[<>&"']/g, c => ESCAPER[c]);

const ICONS = {
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 9h18"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  calendarCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 9h18M9 15l2 2 4-4"/></svg>',
  stethoscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6M10 6h4M12 2v4"/><circle cx="12" cy="13" r="4"/><path d="M6 21c0-3 2.7-5 6-5s6 2 6 5"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 21c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15.6c2.9-.3 5.5 1.6 5.5 4.4"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
  category: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24H5a2 2 0 0 0-2 2v4.59A2 2 0 0 0 3.59 11l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83Z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 8 10 8a9.74 9.74 0 0 0 5.39-1.61"/><path d="m2 2 20 20"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
  device: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01"/></svg>',
};

const STATS = [
  { label: 'Total Agendamentos', icon: 'calendar', tone: 't-indigo' },
  { label: 'Pendentes', icon: 'clock', tone: 't-amber' },
  { label: 'Hoje', icon: 'calendarCheck', tone: 't-green' },
  { label: 'Médicos', icon: 'stethoscope', tone: 't-sky' },
  { label: 'Pacientes', icon: 'users', tone: 't-violet' },
  { label: 'Serviços', icon: 'activity', tone: 't-emerald' },
  { label: 'Categorias', icon: 'category', tone: 't-rose' },
];

const PAGE_ICONS = {
  dashboard: 'grid',
  agendamentos: 'calendar',
  medicos: 'stethoscope',
  pacientes: 'users',
  servicos: 'activity',
  categorias: 'category',
  menu: 'menu',
};

let currentPage = 'dashboard';
let editId = null;
let currentEntity = '';
let categoriasCache = [];
let pendingCategoria = null;
let apiOnline = false;
let navMeta = [];
let navItemIndex = {};
let menuConfig = null;

// ---------------------------------------------------------------
// Autenticação (modo público vs modo administrador)
// ---------------------------------------------------------------
const AUTH_KEY = 'redemedica-admin-token';
let isAdmin = false;

function getStoredToken() {
  try { return sessionStorage.getItem(AUTH_KEY) || null; } catch { return null; }
}

function setStoredToken(t) {
  try {
    if (t) sessionStorage.setItem(AUTH_KEY, t);
    else sessionStorage.removeItem(AUTH_KEY);
  } catch {}
  API.setToken(t);
}

function initAuthState() {
  setStoredToken(getStoredToken());
  isAdmin = !!getStoredToken();
}

async function initAuth() {
  const otpCode = verificarOtpNaUrl();
  if (otpCode) {
    try {
      const r = await API.otpValidate(otpCode);
      setStoredToken(r.token);
      isAdmin = true;
    } catch (err) {
      setStoredToken(null);
      isAdmin = false;
      mostrarToast('Código inválido ou expirado: ' + err.message, 'error');
    }
  } else {
    initAuthState();
    if (isAdmin) {
      try {
        const ok = await API.checkAuth();
        if (!ok) { setStoredToken(null); isAdmin = false; }
      } catch {
        setStoredToken(null);
        isAdmin = false;
      }
    }
  }
  aplicarModoInterface();
  if (isAdmin) {
    menuConfig = await carregarMenuConfigDaApi();
    montarNavMeta([]);
    renderNav();
    navegar('dashboard');
  } else {
    carregarPublicPage();
  }
}

function exigirAdmin() {
  if (isAdmin) return true;
  mostrarToast('Acesso restrito ao administrador', 'error');
  abrirLogin();
  return false;
}

function alternarAutenticacao() {
  if (isAdmin) sairAdmin();
  else abrirLogin();
}

function aplicarModoInterface() {
  document.body.classList.toggle('public-mode', !isAdmin);
  const update = el => {
    if (!el) return;
    if (isAdmin) {
      el.innerHTML = `${ICONS.logout}<span class="btn-label">Sair</span>`;
      el.title = 'Sair do modo administrador';
    } else {
      el.innerHTML = `${ICONS.shield}<span class="btn-label">Entrar</span>`;
      el.title = 'Acesso do administrador';
    }
  };
  update(document.getElementById('btnAdminAuth'));
  update(document.getElementById('btnAdminAuthDrawer'));
  const btnNovo = document.getElementById('btnNovo');
  if (!isAdmin && btnNovo) btnNovo.style.display = 'none';
  const btnQr = document.getElementById('btnQrAcesso');
  if (btnQr) {
    btnQr.style.display = isAdmin ? 'inline-flex' : 'none';
    btnQr.innerHTML = `${ICONS.device}${isAdmin ? '<span class="btn-label">Celular</span>' : ''}`;
  }
}

async function abrirLogin() {
  if (isAdmin) return;
  editId = null;
  currentEntity = '';
  document.getElementById('modalTitle').textContent = 'Acesso Administrador';
  document.getElementById('modalBody').innerHTML = `
    <form id="formLogin" onsubmit="entrarAdmin();return false">
      <div class="form-group">
        <label>Token de acesso <span class="req">*</span></label>
        <input type="password" id="loginToken" name="token" placeholder="Digite o token do administrador" required autocomplete="current-password">
      </div>
      <p class="login-hint">O modo administrador permite gerenciar pacientes, médicos, serviços e agendamentos.</p>
    </form>`;
  configurarSalvarAdmin();
  document.getElementById('modalOverlay').classList.add('open');
  setTimeout(() => document.getElementById('loginToken')?.focus(), 60);
}

async function entrarAdmin() {
  if (isAdmin) return;
  const token = document.getElementById('loginToken')?.value.trim();
  if (!token) { mostrarToast('Informe o token de acesso', 'error'); return; }
  const btn = document.getElementById('btnSalvar');
  if (btn) btn.disabled = true;
  try {
    await API.login(token);
    setStoredToken(token);
    isAdmin = true;
    aplicarModoInterface();
    montarNavMeta([]);
    renderNav();
    fecharModal();
    mostrarToast('Bem-vindo, administrador!', 'success');
    navegar('dashboard');
    refreshMenu();
    carregarContagens();
  } catch (err) {
    mostrarToast(err.message, 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
}

function sairAdmin() {
  setStoredToken(null);
  isAdmin = false;
  aplicarModoInterface();
  fecharModal();
  carregarPublicPage();
  mostrarToast('Você saiu do modo administrador', 'success');
}

function configurarSalvarAdmin() {
  const b = document.getElementById('btnSalvar');
  b.textContent = 'Entrar';
  b.onclick = entrarAdmin;
  b.style.display = 'inline-flex';
}

function configurarSalvarPadrao() {
  const b = document.getElementById('btnSalvar');
  b.textContent = 'Salvar';
  b.onclick = salvarRegistro;
  b.style.display = 'inline-flex';
}

// ---------------------------------------------------------------
// Acesso pelo celular — QR com OTP de uso único
// ---------------------------------------------------------------
function verificarOtpNaUrl() {
  const m = /^#otp=(\d{6})/.exec(location.hash);
  if (!m) return null;
  history.replaceState(null, '', location.pathname + location.search);
  return m[1];
}

async function abrirModalQr() {
  if (!exigirAdmin()) return;
  editId = null;
  currentEntity = '';
  document.getElementById('modalTitle').textContent = 'Acesso pelo celular';
  document.getElementById('modalBody').innerHTML = `
    <div class="qr-loading">
      <div class="skeleton" style="height:220px"></div>
    </div>`;
  const btnSalvar = document.getElementById('btnSalvar');
  btnSalvar.style.display = 'none';
  document.getElementById('modalOverlay').classList.add('open');
  await gerarCodigoQr();
}

async function gerarCodigoQr() {
  const body = document.getElementById('modalBody');
  if (!body) return;
  clearInterval(window._qrTimer);
  body.innerHTML = `
    <div class="qr-loading">
      <p style="text-align:center;color:var(--text-tertiary);padding:40px 0">Gerando código...</p>
    </div>`;
  try {
    const r = await API.otpGenerate();
    const url = `${location.origin}${location.pathname}#otp=${r.code}`;
    const secs = Math.max(1, Math.round((r.ttl || 60000) / 1000));
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&qzone=1&data=${encodeURIComponent(url)}`;
    body.innerHTML = `
      <div class="qr-panel">
        <p class="qr-title">Escaneie com a câmera do celular</p>
        <img class="qr-img" src="${qrSrc}" alt="QR Code de acesso" width="240" height="240">
        <p class="qr-timer">Válido por <b id="qrTimer">${secs}</b> s</p>
        <p class="qr-hint">No celular, aponte a câmera para o QR Code. O login acontece automaticamente — sem digitar nada.</p>
        <button class="btn btn-secondary btn-block" type="button" onclick="gerarCodigoQr()">Gerar novo código</button>
      </div>`;
    window._qrExpAt = Date.now() + (r.ttl || 60000);
    window._qrTimer = setInterval(() => {
      const left = Math.max(0, Math.round((window._qrExpAt - Date.now()) / 1000));
      const el = document.getElementById('qrTimer');
      if (el) el.textContent = left;
      if (left <= 0) {
        clearInterval(window._qrTimer);
        mostrarToast('Código expirado — gere um novo', 'error');
      }
    }, 1000);
  } catch (err) {
    body.innerHTML = `
      <p style="color:var(--danger);text-align:center;padding:30px 0">${esc(err.message)}</p>
      <button class="btn btn-secondary btn-block" type="button" onclick="gerarCodigoQr()">Tentar novamente</button>`;
  }
}

// ---------------------------------------------------------------
// Tema
// ---------------------------------------------------------------
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('redemedica-theme', theme); } catch {}
  document.querySelectorAll('.theme-toggle').forEach(t => {
    t.innerHTML = ICONS[theme === 'dark' ? 'sun' : 'moon'];
  });
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('redemedica-theme'); } catch {}
  const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefers ? 'dark' : 'light'));
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(cur);
}

// ---------------------------------------------------------------
// Navegação (menu inteligente)
// ---------------------------------------------------------------
function nomeBonitoDaTabela(t) {
  return t.charAt(0).toUpperCase() + t.slice(1).replace(/_/g, ' ').toLowerCase();
}

function montarNavMeta(tables) {
  const base = Object.keys(PAGES);
  const extras = (tables || [])
    .filter(t => !t.builtin && !base.includes(t.name))
    .map(t => t.name)
    .sort();
  navMeta = [];
  SECTION_ORDER.forEach((section, si) => {
    const ids = [];
    if (section !== 'Outras tabelas') {
      ids.push(...Object.keys(PAGES).filter(id => PAGES[id].section === section));
    } else {
      ids.push(...extras);
    }
    if (!ids.length) return;
    ids.forEach(id => {
      const isExtras = section === 'Outras tabelas';
      navMeta.push({
        id,
        label: isExtras ? nomeBonitoDaTabela(id) : PAGES[id].label,
        icon: isExtras ? 'grid' : PAGES[id].icon,
        section,
        extras: isExtras,
      });
      if (isExtras && !ENTITIES[id]) {
        const l = esc(nomeBonitoDaTabela(id));
        ENTITIES[id] = { label: l, labelPlural: l };
      }
    });
  });
  navItemIndex = {};
  navMeta.forEach((m, i) => { navItemIndex[m.id] = i; });
  aplicarConfigMenu();
}

async function carregarMenuConfigDaApi() {
  try {
    const r = await API.getConfig('menu');
    const parsed = (r && r.valor) ? JSON.parse(r.valor) : null;
    if (parsed && Array.isArray(parsed.items)) return parsed;
    return null;
  } catch {
    return null;
  }
}

function aplicarConfigMenu() {
  if (!menuConfig || !Array.isArray(menuConfig.items) || menuConfig.items.length === 0) return;
  const base = navMeta;
  const byId = {};
  base.forEach(m => { byId[m.id] = m; });
  const ordered = [];
  const used = new Set();
  menuConfig.items.forEach(cfg => {
    const m = byId[cfg.id];
    if (!m) return;
    if (typeof cfg.label === 'string' && cfg.label.trim()) m.label = cfg.label.trim();
    if (typeof cfg.section === 'string' && cfg.section.trim()) m.section = cfg.section.trim();
    m.visible = cfg.visible !== false;
    ordered.push(m);
    used.add(m.id);
  });
  base.forEach(m => { if (!used.has(m.id)) ordered.push(m); });
  navMeta = ordered;
}

function criarNavItem(meta) {
  const a = document.createElement('a');
  a.href = '#';
  a.className = 'nav-item' + (currentPage === meta.id ? ' active' : '');
  a.dataset.page = meta.id;
  a.title = meta.label;
  a.innerHTML = `<span class="icon">${ICONS[meta.icon] || ICONS.grid}</span><span class="nav-label">${esc(meta.label)}</span><span class="nav-count" hidden></span>`;
  a.addEventListener('click', e => {
    e.preventDefault();
    navegar(meta.id);
    fecharDrawer();
    fecharMore();
  });
  return a;
}

function renderTopNav() {
  const nav = document.getElementById('topNav');
  nav.innerHTML = '';
  const visiveis = navMeta.filter(m => m.visible !== false);
  nav.dataset.count = String(visiveis.length);
  visiveis.forEach(m => nav.appendChild(criarNavItem(m)));
  const moreWrap = document.createElement('div');
  moreWrap.className = 'nav-more hidden';
  moreWrap.innerHTML = `<button type="button" class="nav-more-toggle" onclick="toggleMore(event)" aria-label="Mais itens"><span class="nav-label">Mais</span><span class="icon chev">${ICONS.chevronDown}</span></button><div class="more-drop hidden" id="navMoreDrop"></div>`;
  nav.appendChild(moreWrap);
}

function renderDrawerNav() {
  const ul = document.getElementById('drawerNav');
  ul.innerHTML = '';
  let lastSection = '';
  navMeta.forEach(m => {
    if (m.visible === false) return;
    if (m.section !== lastSection) {
      const li = document.createElement('li');
      li.className = 'nav-section-label';
      li.textContent = m.section;
      ul.appendChild(li);
      lastSection = m.section;
    }
    const li = document.createElement('li');
    li.appendChild(criarNavItem(m));
    ul.appendChild(li);
  });
}

function renderNav() {
  renderTopNav();
  renderDrawerNav();
  ajustarOverflowNav();
}

function ajustarOverflowNav() {
  const nav = document.getElementById('topNav');
  const moreWrap = nav.querySelector('.nav-more');
  const drop = document.getElementById('navMoreDrop');
  if (!nav || !moreWrap || window.innerWidth < 768) return;
  drop.innerHTML = '';
  moreWrap.classList.add('hidden');
  nav.querySelectorAll(':scope > .nav-item').forEach(i => i.classList.remove('hidden'));

  if (nav.scrollWidth <= nav.clientWidth) return;

  const items = [...nav.querySelectorAll(':scope > .nav-item')];
  for (const it of [...items].reverse()) {
    if (nav.scrollWidth <= nav.clientWidth) break;
    it.classList.add('hidden');
    const meta = navMeta[navItemIndex[it.dataset.page]];
    const clone = criarNavItem(meta);
    clone.addEventListener('click', () => fecharMore());
    drop.appendChild(clone);
  }
  moreWrap.classList.remove('hidden');
  nav.classList.add('has-more');
}

function fecharMore() {
  document.getElementById('navMoreDrop')?.classList.add('hidden');
}

function toggleMore(e) {
  if (e) e.stopPropagation();
  const drop = document.getElementById('navMoreDrop');
  drop.classList.toggle('hidden');
}

function toggleDrawer() {
  if (window.innerWidth >= 768) return;
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('drawerBackdrop').classList.toggle('open');
}

function fecharDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawerBackdrop').classList.remove('open');
}

// ---------------------------------------------------------------
// Status da API + badges (contagens)
// ---------------------------------------------------------------
function setApiEstado(estado) {
  document.querySelectorAll('.api-pill').forEach(pill => {
    pill.classList.toggle('offline', estado === 'offline');
    pill.classList.toggle('connecting', estado === 'connecting');
  });
  const estados = {
    online: ['online', 'API Online'],
    offline: ['offline', 'API Offline — toque para reconectar'],
    connecting: ['connecting', 'Conectando...'],
  };
  const [cls, txt] = (estados[estado] || estados.connecting);
  document.querySelectorAll('.status-dot').forEach(d => { d.className = 'status-dot ' + cls; });
  document.querySelectorAll('.api-pill-text').forEach(t => { t.textContent = txt; });
}

async function checarStatusApi(force = false) {
  setApiEstado('connecting');
  const ok = await API.checkStatus();
  const mudou = ok !== apiOnline;
  apiOnline = ok;
  if (ok) {
    setApiEstado('online');
    if (mudou || force) {
      await refreshMenu();
      carregarContagens();
    } else {
      carregarContagens();
    }
  } else {
    setApiEstado('offline');
  }
}

async function refreshMenu() {
  let tables = [];
  try { tables = await API.getTables(); } catch {}
  menuConfig = await carregarMenuConfigDaApi();
  montarNavMeta(tables);
  if (isAdmin) renderNav();
}

async function carregarContagens() {
  if (!apiOnline || !isAdmin) return;
  const counts = {};
  await Promise.all(navMeta.map(async m => {
    if (m.id === 'dashboard') return;
    try {
      const rows = await API.get(m.id);
      counts[m.id] = Array.isArray(rows) ? rows.length : 0;
    } catch { counts[m.id] = 0; }
  }));
  atualizarBadges(counts);
}

async function atualizarContagem(entity) {
  if (!apiOnline || !isAdmin || entity === 'dashboard') return;
  try {
    const rows = await API.get(entity);
    const n = Array.isArray(rows) ? rows.length : 0;
    document.querySelectorAll(`.nav-item[data-page="${entity}"] .nav-count`).forEach(b => {
      b.textContent = n;
      b.hidden = !(n > 0);
    });
  } catch {}
}

function atualizarBadges(counts) {
  document.querySelectorAll('.nav-count').forEach(b => {
    const page = b.closest('.nav-item').dataset.page;
    const n = counts[page] || 0;
    b.textContent = n;
    b.hidden = !(apiOnline && n > 0);
  });
}

// ---------------------------------------------------------------
// Navegação entre páginas
// ---------------------------------------------------------------
function navegar(page) {
  if (!isAdmin) {
    carregarPublicPage();
    return;
  }
  currentPage = page;
  currentEntity = ENTITIES[page] ? page : '';
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
  document.getElementById('pageTitle').textContent = page === 'dashboard' ? 'Dashboard' : (ENTITIES[page]?.labelPlural || nomeBonitoDaTabela(page));
  document.getElementById('pageSubtitle').textContent = SUBTITLES[page] || '';
  const iconEl = document.getElementById('pageIcon');
  if (iconEl) iconEl.innerHTML = ICONS[PAGE_ICONS[page] || 'grid'];
  const showNovo = page !== 'dashboard' && page !== 'menu';
  const btnNovo = document.getElementById('btnNovo');
  btnNovo.style.display = showNovo ? 'inline-flex' : 'none';
  btnNovo.onclick = () => abrirModal(page);
  carregarPagina(page);
}

async function carregarPagina(page) {
  const container = document.getElementById('pageContent');
  container.innerHTML = `
    <div class="skeleton-wrap">
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-rows"></div>
    </div>
  `;
  if (page === 'dashboard') return carregarDashboard(container);
  if (page === 'menu') return carregarEditorMenu(container);
  return carregarTabela(page, container);
}

async function carregarDashboard(container) {
  try {
    const lista = navMeta.filter(m => m.id !== 'dashboard').map(m => m.id);
    const res = await Promise.all(lista.map(id => API.get(id).catch(() => [])));
    const dados = {};
    lista.forEach((id, i) => { dados[id] = res[i] || []; });
    categoriasCache = dados.categorias || [];

    const agendamentos = dados.agendamentos || [];
    const pendentes = agendamentos.filter(a => a.status === 'PENDENTE' || !a.status).length;
    const hoje = new Date().toISOString().split('T')[0];
    const hojeCount = agendamentos.filter(a => a.data && a.data.startsWith(hoje)).length;

    const values = [
      agendamentos.length,
      pendentes,
      hojeCount,
      (dados.medicos || []).length,
      (dados.pacientes || []).length,
      (dados.servicos || []).length,
      categoriasCache.length,
    ];

    const cards = STATS.map((s, i) => `
      <div class="stat-card">
        <div class="stat-icon ${s.tone}">${ICONS[s.icon]}</div>
        <div class="stat-value">${values[i]}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="stats-grid">${cards}</div>
      ${gerarPainelCategorias(categoriasCache, dados.medicos || [])}
      ${gerarTabelaAgendamentos(agendamentos.slice(0, 10))}
    `;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="card-body"><p style="color:var(--danger)">Erro ao carregar: ${esc(err.message)}</p></div></div>`;
  }
}

function gerarPainelCategorias(categorias, medicos) {
  const lista = categorias || [];
  if (lista.length === 0) {
    return `<div class="card">
      <div class="card-header">Categorias de Profissionais</div>
      <div class="card-body"><p style="text-align:center;color:var(--text-tertiary)">Nenhuma categoria cadastrada. <a href="#" onclick="navegar('categorias');return false;" style="color:var(--primary)">Cadastre categorias</a> para classificar os profissionais.</p></div>
    </div>`;
  }
  const cards = lista.map(c => {
    const count = (medicos || []).filter(m => m.categoria === c.id).length;
    return `<button type="button" class="category-card" onclick="abrirCategoria('${esc(c.id)}')" title="Ver profissionais desta categoria">
      <div class="category-icon">${ICONS.category}</div>
      <div class="category-info">
        <div class="category-name">${esc(c.nome)}</div>
        <div class="category-desc">${esc(c.descricao || 'Profissionais desta categoria')}</div>
      </div>
      <div class="category-count"><strong>${count}</strong><span>profissional(is)</span></div>
    </button>`;
  }).join('');
  return `<div class="card">
    <div class="card-header">Categorias de Profissionais</div>
    <div class="card-body"><div class="category-grid">${cards}</div></div>
  </div>`;
}

function abrirCategoria(categoriaId) {
  pendingCategoria = categoriaId;
  navegar('medicos');
}

// ---------------------------------------------------------------
// Personalização do menu (página "Menu")
// ---------------------------------------------------------------
let menuDraft = null;
let menuEditorContainer = null;

function carregarEditorMenu(container) {
  menuEditorContainer = container;
  menuDraft = navMeta.map(m => ({
    id: m.id,
    label: m.label,
    section: m.section,
    visible: m.visible !== false,
  }));
  const secOptions = SECTION_ORDER.filter(s => s !== 'Outras tabelas')
    .concat(SECTION_ORDER.includes('Outras tabelas') ? ['Outras tabelas'] : [])
    .concat(['Outras tabelas'])
    .filter((s, i, arr) => s && arr.indexOf(s) === i);
  const secOptionsHtml = secOptions.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <span>Personalização do menu</span>
      </div>
      <div class="card-body">
        <p style="color:var(--text-secondary)">Arraste o conteúdo, use os botões para reordenar, renomear ou ocultar.
        As alterações valem para todos os visitantes assim que você salvar.</p>
        <div class="menu-editor-actions">
          <button type="button" class="btn btn-primary" onclick="salvarConfigMenu()">${ICONS.checkmark}<span>Salvar menu</span></button>
          <button type="button" class="btn btn-ghost" onclick="restaurarMenuPadrao()">${ICONS.reset}<span>Restaurar padrão</span></button>
        </div>
        <div class="menu-editor-list" id="menuEditorList"></div>
      </div>
    </div>`;
  renderMenuEditorList();
}

const MENU_SECTION_LABELS = SECTION_ORDER.filter(s => s && s !== 'Outras tabelas').concat(['Outras tabelas']);

function renderMenuEditorList() {
  if (!menuEditorContainer) return;
  const list = document.getElementById('menuEditorList');
  if (!list) return;
  const secOptionsHtml = MENU_SECTION_LABELS.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
  list.innerHTML = menuDraft.map((d, i) => `
    <div class="menu-editor-row${d.id === 'menu' ? ' is-locked' : ''}">
      <div class="menu-editor-icons">
        <button type="button" class="menu-editor-btn" onclick="moverItemMenu(${i}, -1)" ${i === 0 ? 'disabled' : ''} title="Mover para cima" aria-label="Mover para cima">${ICONS.arrowUp}</button>
        <button type="button" class="menu-editor-btn" onclick="moverItemMenu(${i}, 1)" ${i === menuDraft.length - 1 ? 'disabled' : ''} title="Mover para baixo" aria-label="Mover para baixo">${ICONS.arrowDown}</button>
      </div>
      <div class="menu-editor-icon-cell">${ICONS[d.icon || 'grid'] || ICONS.grid}</div>
      <input type="text" class="menu-editor-name" value="${esc(d.label)}" maxlength="40"
        oninput="renomearItemMenu(${i}, this.value)" aria-label="Nome do item" ${d.id === 'menu' ? 'disabled' : ''}>
      <select class="menu-editor-section" onchange="mudarSecaoItemMenu(${i}, this.value)" aria-label="Seção do item" ${d.id === 'menu' ? 'disabled' : ''}>
        ${secOptionsHtml.replace(`<option value="${esc(d.section)}">`, `<option value="${esc(d.section)}" selected>`) }
      </select>
      <button type="button" class="menu-editor-btn menu-editor-vis${d.visible ? '' : ' is-off'}" onclick="alternarVisibilidadeMenu(${i})"
        title="${d.visible ? 'Ocultar do menu' : 'Mostrar no menu'}" aria-label="${d.visible ? 'Ocultar' : 'Mostrar'}" ${d.id === 'menu' ? 'disabled' : ''}>
        ${d.visible ? ICONS.eye : ICONS.eyeOff}
      </button>
    </div>
  `).join('');
}

function moverItemMenu(index, dir) {
  if (!menuDraft) return;
  const target = index + dir;
  if (target < 0 || target >= menuDraft.length) return;
  const tmp = menuDraft[index];
  menuDraft[index] = menuDraft[target];
  menuDraft[target] = tmp;
  renderMenuEditorList();
}

function renomearItemMenu(index, value) {
  if (menuDraft && menuDraft[index]) {
    menuDraft[index].label = value;
  }
}

function mudarSecaoItemMenu(index, value) {
  if (menuDraft && menuDraft[index]) {
    menuDraft[index].section = value;
  }
}

function alternarVisibilidadeMenu(index) {
  const d = menuDraft[index];
  if (!d || d.id === 'menu') return;
  d.visible = !d.visible;
  renderMenuEditorList();
}

async function salvarConfigMenu() {
  if (!menuDraft) return;
  const items = menuDraft.map(d => ({
    id: d.id,
    label: String(d.label || '').trim() || null,
    section: d.section,
    visible: d.visible,
  }));
  const payload = JSON.stringify({ items });
  const btn = document.querySelector('.menu-editor-actions .btn-primary');
  const prev = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<span>Salvando...</span>'; }
  try {
    await API.saveConfig('menu', payload);
    menuConfig = JSON.parse(payload);
    mostrarToast('Menu salvo com sucesso', 'success');
    await refreshMenu();
    if (currentPage === 'menu') renderMenuEditorList();
  } catch (err) {
    mostrarToast('Erro ao salvar menu: ' + err.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = prev; }
  }
}

async function restaurarMenuPadrao() {
  const payload = JSON.stringify({ items: [] });
  const btn = document.querySelector('.menu-editor-actions .btn-ghost');
  try {
    await API.saveConfig('menu', payload);
    menuConfig = { items: [] };
    mostrarToast('Menu restaurado para o padrão', 'success');
    await refreshMenu();
    if (currentPage === 'menu') carregarEditorMenu(menuEditorContainer || document.getElementById('pageContent'));
  } catch (err) {
    mostrarToast('Erro ao restaurar menu: ' + err.message, 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
}

// ---------------------------------------------------------------
// Modo público — somente pedidos de consulta
// ---------------------------------------------------------------
async function carregarPublicPage() {
  currentPage = 'public';
  currentEntity = '';
  const container = document.getElementById('pageContent');
  document.getElementById('pageTitle').textContent = 'Agende sua consulta';
  document.getElementById('pageSubtitle').textContent = 'Envie seu pedido — confirmamos pelo WhatsApp';
  const iconEl = document.getElementById('pageIcon');
  if (iconEl) iconEl.innerHTML = ICONS.stethoscope;

  container.innerHTML = `
    <div class="skeleton-wrap">
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-rows"></div>
    </div>
  `;

  try {
    const [categorias, servicos] = await Promise.all([
      API.get('categorias').catch(() => []),
      API.get('servicos').catch(() => []),
    ]);
    const ativos = (servicos || []).filter(s => s.ativo !== '0' && s.ativo !== 0);
    container.innerHTML = `
      <div class="public-hero">
        <div class="public-hero-icon">${ICONS.stethoscope}</div>
        <h1>Bem-vindo à <strong>Rede.Médica</strong></h1>
        <p>Solicite sua consulta agora. Nossa equipe retornará para confirmar data, horário e profissional pelo WhatsApp.</p>
      </div>
      ${gerarCatalogoPublico(categorias || [], ativos)}
    `;
  } catch (err) {
    container.innerHTML = `
      <div class="card"><div class="card-body">
        <p style="color:var(--danger)">Erro ao carregar o catálogo: ${esc(err.message)}</p>
        <button class="btn btn-secondary" style="margin-top:12px" onclick="carregarPublicPage()">Tentar novamente</button>
      </div></div>`;
  }
}

function gerarCatalogoPublico(categorias, servicos) {
  const cards = servicos.map(s => {
    const preco = (+s.preco || 0).toFixed(2);
    return `<div class="servico-card">
      <div class="servico-cat">${esc(s.categoria || 'Serviço')}</div>
      <div class="servico-nome">${esc(s.nome)}</div>
      <div class="servico-meta">
        <span class="servico-preco">R$ ${preco}</span>
        ${s.duracao_minutos ? `<span class="servico-duracao">${esc(s.duracao_minutos)} min</span>` : ''}
      </div>
    </div>`;
  }).join('');

  const cats = (categorias || []).map(c =>
    `<span class="cat-chip">${esc(c.nome)}</span>`
  ).join('');

  const options = (servicos || []).map(s =>
    `<option value="${esc(s.id)}" data-nome="${esc(s.nome)}" data-valor="${esc(s.preco)}">${esc(s.nome)} — R$ ${(+s.preco || 0).toFixed(2)}</option>`
  ).join('');

  return `<div class="public-grid">
    <div class="card">
      <div class="card-header">Serviços disponíveis</div>
      <div class="card-body">
        ${cards || '<p style="color:var(--text-tertiary);text-align:center">Nenhum serviço disponível no momento.</p>'}
        ${cats ? `<div class="cat-chips">${cats}</div>` : ''}
      </div>
    </div>

    <div class="card">
      <div class="card-header">Solicitar consulta</div>
      <div class="card-body">
        <form id="formConsulta" onsubmit="enviarPedidoConsulta(event)">
          <div class="form-group">
            <label>Seu nome <span class="req">*</span></label>
            <input type="text" name="cliente" placeholder="Nome completo" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Telefone <span class="req">*</span></label>
              <input type="tel" name="telefone" placeholder="(11) 99999-9999" required>
            </div>
            <div class="form-group">
              <label>WhatsApp</label>
              <input type="tel" name="whatsapp" placeholder="(11) 99999-9999">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Serviço <span class="req">*</span></label>
              <select name="servico" required onchange="preencherServicoConsulta()">
                <option value="">Selecione...</option>
                ${options}
              </select>
            </div>
            <div class="form-group">
              <label>Data <span class="req">*</span></label>
              <input type="date" name="data" required>
            </div>
          </div>
          <div class="form-group">
            <label>Horário desejado <span class="req">*</span></label>
            <input type="time" name="hora" required>
          </div>
          <div class="form-group">
            <label>Observações</label>
            <textarea name="observacoes" placeholder="Sintomas, profissional preferido, etc."></textarea>
          </div>
          <input type="hidden" name="servico_nome">
          <input type="hidden" name="valor">
          <input type="hidden" name="status" value="PENDENTE">
          <button class="btn btn-primary btn-block" type="submit">Solicitar Consulta</button>
        </form>
      </div>
    </div>
  </div>`;
}

function preencherServicoConsulta() {
  const form = document.getElementById('formConsulta');
  if (!form) return;
  const sel = form.querySelector('select[name="servico"]');
  const opt = sel.selectedOptions && sel.selectedOptions[0];
  form.querySelector('input[name="servico_nome"]').value = opt && opt.dataset.nome ? opt.dataset.nome : '';
  form.querySelector('input[name="valor"]').value = opt && opt.dataset.valor ? opt.dataset.valor : '';
}

async function enviarPedidoConsulta(event) {
  event.preventDefault();
  if (!apiOnline) { mostrarToast('API offline — tente novamente em instantes', 'error'); return; }
  const form = document.getElementById('formConsulta');
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  try {
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    for (const k of Object.keys(data)) {
      if (data[k] === '') delete data[k];
    }
    await API.create('agendamentos', data);
    form.innerHTML = `
      <div class="consulta-success">
        <div class="consulta-success-icon">${ICONS.calendarCheck}</div>
        <h3>Pedido recebido!</h3>
        <p>Registramos a sua solicitação. Retornaremos pelo WhatsApp/telefone para confirmar.</p>
        <button class="btn btn-secondary" type="button" onclick="carregarPublicPage()">Novo pedido</button>
      </div>`;
    mostrarToast('Pedido de consulta enviado!', 'success');
  } catch (err) {
    mostrarToast('Erro ao enviar: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}

// ---------------------------------------------------------------
// Tabelas e CRUD
// ---------------------------------------------------------------
async function carregarTabela(entity, container) {
  currentEntity = entity;
  try {
    const data = await API.get(entity) || [];
    let catFilter = '';
    let geoFilter = '';
    if (entity === 'medicos') {
      try { categoriasCache = await API.get('categorias') || []; } catch {}
      catFilter = `<div class="filter-categoria">
        <select id="filterCategoria" onchange="filtrarTabela()">
          <option value="">Todas as categorias</option>
          ${categoriasCache.map(c => `<option value="${esc(c.id)}">${esc(c.nome)}</option>`).join('')}
        </select>
      </div>`;
    }
    if (entity === 'medicos' || entity === 'pacientes') {
      geoFilter = gerarFiltroRegiao(data);
    }
    const body = data.length === 0
      ? gerarEmptyState('Nenhum registro encontrado', 'Clique em "Novo" para adicionar o primeiro.')
      : `<div class="card"><div class="card-body" id="tableContainer">${gerarTabela(entity, data)}</div></div>`;
    container.innerHTML = `
      <div class="toolbar-row">
        <div class="search-bar">
          <span class="search-icon">${ICONS.search}</span>
          <input type="text" placeholder="Buscar..." id="searchInput" oninput="filtrarTabela()">
        </div>
        ${catFilter}
        ${geoFilter}
      </div>
      ${body}
    `;
    if (entity === 'medicos' && pendingCategoria) {
      const sel = document.getElementById('filterCategoria');
      if (sel) sel.value = pendingCategoria;
      pendingCategoria = null;
      filtrarTabela();
    }
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="card-body"><p style="color:var(--danger)">Erro ao carregar: ${esc(err.message)}</p></div></div>`;
  }
}

function gerarTabela(entity, data) {
  if (!data || data.length === 0) {
    return gerarEmptyState('Nenhum registro encontrado', 'Clique em "Novo" para adicionar o primeiro.');
  }
  const cols = Object.keys(data[0]).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
  const isMedicos = entity === 'medicos';
  const headers = cols.map(c => `<th>${rotuloColuna(c)}</th>`).join('');
  const extraHeader = isMedicos ? '<th>Contato</th>' : '';
  const rows = data.map(row => {
    const cells = cols.map(c => `<td>${formatarCelula(c, row[c], row)}</td>`).join('');
    const contato = isMedicos ? `<td>${gerarContato(row)}</td>` : '';
    const catAttr = isMedicos ? ` data-categoria="${esc(row.categoria || '')}"` : '';
    const geoAttr = ` data-uf="${esc(row.uf || '')}" data-cidade="${esc(row.cidade || '')}"`;
    return `<tr${catAttr}${geoAttr}><td class="actions-cell">
      <button class="btn-icon" onclick="editarRegistro('${entity}','${esc(row.id)}')" title="Editar">${ICONS.edit}</button>
      <button class="btn-icon danger" onclick="excluirRegistro('${entity}','${esc(row.id)}')" title="Excluir">${ICONS.trash}</button>
    </td>${cells}${contato}</tr>`;
  }).join('');
  return `<div class="table-wrapper"><table><thead><tr><th style="width:80px">Ações</th>${headers}${extraHeader}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function gerarContato(row) {
  const tel = String(row.telefone || '').replace(/\D/g, '');
  const zap = String(row.whatsapp || '').replace(/\D/g, '');
  const parts = [];
  if (tel) parts.push(`<a class="contact-chip" href="tel:+${tel}" title="Ligar ${esc(row.telefone)}">${ICONS.phone}</a>`);
  if (zap) parts.push(`<a class="contact-chip wa" href="https://wa.me/${zap}?text=${encodeURIComponent('Olá, gostaria de agendar uma consulta.')}" target="_blank" rel="noopener" title="WhatsApp ${esc(row.whatsapp)}">${ICONS.whatsapp}</a>`);
  if (!parts.length) return '<span style="color:var(--text-tertiary)">—</span>';
  return `<div class="contact-group">${parts.join('')}</div>`;
}

function gerarEmptyState(title, hint) {
  return `<div class="empty-state">
    <div class="empty-icon">${ICONS.activity}</div>
    <p>${esc(title)}</p>
    ${hint ? `<span>${esc(hint)}</span>` : ''}
  </div>`;
}

function gerarTabelaAgendamentos(data) {
  if (!data || data.length === 0) {
    return `<div class="card"><div class="card-body"><p style="text-align:center;color:var(--text-tertiary)">Nenhum agendamento</p></div></div>`;
  }
  const headers = ['Paciente', 'Telefone', 'Data', 'Hora', 'Status'];
  const rows = data.map(a => {
    const statusClass = `badge-${String(a.status || 'pendente').toLowerCase()}`;
    return `<tr>
      <td>${esc(a.cliente || '-')}</td>
      <td>${esc(a.telefone || '-')}</td>
      <td>${formatarData(a.data)}</td>
      <td>${esc(a.hora || '-')}</td>
      <td><span class="badge ${statusClass}">${esc(a.status || 'PENDENTE')}</span></td>
    </tr>`;
  }).join('');
  return `<div class="card">
    <div class="card-header">Últimos Agendamentos</div>
    <div class="card-body" style="padding:0">
      <div class="table-wrapper"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
    </div>
  </div>`;
}

function rotuloColuna(key) {
  const map = {
    cliente: 'Paciente', telefone: 'Telefone', whatsapp: 'WhatsApp', data: 'Data', hora: 'Hora',
    status: 'Status', observacoes: 'Observações', servico_nome: 'Serviço',
    servico: 'Serviço', valor: 'Valor', pago: 'Pago', nome: 'Nome',
    email: 'Email', especialidade: 'Especialidade', medico_id: 'Médico',
    paciente_id: 'Paciente', data_nascimento: 'Nascimento', preco: 'Preço',
    descricao: 'Descrição', duracao_minutos: 'Duração (min)', ativo: 'Ativo',
    categoria: 'Categoria', servico_id: 'Serviço',
    cep: 'CEP', logradouro: 'Endereço', bairro: 'Bairro', cidade: 'Cidade',
    uf: 'UF', regiao: 'Região',
  };
  return map[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
}

function formatarCelula(col, val, row) {
  if (val === null || val === undefined) return '-';
  if (col === 'data' || col === 'data_nascimento') return formatarData(val);
  if (col === 'cep') {
    const d = String(val).replace(/\D/g, '');
    return d.length === 8 ? esc(`${d.slice(0, 5)}-${d.slice(5)}`) : esc(val);
  }
  if (col === 'whatsapp') {
    const digits = String(val).replace(/\D/g, '');
    if (!digits) return '-';
    return `<a class="contact-chip wa" href="https://wa.me/${digits}?text=${encodeURIComponent('Olá, gostaria de agendar uma consulta.')}" target="_blank" rel="noopener" title="WhatsApp: ${esc(val)}">${ICONS.whatsapp}</a>`;
  }
  if (col === 'categoria') {
    const cat = categoriasCache.find(c => c.id === val);
    return cat ? esc(cat.nome) : (val ? esc(val) : '-');
  }
  if (col === 'telefone') {
    const digits = String(val).replace(/\D/g, '');
    return digits ? `<a href="tel:+${digits}">${esc(val)}</a>` : '-';
  }
  if (col === 'pago' || col === 'ativo') {
    return val
      ? '<span style="color:var(--success);display:inline-flex"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Sim'
      : '<span style="color:var(--danger);display:inline-flex"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></span> Não';
  }
  if (col === 'status') {
    const cls = `badge-${String(val).toLowerCase()}`;
    return `<span class="badge ${cls}">${esc(val)}</span>`;
  }
  if (col === 'valor' || col === 'preco') {
    const n = parseFloat(val);
    return isNaN(n) ? esc(val) : `R$ ${n.toFixed(2)}`;
  }
  if (col === 'medico_id' || col === 'paciente_id' || col === 'servico_id' || col === 'servico') {
    return esc(String(val || '').substring(0, 8) + '...') || '-';
  }
  return esc(val);
}

function formatarData(str) {
  if (!str) return '-';
  const d = new Date(str);
  return isNaN(d.getTime()) ? esc(str) : d.toLocaleDateString('pt-BR');
}

function gerarFiltroRegiao(data) {
  const ufs = [...new Set((data || []).map(r => String(r.uf || '').trim()).filter(Boolean))].sort();
  const ufOptions = ufs.map(u => `<option value="${esc(u)}">${esc(u)}</option>`).join('');
  return `
    <div class="filter-regiao">
      <select id="filterUf" onchange="onFiltroUf()" aria-label="Filtrar por UF">
        <option value="">Todas as UF</option>
        ${ufOptions}
      </select>
      <select id="filterCidade" onchange="filtrarTabela()" aria-label="Filtrar por cidade">
        <option value="">Todas as cidades</option>
      </select>
    </div>`;
}

function onFiltroUf() {
  const uf = document.getElementById('filterUf')?.value || '';
  const cidadeSel = document.getElementById('filterCidade');
  if (!cidadeSel) return;
  const prev = cidadeSel.value || '';
  const cidades = [];
  document.querySelectorAll('#tableContainer tbody tr').forEach(tr => {
    if (!uf || tr.dataset.uf === uf) {
      const c = tr.dataset.cidade;
      if (c && !cidades.includes(c)) cidades.push(c);
    }
  });
  cidades.sort();
  cidadeSel.innerHTML = `<option value="">Todas as cidades</option>` +
    cidades.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
  if (cidades.includes(prev)) cidadeSel.value = prev;
  filtrarTabela();
}

function filtrarTabela() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const cat = document.getElementById('filterCategoria')?.value || '';
  const uf = document.getElementById('filterUf')?.value || '';
  const cidade = document.getElementById('filterCidade')?.value || '';
  document.querySelectorAll('#tableContainer tbody tr').forEach(tr => {
    const matchQ = tr.textContent.toLowerCase().includes(q);
    const matchCat = !cat || tr.dataset.categoria === cat;
    const matchUf = !uf || tr.dataset.uf === uf;
    const matchCidade = !cidade || tr.dataset.cidade === cidade;
    tr.style.display = (matchQ && matchCat && matchUf && matchCidade) ? '' : 'none';
  });
}

// ---------------------------------------------------------------
// Modal / Formulários (dinâmicos para tabelas da API)
// ---------------------------------------------------------------
async function abrirModal(entity) {
  const entityName = entity || currentPage;
  if (entityName === 'dashboard') return;
  if (!exigirAdmin()) return;
  configurarSalvarPadrao();
  editId = null;
  document.getElementById('modalTitle').textContent = `Novo ${ENTITIES[entityName]?.label || 'Registro'}`;
  document.getElementById('modalBody').innerHTML = await gerarFormulario(entityName);
  document.getElementById('modalOverlay').classList.add('open');
}

async function editarRegistro(entity, id) {
  if (!exigirAdmin()) return;
  configurarSalvarPadrao();
  editId = id;
  try {
    const data = await API.get(entity, id);
    const row = Array.isArray(data) ? data[0] : data;
    document.getElementById('modalTitle').textContent = `Editar ${ENTITIES[entity]?.label || 'Registro'}`;
    document.getElementById('modalBody').innerHTML = await gerarFormulario(entity, row);
    document.getElementById('modalOverlay').classList.add('open');
  } catch (err) {
    mostrarToast('Erro ao carregar registro: ' + err.message, 'error');
  }
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  editId = null;
  clearInterval(window._qrTimer);
  window._qrTimer = null;
  configurarSalvarPadrao();
}

async function buscarCep() {
  const input = document.querySelector('input[name="cep"]');
  if (!input) return;
  const cep = String(input.value || '').replace(/\D/g, '');
  if (cep.length !== 8) {
    mostrarToast('CEP inválido — informe 8 dígitos', 'error');
    return;
  }
  const logradouroEl = document.querySelector('input[name="logradouro"]');
  if (input.dataset.consulta === cep && logradouroEl && String(logradouroEl.value || '').trim()) {
    return;
  }
  input.dataset.consulta = cep;
  const status = document.getElementById('cepStatus');
  if (status) { status.textContent = 'Consultando...'; status.className = 'cep-status'; }
  try {
    const r = await API.cep(cep);
    const set = (k, v) => {
      const el = document.querySelector(`input[name="${k}"]`);
      if (el) el.value = String(v ?? '').trim();
    };
    set('logradouro', r.logradouro);
    set('bairro', r.bairro);
    set('cidade', r.cidade);
    set('uf', r.uf);
    set('regiao', r.regiao);
    if (status) { status.textContent = 'Endereço localizado' + (r.regiao ? ' · região ' + r.regiao : ''); status.className = 'cep-status ok'; }
    mostrarToast('Endereço preenchido automaticamente', 'success');
  } catch (err) {
    input.dataset.consulta = '';
    if (status) { status.textContent = err.message; status.className = 'cep-status err'; }
    mostrarToast(err.message, 'error');
  }
}

async function gerarFormulario(entity, data = {}) {
  let fields = getFormFields(entity);
  if (!fields.length) {
    const metaFields = await gerarCamposGenericos(entity);
    fields = metaFields.length ? metaFields : [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'descricao', label: 'Descrição', type: 'textarea' },
      { key: 'ativo', label: 'Ativo', type: 'select', selectKey: 'ativo', required: false },
    ];
  }
  const selects = await getSelectData(entity);
  const html = fields.map(f => {
    const val = data[f.key] ?? '';
    if (f.type === 'select') {
      const options = (selects[f.selectKey] || []).map(s =>
        `<option value="${esc(s.id)}" ${String(val) === String(s.id) ? 'selected' : ''}>${esc(s.nome || s.label || s.id)}</option>`
      ).join('');
      return `
        <div class="form-group">
          <label>${esc(f.label)}${f.required ? ' <span class="req">*</span>' : ''}</label>
          <select name="${esc(f.key)}" ${f.required ? 'required' : ''}>
            <option value="">Selecione...</option>
            ${options}
          </select>
        </div>`;
    }
    if (f.type === 'textarea') {
      return `
        <div class="form-group">
          <label>${esc(f.label)}${f.required ? ' <span class="req">*</span>' : ''}</label>
          <textarea name="${esc(f.key)}" ${f.required ? 'required' : ''}>${esc(val)}</textarea>
        </div>`;
    }
    if (f.type === 'cep') {
      const cepRaw = String(val).replace(/\D/g, '');
      return `
        <div class="form-group">
          <label>${esc(f.label)}${f.required ? ' <span class="req">*</span>' : ''}</label>
          <div class="cep-row">
            <input type="text" name="${esc(f.key)}" value="${esc(val)}" maxlength="9" placeholder="00000-000" inputmode="numeric" data-consulta="${cepRaw}" onblur="buscarCep()">
            <button type="button" class="btn btn-secondary btn-sm" onclick="buscarCep()">Buscar</button>
          </div>
          <p class="cep-status" id="cepStatus"></p>
        </div>`;
    }
    const ro = f.readonly ? ' readonly' : '';
    return `
      <div class="form-group">
        <label>${esc(f.label)}${f.required ? ' <span class="req">*</span>' : ''}</label>
        <input type="${f.type}" name="${esc(f.key)}" value="${esc(val)}" ${f.required ? 'required' : ''}${ro}>
      </div>`;
  }).join('');
  return `<form id="formRegistro" onsubmit="return false">${html}</form>`;
}

async function gerarCamposGenericos(entity) {
  try {
    const meta = await API.getTableMeta(entity);
    const cols = Array.isArray(meta.columns) ? meta.columns : [];
    return cols
      .filter(c => c !== 'id' && c !== 'created_at' && c !== 'updated_at')
      .map(c => ({ key: c, label: rotuloColuna(c), type: tipoCampoGenerico(c) }));
  } catch { return []; }
}

function tipoCampoGenerico(c) {
  if (/data_nascimento|data$/.test(c)) return 'date';
  if (/hora$/.test(c)) return 'time';
  if (/(preco|valor|custo|taxa|duracao_minutos)$/.test(c)) return 'number';
  if (/(observaco|descricao|comentario|texto|mensagem)$/.test(c)) return 'textarea';
  return 'text';
}

function getFormFields(entity) {
  const fields = {
    agendamentos: [
      { key: 'cliente', label: 'Nome do Paciente', type: 'text', required: true },
      { key: 'telefone', label: 'Telefone', type: 'tel', required: true },
      { key: 'whatsapp', label: 'WhatsApp', type: 'tel' },
      { key: 'data', label: 'Data', type: 'date', required: true },
      { key: 'hora', label: 'Hora', type: 'time', required: true },
      { key: 'servico', label: 'Serviço', type: 'select', selectKey: 'servicos', required: false },
      { key: 'status', label: 'Status', type: 'select', selectKey: 'status', required: false },
      { key: 'observacoes', label: 'Observações', type: 'textarea', required: false },
    ],
    medicos: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'especialidade', label: 'Especialidade', type: 'text', required: true },
      { key: 'categoria', label: 'Categoria', type: 'select', selectKey: 'categorias', required: true },
      { key: 'telefone', label: 'Telefone', type: 'tel' },
      { key: 'whatsapp', label: 'WhatsApp', type: 'tel' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'cep', label: 'CEP', type: 'cep' },
      { key: 'logradouro', label: 'Endereço', type: 'text' },
      { key: 'bairro', label: 'Bairro', type: 'text' },
      { key: 'cidade', label: 'Cidade', type: 'text' },
      { key: 'uf', label: 'UF', type: 'text' },
      { key: 'regiao', label: 'Região', type: 'text', readonly: true },
    ],
    pacientes: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'telefone', label: 'Telefone', type: 'tel' },
      { key: 'whatsapp', label: 'WhatsApp', type: 'tel' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'data_nascimento', label: 'Data de Nascimento', type: 'date' },
      { key: 'cep', label: 'CEP', type: 'cep' },
      { key: 'logradouro', label: 'Endereço', type: 'text' },
      { key: 'bairro', label: 'Bairro', type: 'text' },
      { key: 'cidade', label: 'Cidade', type: 'text' },
      { key: 'uf', label: 'UF', type: 'text' },
      { key: 'regiao', label: 'Região', type: 'text', readonly: true },
    ],
    servicos: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'descricao', label: 'Descrição', type: 'textarea' },
      { key: 'preco', label: 'Preço', type: 'number', step: '0.01' },
      { key: 'duracao_minutos', label: 'Duração (min)', type: 'number' },
      { key: 'categoria', label: 'Categoria', type: 'text' },
      { key: 'ativo', label: 'Ativo', type: 'select', selectKey: 'ativo', required: false },
    ],
    categorias: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'descricao', label: 'Descrição', type: 'textarea' },
      { key: 'ativo', label: 'Ativo', type: 'select', selectKey: 'ativo', required: false },
    ],
  };
  return fields[entity] || [];
}

async function getSelectData(entity) {
  const map = {};
  if (entity === 'agendamentos') {
    try {
      const servicos = await API.get('servicos') || [];
      map.servicos = servicos.map(s => ({ id: s.id, nome: s.nome }));
    } catch {}
    map.status = [
      { id: 'PENDENTE', nome: 'Pendente' },
      { id: 'CONFIRMADO', nome: 'Confirmado' },
      { id: 'REALIZADO', nome: 'Realizado' },
      { id: 'CANCELADO', nome: 'Cancelado' },
    ];
  }
  if (entity === 'medicos') {
    try { categoriasCache = await API.get('categorias') || []; } catch {}
    map.categorias = categoriasCache.map(c => ({ id: c.id, nome: c.nome }));
  }
  map.ativo = [
    { id: '1', nome: 'Sim' },
    { id: '0', nome: 'Não' },
  ];
  return map;
}

async function salvarRegistro() {
  const entity = editId ? currentEntity : (currentEntity || currentPage);
  if (entity === 'dashboard') return;
  const form = document.getElementById('formRegistro');
  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());

  for (const k of Object.keys(data)) {
    if (data[k] === '') delete data[k];
  }

  try {
    if (editId) {
      await API.update(entity, editId, data);
      mostrarToast('Registro atualizado com sucesso!', 'success');
    } else {
      await API.create(entity, data);
      mostrarToast('Registro criado com sucesso!', 'success');
    }
    fecharModal();
    carregarPagina(entity);
    atualizarContagem(entity);
  } catch (err) {
    mostrarToast('Erro ao salvar: ' + err.message, 'error');
  }
}

async function excluirRegistro(entity, id) {
  if (!exigirAdmin()) return;
  if (!confirm('Tem certeza que deseja excluir este registro?')) return;
  try {
    await API.delete(entity, id);
    mostrarToast('Registro excluído com sucesso!', 'success');
    carregarPagina(entity);
    atualizarContagem(entity);
  } catch (err) {
    mostrarToast('Erro ao excluir: ' + err.message, 'error');
  }
}

function mostrarToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ---------------------------------------------------------------
// Inicialização
// ---------------------------------------------------------------
function initNav() {
  document.querySelectorAll('.api-pill').forEach(pill => {
    pill.addEventListener('click', () => { if (!apiOnline) checarStatusApi(true); });
  });
  document.addEventListener('click', e => {
    const drop = document.getElementById('navMoreDrop');
    if (drop && !drop.classList.contains('hidden') && !e.target.closest('.nav-more')) {
      fecharMore();
    }
    if (window.innerWidth < 768) {
      const drawer = document.getElementById('drawer');
      if (drawer.classList.contains('open') && !e.target.closest('#drawer') && !e.target.closest('.hamburger')) {
        fecharDrawer();
      }
    }
  });
  window.addEventListener('resize', () => {
    clearTimeout(window._resizeNavT);
    window._resizeNavT = setTimeout(ajustarOverflowNav, 150);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  aplicarModoInterface();
  checarStatusApi(true);
  setInterval(() => checarStatusApi(false), 15000);
  initAuth();
});