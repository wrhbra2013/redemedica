const API = {
  baseURL: 'https://api.projetosdinamicos.com.br/redemedica',
  project: 'rede.medica',

  async request(method, table, data = null, id = null) {
    let url = `${this.baseURL}/${this.project}/${table}`;
    if (id) url += `?id=${id}`;

    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (this._token) {
      opts.headers['Authorization'] = `Bearer ${this._token}`;
    }
    if (data && (method === 'POST' || method === 'PUT')) {
      opts.body = JSON.stringify(data);
    }

    const res = await fetch(url, opts);
    const text = await res.text();
    if (!res.ok) throw new Error(text || 'Erro na requisição');
    try { return JSON.parse(text); } catch { return text; }
  },

  setToken(token) { this._token = token || null; },

  async login(token) {
    const res = await fetch(`${this.baseURL}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      throw new Error((data && data.error) || 'Token inválido');
    }
    this._token = token;
    return true;
  },

  async checkAuth() {
    if (!this._token) return false;
    try {
      const res = await fetch(`${this.baseURL}/api/auth/check`, {
        headers: { Authorization: `Bearer ${this._token}` },
      });
      const data = await res.json().catch(() => ({}));
      return res.ok && !!data.ok;
    } catch {
      return false;
    }
  },

  async cep(cep) {
    const res = await fetch(`${this.baseURL}/api/cep/${String(cep).replace(/\D/g, '')}`);
    const text = await res.text();
    let data = null;
    try { data = JSON.parse(text); } catch { data = null; }
    if (!res.ok || !data || data.erro) {
      throw new Error((data && data.message) || 'CEP não encontrado');
    }
    return data;
  },

  async otpGenerate() {
    const res = await fetch(`${this.baseURL}/api/auth/otp/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token || ''}`,
      },
      body: JSON.stringify({}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data && data.error) || 'Falha ao gerar código');
    }
    return data;
  },

  async otpValidate(code) {
    const res = await fetch(`${this.baseURL}/api/auth/otp/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      throw new Error((data && data.error) || 'Código inválido');
    }
    return data;
  },

  async getConfig(key) {
    const res = await fetch(`${this.baseURL}/api/config/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${this._token || ''}` },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data && data.error) || 'Falha ao ler configuração');
    }
    return data;
  },

  async saveConfig(key, valor) {
    const res = await fetch(`${this.baseURL}/api/config/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token || ''}`,
      },
      body: JSON.stringify({ valor }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data && data.error) || 'Falha ao salvar configuração');
    }
    return data;
  },

  get(table, id = null) { return this.request('GET', table, null, id); },
  create(table, data) { return this.request('POST', table, data); },
  update(table, id, data) { return this.request('PUT', table, data, id); },
  delete(table, id) { return this.request('DELETE', table, null, id); },

  async getTables() {
    const res = await fetch(`${this.baseURL}/api/tables`);
    const text = await res.text();
    if (!res.ok) throw new Error(text || 'Erro ao listar tabelas');
    try { return JSON.parse(text); } catch { return []; }
  },

  async getTableMeta(table) {
    const res = await fetch(`${this.baseURL}/api/table/${table}`);
    const text = await res.text();
    if (!res.ok) throw new Error(text || 'Erro ao carregar metadados');
    return JSON.parse(text);
  },

  async checkStatus() {
    try {
      const res = await fetch(`${this.baseURL}/health`);
      const data = await res.json();
      return data.projects && data.projects[this.project] === 'ok';
    } catch {
      return false;
    }
  },
};