// Vue 应用启动入口
import { createApp } from 'vue';
import router from './router.js';

// 导入所有组件
import AppHeader from './components/AppHeader.js';
import SideToolbar from './components/SideToolbar.js';
import AuthModal from './components/AuthModal.js';
import DnfToast from './components/DnfToast.js';
import LoadingSpinner from './components/LoadingSpinner.js';
import SetCard from './components/SetCard.js';
import SetGrid from './components/SetGrid.js';
import TagBadge from './components/TagBadge.js';
import Breadcrumb from './components/Breadcrumb.js';
import StatBar from './components/StatBar.js';
import StatRadar from './components/StatRadar.js';
import EmptyState from './components/EmptyState.js';
import TermTooltip from './components/TermTooltip.js';
import RankItem from './components/RankItem.js';
import CompareTable from './components/CompareTable.js';
import CompareSelector from './components/CompareSelector.js';
import Pagination from './components/Pagination.js';
import OathBranchCard from './components/OathBranchCard.js';
import OathStarSlots from './components/OathStarSlots.js';
import MistProgressBar from './components/MistProgressBar.js';

// 根组件 — 极简模板排查问题
const AppTemplate = {
  template: `
    <div class="app-root">
      <div class="app-debug" style="position:fixed;bottom:0;left:0;z-index:9999;background:#161b22;color:#3fb950;padding:4px 12px;font-size:11px;border-radius:0 8px 0 0;border:1px solid #30363d;border-bottom:none;border-left:none;">✓ Vue 已启动 v0.1</div>
      <app-header />
      <side-toolbar />
      <main class="app-main">
        <router-view />
      </main>
      <auth-modal />
      <dnf-toast />
    </div>
  `,
  mounted() {
    console.log('✅ AppTemplate mounted');
    console.log('Routes:', this.$router.getRoutes().length);
  },
  errorCaptured(err) {
    console.error('AppTemplate error:', err);
    return false;
  }
};

// 创建应用
const app = createApp(AppTemplate);
app.use(router);

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('[Vue Error]', err.message, '| component:', instance?.$options?.name, '| info:', info);
  // 在页面上显示错误
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;top:60px;right:10px;z-index:9999;background:#f85149;color:#fff;padding:8px 14px;font-size:12px;border-radius:6px;max-width:400px;';
  el.textContent = 'Error: ' + (err.message || String(err));
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5000);
};

// 注册所有全局组件
app.component('app-header', AppHeader);
app.component('side-toolbar', SideToolbar);
app.component('auth-modal', AuthModal);
app.component('dnf-toast', DnfToast);
app.component('loading-spinner', LoadingSpinner);
app.component('set-card', SetCard);
app.component('set-grid', SetGrid);
app.component('tag-badge', TagBadge);
app.component('breadcrumb-nav', Breadcrumb);
app.component('stat-bar', StatBar);
app.component('stat-radar', StatRadar);
app.component('empty-state', EmptyState);
app.component('term-tooltip', TermTooltip);
app.component('rank-item', RankItem);
app.component('compare-table', CompareTable);
app.component('compare-selector', CompareSelector);
app.component('pagination-nav', Pagination);
app.component('oath-branch-card', OathBranchCard);
app.component('oath-star-slots', OathStarSlots);
app.component('mist-progress-bar', MistProgressBar);

// 挂载
app.mount('#app');
console.log('✅ DNF 千海天 · 誓约套装指南 已启动');
