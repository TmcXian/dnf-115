// Vue Router 路由配置
import { createRouter, createWebHashHistory } from 'vue-router';
import { isLoggedIn } from './utils/auth.js';
import { showToast } from './store.js';

import HomePage from './views/HomePage.js';
import RankPage from './views/RankPage.js';
import QueryPage from './views/QueryPage.js';
import ComparePage from './views/ComparePage.js';
import DetailPage from './views/DetailPage.js';
import LogsPage from './views/LogsPage.js';
import OathOverviewPage from './views/OathOverviewPage.js';
import OathDetailPage from './views/OathDetailPage.js';

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: '首页' } },
  { path: '/rank', name: 'rank', component: RankPage, meta: { title: '强度排行' } },
  { path: '/query', name: 'query', component: QueryPage, meta: { title: '套装查询' } },
  { path: '/compare', name: 'compare', component: ComparePage, meta: { title: '套装对比' } },
  { path: '/detail/:setId', name: 'detail', component: DetailPage, props: true, meta: { title: '套装详情' } },
  { path: '/logs', name: 'logs', component: LogsPage, meta: { title: '操作日志', requiresAuth: true } },
  { path: '/oaths', name: 'oath-overview', component: OathOverviewPage, meta: { title: '誓约系统' } },
  { path: '/oaths/:oathId', name: 'oath-detail', component: OathDetailPage, props: true, meta: { title: '誓约详情' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 }; }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = `DNF 115 — ${to.meta.title}`;
  if (to.meta.requiresAuth && !isLoggedIn()) { showToast('请先登录后查看操作日志', 'warning'); next({ name: 'home' }); return; }
  next();
});

export default router;
