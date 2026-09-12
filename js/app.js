const PAGES = {
  dashboard: { label: 'Dashboard', icon: 'grid', section: 'Visão Geral' },
  agendamentos: { label: 'Agendamentos', icon: 'calendar', section: 'Agenda' },
  medicos: { label: 'Médicos', icon: 'stethoscope', section: 'Agenda' },
  pacientes: { label: 'Pacientes', icon: 'users', section: 'Agenda' },
  servicos: { label: 'Serviços', icon: 'activity', section: 'Catálogo' },
  categorias: { label: 'Categorias', icon: 'category', section: 'Catálogo' },
};

const SECTION_ORDER = ['Visão Geral', 'Agenda', 'Catálogo', 'Outras tabelas'];

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
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
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
};

let currentPage = 'dashboard';
let editId = null;
let currentEntity = '';
let categoriasCache = [];
let pendingCategoria = null;
let apiOnline = false;
let navMeta = [];
let navItemIndex = {};

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
  nav.dataset.count = String(navMeta.length);
  navMeta.forEach(m => nav.appendChild(criarNavItem(m)));
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
  montarNavMeta(tables);
  renderNav();
}

async function carregarContagens() {
  if (!apiOnline) return;
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
  if (!apiOnline || entity === 'dashboard') return;
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
  currentPage = page;
  currentEntity = ENTITIES[page] ? page : '';
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
  document.getElementById('pageTitle').textContent = page === 'dashboard' ? 'Dashboard' : (ENTITIES[page]?.labelPlural || nomeBonitoDaTabela(page));
  document.getElementById('pageSubtitle').textContent = SUBTITLES[page] || '';
  const iconEl = document.getElementById('pageIcon');
  if (iconEl) iconEl.innerHTML = ICONS[PAGE_ICONS[page] || 'grid'];
  const showNovo = page !== 'dashboard';
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
// Tabelas e CRUD
// ---------------------------------------------------------------
async function carregarTabela(entity, container) {
  currentEntity = entity;
  try {
    const data = await API.get(entity) || [];
    let catFilter = '';
    if (entity === 'medicos') {
      try { categoriasCache = await API.get('categorias') || []; } catch {}
      catFilter = `<div class="filter-categoria">
        <select id="filterCategoria" onchange="filtrarTabela()">
          <option value="">Todas as categorias</option>
          ${categoriasCache.map(c => `<option value="${esc(c.id)}">${esc(c.nome)}</option>`).join('')}
        </select>
      </div>`;
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
    return `<tr${catAttr}><td class="actions-cell">
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
  };
  return map[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
}

function formatarCelula(col, val, row) {
  if (val === null || val === undefined) return '-';
  if (col === 'data' || col === 'data_nascimento') return formatarData(val);
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

function filtrarTabela() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const cat = document.getElementById('filterCategoria')?.value || '';
  document.querySelectorAll('#tableContainer tbody tr').forEach(tr => {
    const matchQ = tr.textContent.toLowerCase().includes(q);
    const matchCat = !cat || tr.dataset.categoria === cat;
    tr.style.display = (matchQ && matchCat) ? '' : 'none';
  });
}

// ---------------------------------------------------------------
// Modal / Formulários (dinâmicos para tabelas da API)
// ---------------------------------------------------------------
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
    return `
      <div class="form-group">
        <label>${esc(f.label)}${f.required ? ' <span class="req">*</span>' : ''}</label>
        <input type="${f.type}" name="${esc(f.key)}" value="${esc(val)}" ${f.required ? 'required' : ''}>
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
    ],
    pacientes: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'telefone', label: 'Telefone', type: 'tel' },
      { key: 'whatsapp', label: 'WhatsApp', type: 'tel' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'data_nascimento', label: 'Data de Nascimento', type: 'date' },
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
  montarNavMeta([]);
  renderNav();
  checarStatusApi(true);
  navegar('dashboard');
  setInterval(() => checarStatusApi(false), 15000);
});