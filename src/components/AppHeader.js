import { authState, isLoggedIn, openAuthModal, logout } from '../store.js';

export default {
  name: 'AppHeader',
  computed: {
    authState: () => authState,
    isLoggedIn: () => isLoggedIn.value
  },
  methods: { openAuthModal, handleLogout() { logout(); } },
  template: `
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="header-brand">
        <img src="./static/img/logo/dnf-logo.png" alt="DNF" class="header-logo" />
        <span class="header-title">千海天 · 誓约套装指南</span>
      </router-link>
      <nav class="header-nav">
        <router-link to="/" class="nav-link home-link">🏠 首页</router-link>
        <router-link to="/rank" class="nav-link">排行</router-link>
        <router-link to="/query" class="nav-link">查询</router-link>
        <router-link to="/compare" class="nav-link">对比</router-link>
        <router-link to="/oaths" class="nav-link oath-link">誓约</router-link>
      </nav>
      <div class="header-auth">
        <template v-if="isLoggedIn">
          <div class="user-menu">
            <span class="user-name">👤 {{ authState.user?.username }}</span>
            <router-link to="/logs" class="nav-link logs-link">日志</router-link>
            <button class="btn btn-ghost btn-sm" @click="handleLogout">退出</button>
          </div>
        </template>
        <button v-else class="btn btn-primary btn-sm" @click="openAuthModal('login')">登录/注册</button>
      </div>
    </div>
  </header>`
};
