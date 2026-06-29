import { toastState } from '../store.js';

export default {
  name: 'DnfToast',
  data() { return { toastState, iconMap: { success:'✅', error:'❌', warning:'⚠', info:'💬' } }; },
  template: `
  <Teleport to="body"><div class="toast-container"><transition-group name="toast" tag="div">
    <div v-for="t in toastState.queue" :key="t.id" class="toast-item" :class="'toast-'+t.type">
      <span class="toast-icon">{{ iconMap[t.type] || '💬' }}</span>
      <span class="toast-msg">{{ t.message }}</span>
    </div>
  </transition-group></div></Teleport>`
};
