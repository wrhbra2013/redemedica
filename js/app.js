const pages = ['dashboard', 'agendamentos', 'medicos', 'pacientes', 'servicos'];
let currentPage = 'dashboard';
let editId = null;
let currentEntity = '';

const ENTITIES = {
  agendamentos: { label: 'Agendamento', labelPlural: 'Agendamentos' },
  medicos: { label: 'Médico', labelPlural: 'Médicos' },
  pacientes: { label: 'Paciente', labelPlural: 'Pacientes' },
  servicos: { label: 'Serviço', labelPlural: 'Serviços' },
};

const SUBTITLES = {
  dashboard: 'Visão geral dos agendamentos',
  agendamentos: 'Gerencie os agendamentos',
  medicos: 'Cadastro de médicos',
  pacientes: 'Cadastro de pacientes',
  servicos: 'Serviços oferecidos',
};

const ICONS = {
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
};

const STATS = [
  { label: 'Total Agendamentos', icon: 'calendar', tone: 't-indigo' },
  { label: 'Pendentes', icon: 'clock', tone: 't-amber' },
  { label: 'Hoje', icon: 'calendarCheck', tone: 't-green' },
  { label: 'Médicos', icon: 'stethoscope', tone: 't-sky' },
  { label: 'Pacientes', icon: 'users', tone: 't-violet' },
  { label: 'Serviços', icon: 'activity', tone: 't-emerald' },
];

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('redemedica-theme', theme); } catch {}
  const t = document.getElementById('themeToggle');
  if (t) t.innerHTML = ICONS[theme === 'dark' ? 'sun' : 'moon'];
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

document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const page = el.dataset.page;
      navegar(page);
      fecharSidebarMobile();
    });
  });

  API.checkStatus().then(online => {
    const dot = document.querySelector('.status-dot');
    const text = document.querySelector('.status-text');
    if (online) {
      dot.className = 'status-dot online';
      text.textContent = 'API Online';
    } else {
      dot.className = 'status-dot offline';
      text.textContent = 'API Offline';
    }
  });

  navegar('dashboard');
});

function navegar(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
  document.getElementById('pageTitle').textContent = page === 'dashboard' ? 'Dashboard' : ENTITIES[page]?.labelPlural || page;
  document.getElementById('pageSubtitle').textContent = SUBTITLES[page] || '';
  const btnNovo = document.getElementById('btnNovo');
  btnNovo.style.display = page === 'dashboard' ? 'none' : 'inline-flex';
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
  return carregarTabela(page, container);
}

