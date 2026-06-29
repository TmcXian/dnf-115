import { compareState, removeFromCompare } from '../store.js';
import { sets } from '../data/sets.js';

export default {
  name: 'ComparePage',
  data() { return { breadcrumbs: [{label:'首页',to:'/'},{label:'套装对比'}] }; },
  computed: {
    compareSets() { return compareState.selectedSets.map(key => sets.find(s => s.id === key)).filter(Boolean); },
    insights() {
      const s = this.compareSets; if (s.length < 2) return ['请至少选择2套装备进行对比分析'];
      const diffs = {'极高':4,'高':3,'中':2,'低':1}; const easiest = s.reduce((a,b) => (diffs[a.difficulty]||2) < (diffs[b.difficulty]||2) ? a : b);
      const fastest = s.reduce((a,b) => (a.speedScore||3) > (b.speedScore||3) ? a : b);
      return ['🟢 '+easiest.name+' 上手难度最低', '⚡ '+fastest.name+' 速度最快', '💡 具体选择需结合职业特性和个人操作习惯'];
    }
  },
  methods: { remove(key) { removeFromCompare(key); } },
  template: `
  <div class="container page-container">
    <breadcrumb-nav :items="breadcrumbs" /><h1 class="page-title">套装对比</h1>
    <compare-selector />
    <div v-if="compareSets.length===0" class="compare-empty"><empty-state icon="⚖" title="选择套装进行对比" description="从下拉菜单中选择最多4套装备" /></div>
    <div v-else>
      <div class="selected-tags"><span v-for="s in compareSets" :key="s.id" class="set-tag"><img :src="s.icon" :alt="s.name" class="tag-icon" />{{ s.name }}<button class="tag-remove" @click="remove(s.id)">✕</button></span></div>
      <compare-table :sets="compareSets" />
      <div class="compare-summary glass-card p-lg mt-xl"><h3>对比分析</h3><ul><li v-for="i in insights" :key="i">{{ i }}</li></ul></div>
    </div>
  </div>`
};
