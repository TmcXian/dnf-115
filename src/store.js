// 全局响应式状态管理 (Vue 3 reactive)
import { reactive, computed, readonly } from 'vue';
import { getToken, getCurrentUser, saveAuth, clearAuth } from './utils/auth.js';
import { MAX_COMPARE_SETS } from './utils/constants.js';

// ---- Auth State ----
const _auth = reactive({
  token: getToken(),
  user: getCurrentUser(),
  showModal: false,
  modalTab: 'login' // 'login' | 'register'
});

export const authState = readonly(_auth);
export const isLoggedIn = computed(() => !!(_auth.token && _auth.user));

export function openAuthModal(tab = 'login') {
  _auth.showModal = true;
  _auth.modalTab = tab;
}

export function closeAuthModal() {
  _auth.showModal = false;
}

export function switchAuthTab(tab) {
  _auth.modalTab = tab;
}

export function loginSuccess(token, user) {
  saveAuth(token, user);
  _auth.token = token;
  _auth.user = user;
  _auth.showModal = false;
}

export function logout() {
  clearAuth();
  _auth.token = null;
  _auth.user = null;
}

// ---- Comparison State ----
const _compare = reactive({
  selectedSets: [] // array of set keys
});

export const compareState = readonly(_compare);

export function addToCompare(setKey) {
  if (_compare.selectedSets.length >= MAX_COMPARE_SETS) return false;
  if (_compare.selectedSets.includes(setKey)) return false;
  _compare.selectedSets.push(setKey);
  return true;
}

export function removeFromCompare(setKey) {
  _compare.selectedSets = _compare.selectedSets.filter(k => k !== setKey);
}

export function clearCompare() {
  _compare.selectedSets = [];
}

export function isInCompare(setKey) {
  return _compare.selectedSets.includes(setKey);
}

// ---- Toast State ----
let toastId = 0;
const _toast = reactive({ queue: [] });

export const toastState = readonly(_toast);

export function showToast(message, type = 'info', duration = 3000) {
  const id = ++toastId;
  _toast.queue.push({ id, message, type, duration });
  setTimeout(() => {
    _toast.queue = _toast.queue.filter(t => t.id !== id);
  }, duration);
}

// ---- UI State ----
const _ui = reactive({ sidebarCollapsed: false });
export const uiState = readonly(_ui);

export function toggleSidebar() {
  _ui.sidebarCollapsed = !_ui.sidebarCollapsed;
}
