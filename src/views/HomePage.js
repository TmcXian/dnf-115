import { sets } from '../data/sets.js';

export default {
  name: 'HomePage',
  data() {
    const groups = [
      { key: 'core', label: '核心毕业套装', color: '#f0c040', sets: [] },
      { key: 'balanced', label: '均衡实用套装', color: '#58a6ff', sets: [] },
      { key: 'beginner', label: '新手/平民套装', color: '#3fb950', sets: [] }
    ];
    const cat = { core: [], balanced: [], beginner: [] };
    sets.forEach(s => { if (cat[s.category]) cat[s.category].push(s); });
    groups[0].sets = cat.core; groups[1].sets = cat.balanced; groups[2].sets = cat.beginner;
    return { tierGroups: groups };
  },
  template: `
  <div class="home-page">
    <section class="hero"><div class="hero-bg"></div>
      <div class="hero-content container">
        <h1 class="hero-title">千海天版本 · 誓约套装指南</h1>
        <p class="hero-subtitle">专业的 DNF 装备套装查询、对比与誓约系统分析工具</p>
        <div class="hero-actions">
          <router-link to="/oaths" class="btn btn-primary btn-lg">🔱 誓约系统</router-link>
          <router-link to="/query" class="btn btn-outline btn-lg">套装查询</router-link>
        </div>
      </div>
    </section>
    <section class="container nav-section">
      <div class="nav-grid">
        <router-link to="/rank" class="nav-card glass-card"><span class="nav-icon">📊</span><h3>强度排行</h3><p>多维度套装强度对比与排序</p></router-link>
        <router-link to="/query" class="nav-card glass-card"><span class="nav-icon">🔍</span><h3>套装查询</h3><p>搜索与浏览所有套装属性</p></router-link>
        <router-link to="/compare" class="nav-card glass-card"><span class="nav-icon">⚖</span><h3>套装对比</h3><p>最多4套装备同屏对比</p></router-link>
        <router-link to="/oaths" class="nav-card glass-card oath-highlight"><span class="nav-icon">🔱</span><h3>誓约系统</h3><p>千海天版本全新誓约装备</p><span class="new-badge">NEW</span></router-link>
      </div>
    </section>
    <section class="container showcase-section" v-for="group in tierGroups" :key="group.key">
      <h2 class="section-title"><span class="title-accent" :style="{borderColor:group.color}"></span>{{ group.label }}</h2>
      <set-grid :sets="group.sets" />
    </section>
  </div>`
};
