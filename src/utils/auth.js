// Token 管理和认证状态

const TOKEN_KEY = 'dnf_token';
const USER_KEY = 'dnf_current_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const str = localStorage.getItem(USER_KEY);
  if (!str) return null;
  try { return JSON.parse(str); } catch { return null; }
}

export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
  return !!(getToken() && getCurrentUser());
}

export function saveAuth(token, user) {
  setToken(token);
  setCurrentUser(user);
}

export function clearAuth() {
  clearToken();
  clearCurrentUser();
}