async function carregarDashboard(container) {
  try {
    const [agendamentos, medicos, pacientes, servicos] = await Promise.all([
      API.get('agendamentos'),
      API.get('medicos'),
      API.get('pacientes'),
      API.get('servicos'),
    ]);

    const data = agendamentos || [];
    const pendentes = data.filter(a => a.status === 'PENDENTE' || !a.status).length;
    const hoje = new Date().toISOString().split('T')[0];
    const hojeCount = data.filter(a => a.data && a.data.startsWith(hoje)).length;

    const values = [data.length, pendentes, hojeCount, (medicos || []).length, (pacientes || []).length, (servicos || []).length];

    const cards = STATS.map((s, i) => `
      <div class="stat-card">
        <div class="stat-icon ${s.tone}">${ICONS[s.icon]}</div>
        <div class="stat-value">${values[i]}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="stats-grid">${cards}</div>
      ${gerarTabelaAgendamentos(data.slice(0, 10))}
    `;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="card-body"><p style="color:var(--danger)">Erro ao carregar: ${err.message}</p></div></div>`;
  }
}

async function carregarTabela(entity, container) {
  currentEntity = entity;
  try {
    const data = await API.get(entity) || [];
    const body = data.length === 0
      ? gerarEmptyState('Nenhum registro encontrado', 'Clique em "Novo" para adicionar o primeiro.')
      : `<div class="card"><div class="card-body" id="tableContainer">${gerarTabela(entity, data)}</div></div>`;
    container.innerHTML = `
      <div class="search-bar">
        <span class="search-icon">${ICONS.search}</span>
        <input type="text" placeholder="Buscar..." id="searchInput" oninput="filtrarTabela()">
      </div>
      ${body}
    `;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="card-body"><p style="color:var(--danger)">Erro ao carregar: ${err.message}</p></div></div>`;
  }
}

function gerarTabela(entity, data) {
  if (!data || data.length === 0) {
    return gerarEmptyState('Nenhum registro encontrado', 'Clique em "Novo" para adicionar o primeiro.');
  }
  const cols = Object.keys(data[0]).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
  const headers = cols.map(c => `<th>${rotuloColuna(c)}</th>`).join('');
  const rows = data.map(row => {
    const cells = cols.map(c => `<td>${formatarCelula(c, row[c], row)}</td>`).join('');
    return `<tr><td class="actions-cell">
      <button class="btn-icon" onclick="editarRegistro('${entity}','${row.id}')" title="Editar">${ICONS.edit}</button>
      <button class="btn-icon danger" onclick="excluirRegistro('${entity}','${row.id}')" title="Excluir">${ICONS.trash}</button>
    </td>${cells}</tr>`;
  }).join('');
  return `<div class="table-wrapper"><table><thead><tr><th style="width:80px">Ações</th>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function gerarEmptyState(title, hint) {
  return `<div class="empty-state">
    <div class="empty-icon">${ICONS.activity}</div>
    <p>${title}</p>
    ${hint ? `<span>${hint}</span>` : ''}
  </div>`;
}

function gerarTabelaAgendamentos(data) {
  if (!data || data.length === 0) {
    return `<div class="card"><div class="card-body"><p style="text-align:center;color:var(--text-tertiary)">Nenhum agendamento</p></div></div>`;
  }
  const headers = ['Paciente', 'Telefone', 'Data', 'Hora', 'Status'];
  const rows = data.map(a => {
    const statusClass = `badge-${(a.status || 'pendente').toLowerCase()}`;
    return `<tr>
      <td>${a.cliente || '-'}</td>
      <td>${a.telefone || '-'}</td>
      <td>${formatarData(a.data)}</td>
      <td>${a.hora || '-'}</td>
      <td><span class="badge ${statusClass}">${a.status || 'PENDENTE'}</span></td>
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
    cliente: 'Paciente', telefone: 'Telefone', data: 'Data', hora: 'Hora',
    status: 'Status', observacoes: 'Observações', servico_nome: 'Serviço',
    servico: 'Serviço', valor: 'Valor', pago: 'Pago', nome: 'Nome',
    email: 'Email', especialidade: 'Especialidade', medico_id: 'Médico',
    paciente_id: 'Paciente', data_nascimento: 'Nascimento', preco: 'Preço',
    descricao: 'Descrição', duracao_minutos: 'Duração (min)', ativo: 'Ativo',
    categoria: 'Categoria', servico_id: 'Serviço',
  };
  return map[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
}

function formatarCelula(col, val, row) {
  if (val === null || val === undefined) return '-';
  if (col === 'data' || col === 'data_nascimento') return formatarData(val);
  if (col === 'pago' || col === 'ativo') {
    return val
      ? '<span style="color:var(--success);display:inline-flex"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Sim'
      : '<span style="color:var(--danger);display:inline-flex"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></span> Não';
  }
  if (col === 'status') {
    const cls = `badge-${String(val).toLowerCase()}`;
    return `<span class="badge ${cls}">${val}</span>`;
  }
  if (col === 'valor' || col === 'preco') {
    const n = parseFloat(val);
    return isNaN(n) ? val : `R$ ${n.toFixed(2)}`;
  }
  if (col === 'medico_id' || col === 'paciente_id' || col === 'servico_id' || col === 'servico') {
    return val?.substring(0, 8) + '...' || '-';
  }
  return val;
}

function formatarData(str) {
  if (!str) return '-';
  const d = new Date(str);
  return isNaN(d.getTime()) ? str : d.toLocaleDateString('pt-BR');
}

function filtrarTabela() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
  document.querySelectorAll('#tableContainer tbody tr').forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

async function abrirModal(entity) {
  const entityName = entity || currentPage;
  if (entityName === 'dashboard') return;
  editId = null;
  document.getElementById('modalTitle').textContent = `Novo ${ENTITIES[entityName]?.label || 'Registro'}`;
  document.getElementById('modalBody').innerHTML = await gerarFormulario(entityName);
  document.getElementById('modalOverlay').classList.add('open');
}

async function editarRegistro(entity, id) {
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
}

async function gerarFormulario(entity, data = {}) {
  const fields = getFormFields(entity);
  const selects = await getSelectData(entity);
  const html = fields.map(f => {
    const val = data[f.key] ?? '';
    if (f.type === 'select') {
      const options = (selects[f.selectKey] || []).map(s =>
        `<option value="${s.id}" ${String(val) === String(s.id) ? 'selected' : ''}>${s.nome || s.label || s.id}</option>`
      ).join('');
      return `
        <div class="form-group">
          <label>${f.label}${f.required ? ' <span class="req">*</span>' : ''}</label>
          <select name="${f.key}" ${f.required ? 'required' : ''}>
            <option value="">Selecione...</option>
            ${options}
          </select>
        </div>`;
    }
    if (f.type === 'textarea') {
      return `
        <div class="form-group">
          <label>${f.label}${f.required ? ' <span class="req">*</span>' : ''}</label>
          <textarea name="${f.key}" ${f.required ? 'required' : ''}>${val}</textarea>
        </div>`;
    }
    return `
      <div class="form-group">
        <label>${f.label}${f.required ? ' <span class="req">*</span>' : ''}</label>
        <input type="${f.type}" name="${f.key}" value="${val}" ${f.required ? 'required' : ''}>
      </div>`;
  }).join('');
  return `<form id="formRegistro" onsubmit="return false">${html}</form>`;
}

function getFormFields(entity) {
  const base = [
    { key: 'nome', label: 'Nome', type: 'text', required: true },
    { key: 'telefone', label: 'Telefone', type: 'text', required: false },
    { key: 'email', label: 'Email', type: 'email', required: false },
  ];
  const fields = {
    agendamentos: [
      { key: 'cliente', label: 'Nome do Paciente', type: 'text', required: true },
      { key: 'telefone', label: 'Telefone', type: 'text', required: true },
      { key: 'data', label: 'Data', type: 'date', required: true },
      { key: 'hora', label: 'Hora', type: 'time', required: true },
      { key: 'servico', label: 'Serviço', type: 'select', selectKey: 'servicos', required: false },
      {
        key: 'status', label: 'Status', type: 'select', selectKey: 'status', required: false,
      },
      { key: 'observacoes', label: 'Observações', type: 'textarea', required: false },
    ],
    medicos: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'especialidade', label: 'Especialidade', type: 'text', required: true },
      { key: 'telefone', label: 'Telefone', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
    ],
    pacientes: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'telefone', label: 'Telefone', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'data_nascimento', label: 'Data de Nascimento', type: 'date' },
    ],
    servicos: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'descricao', label: 'Descrição', type: 'textarea' },
      { key: 'preco', label: 'Preço', type: 'number', step: '0.01' },
      { key: 'duracao_minutos', label: 'Duração (min)', type: 'number' },
      { key: 'categoria', label: 'Categoria', type: 'text' },
    ],
  };
  return fields[entity] || base;
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
  return map;
}

async function salvarRegistro() {
  const entity = editId ? currentEntity : (currentEntity || currentPage);
  if (entity === 'dashboard') return;
  const form = document.getElementById('formRegistro');
  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());

  // Campos vazios não são enviados para manter o valor original
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
  } catch (err) {
    mostrarToast('Erro ao salvar: ' + err.message, 'error');
  }
}

async function excluirRegistro(entity, id) {
  if (!confirm('Tem certeza que deseja excluir este registro?')) return;
  try {
    await API.delete(entity, id);
    mostrarToast('Registro excluído com sucesso!', 'success');
    carregarPagina(entity);
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

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.querySelector('.sidebar-backdrop').classList.toggle('open');
}

function fecharSidebarMobile() {
  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.querySelector('.sidebar-backdrop').classList.remove('open');
  }
}