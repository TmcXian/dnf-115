// 后端 API 封装
import { API_BASE } from './utils/constants.js';
import { getToken } from './utils/auth.js';

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

export function apiLogin(username, password) {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}

export function apiRegister(username, password) {
  return request('/api/register', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}

export function apiFetchLogs({ page = 1, limit = 20, action = '' } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (action) params.set('action', action);
  return request(`/api/logs?${params}`);
}

export function apiLaunchDnf() {
  return request('/api/launch-dnf', { method: 'POST' });
}

export function apiDownloadDnf() {
  let iframe = document.getElementById('downloadFrame');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'downloadFrame';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
  iframe.src = '/api/download-dnf';
}
