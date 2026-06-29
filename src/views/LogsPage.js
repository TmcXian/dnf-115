import { apiFetchLogs } from '../api.js';
import { formatDate } from '../utils/helpers.js';

export default {
  name: 'LogsPage',
  data() { return { logs:[], currentPage:1, totalPages:1, total:0, filterAction:'', loading:false, breadcrumbs:[{label:'首页',to:'/'},{label:'操作日志'}] }; },
  created() { this.fetchLogs(1); },
  methods: {
    formatDate,
    async fetchLogs(page) {
      this.loading = true; this.currentPage = page;
      try { const data = await apiFetchLogs({page,limit:20,action:this.filterAction}); this.logs = data.logs||data.rows||[]; this.totalPages = data.totalPages||Math.ceil((data.total||0)/20); this.total = data.total||0; }
      catch(e) { console.error('获取日志失败:', e); this.logs = []; }
      this.loading = false;
    },
    actionLabel(a) { const m={login:'登录成功',login_failed:'登录失败',login_blocked:'登录锁定',register:'注册'}; return m[a]||a; },
    actionVariant(a) { const m={login:'success',login_failed:'danger',login_blocked:'warning',register:'info'}; return m[a]||'default'; }
  },
  template: `
  <div class="container page-container">
    <breadcrumb-nav :items="breadcrumbs" /><h1 class="page-title">操作日志</h1>
    <div class="filter-bar">
      <select class="select" v-model="filterAction" @change="fetchLogs(1)"><option value="">全部操作</option><option value="login">登录成功</option><option value="login_failed">登录失败</option><option value="login_blocked">登录锁定</option><option value="register">注册</option></select>
      <button class="btn btn-ghost btn-sm" @click="fetchLogs(currentPage)">🔄 刷新</button>
    </div>
    <div class="log-table-wrapper glass-card" v-if="logs.length"><table class="log-table"><thead><tr><th>时间</th><th>用户</th><th>操作</th><th>详情</th><th>IP</th></tr></thead>
      <tbody><tr v-for="log in logs" :key="log.id"><td class="time-cell">{{ formatDate(log.created_at) }}</td><td>{{ log.username||'—' }}</td><td><tag-badge :label="actionLabel(log.action)" :variant="actionVariant(log.action)" /></td><td>{{ log.detail||'—' }}</td><td class="ip-cell">{{ log.ip||'—' }}</td></tr></tbody></table></div>
    <empty-state v-if="!loading&&!logs.length" icon="📋" title="暂无操作日志" />
    <pagination-nav v-if="totalPages>1" :current-page="currentPage" :total-pages="totalPages" :total="total" @page-change="fetchLogs" />
    <div v-if="loading" style="text-align:center;padding:var(--space-xl)"><div class="spinner"></div></div>
  </div>`
};
