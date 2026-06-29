import { sets } from '../data/sets.js';
import { addToCompare, showToast, isInCompare } from '../store.js';

export default {
  name: 'DetailPage',
  props: { setId: String },
  data() { return { set: null }; },
  computed: { breadcrumbs() { return [{label:'首页',to:'/'},{label:'套装查询',to:'/query'},{label:this.set?.name||'套装详情'}]; } },
  created() { this.set = sets.find(s => s.id === this.setId) || null; if (this.set) document.title = `DNF 115 — ${this.set.name}`; },
  methods: {
    parseStat(val) { if (typeof val === 'number') return val; const m = String(val).match(/(\d+)/); return m ? parseInt(m[1]) : 50; },
    addToCompareHandler() { if (addToCompare(this.setId)) showToast('已添加 '+this.set.name, 'success'); else showToast(isInCompare(this.setId)?'已在对比列表中':'对比列表已满','warning'); }
  },
  template: `
  <div class="container page-container" v-if="set">
    <breadcrumb-nav :items="breadcrumbs" />
    <div class="detail-header">
      <img :src="set.icon" :alt="set.name" class="detail-icon" />
      <div class="detail-info"><h1 class="detail-name">{{ set.name }}</h1><p class="detail-alias">别名：{{ set.alias }}</p>
        <div class="detail-tags"><tag-badge :label="set.tierLabel" :variant="set.category" /><tag-badge :label="set.difficulty" variant="difficulty" /></div>
      </div>
    </div>
    <div class="detail-card glass-card p-lg mt-lg"><h3>套装描述</h3><p class="detail-desc">{{ set.description }}</p></div>
    <div class="detail-card glass-card p-lg mt-lg"><h3>属性详情</h3>
      <div class="stats-grid"><div v-for="(val,key) in set.stats" :key="key" class="stat-item"><span class="stat-label">{{ key }}</span><stat-bar :value="parseStat(val)" :max="100" :display-value="String(val)" /></div></div>
    </div>
    <div class="detail-card glass-card p-lg mt-lg" v-if="set.recommendation"><h3>推荐说明</h3><p class="detail-desc">{{ set.recommendation }}</p></div>
    <div class="detail-actions mt-xl">
      <button class="btn btn-primary" @click="addToCompareHandler">⚖ 加入对比</button>
      <button class="btn btn-outline" @click="$router.push('/compare')">前往对比页</button>
      <button class="btn btn-ghost" @click="$router.back()">← 返回</button>
    </div>
  </div>
  <div class="container page-container" v-else><empty-state icon="❓" title="未找到套装" :description="'套装ID: '+setId" /></div>`
};
