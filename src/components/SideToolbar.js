import { apiLaunchDnf, apiDownloadDnf } from '../api.js';
import { showToast } from '../store.js';

export default {
  name: 'SideToolbar',
  data() { return { launching: false }; },
  methods: {
    async handleLaunch() {
      this.launching = true;
      try {
        const data = await apiLaunchDnf();
        showToast(data.message || '游戏启动中...', 'success', 4000);
      } catch { showToast('启动失败，请检查游戏是否已安装', 'error'); }
      setTimeout(() => { this.launching = false; }, 2000);
    },
    handleDownload() {
      apiDownloadDnf();
      showToast('正在下载地下城与勇士启动器...', 'info', 4000);
    }
  },
  template: `
  <aside class="side-toolbar">
    <button class="tool-btn launch" @click="handleLaunch" :disabled="launching" title="启动DNF">
      <span class="tool-icon">{{ launching ? '⏳' : '🎮' }}</span>
      <span class="tool-label">启动</span>
    </button>
    <span class="tool-divider">DNF</span>
    <a class="tool-btn website" href="https://dnf.qq.com/" target="_blank" title="DNF官方网站">
      <span class="tool-icon">🌐</span><span class="tool-label">官网</span>
    </a>
    <button class="tool-btn download" @click="handleDownload" title="下载DNF">
      <span class="tool-icon">⬇</span><span class="tool-label">下载</span>
    </button>
  </aside>`
};
