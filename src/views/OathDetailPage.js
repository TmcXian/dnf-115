import { oaths } from '../data/oaths.js';
import { OATH_BRANCH_TYPES } from '../utils/constants.js';
import { sets } from '../data/sets.js';

export default {
  name: 'OathDetailPage',
  props: { oathId: String },
  data() { return { oath: null, activeBranch: 0, branchTypes: OATH_BRANCH_TYPES }; },
  computed: {
    breadcrumbs() { return [{label:'首页',to:'/'},{label:'誓约系统',to:'/oaths'},{label:this.oath?.name||'誓约详情'}]; },
    relatedSetName() { if (!this.oath?.relatedSetId) return ''; const s = sets.find(s => s.id === this.oath.relatedSetId); return s? s.name : ''; }
  },
  created() { this.oath = oaths.find(o => o.id === this.oathId) || null; if (this.oath) { this.activeBranch = this.oath.recommendedBranch; document.title = 'DNF 115 — '+this.oath.name+' (誓约)'; } },
  template: `
  <div class="container page-container" v-if="oath">
    <breadcrumb-nav :items="breadcrumbs" />
    <div class="oath-header"><div class="oath-info"><h1 class="oath-name cyan">{{ oath.name }}</h1><p class="oath-desc">{{ oath.description }}</p>
      <div class="oath-tags"><tag-badge :label="'推荐'+oath.branches[oath.recommendedBranch].name" variant="info" /><tag-badge :label="oath.overallStrength+'级强度'" variant="epic" /></div></div></div>
    <div class="branch-section mt-xl"><h2 class="section-title cyan">三分支系统</h2>
      <div class="branch-tabs">
        <button v-for="(b,idx) in oath.branches" :key="idx" class="branch-tab" :class="{active:activeBranch===idx,recommended:oath.recommendedBranch===idx}" @click="activeBranch=idx">
          <span class="branch-type">{{ branchTypes[b.type]?.icon }} {{ b.name }}</span><span class="branch-sub">{{ b.subtitle }}</span>
          <span v-if="oath.recommendedBranch===idx" class="rec-badge">推荐</span>
        </button>
      </div>
      <oath-branch-card :branch="oath.branches[activeBranch]" />
    </div>
    <div class="star-section mt-xl"><h2 class="section-title cyan">星蕴石槽位</h2><oath-star-slots :total-slots="oath.starStone.totalSlots" :max-primordial="oath.starStone.maxPrimordial" /></div>
    <div class="mist-section mt-xl"><h2 class="section-title cyan">迷雾誓约等级</h2><mist-progress-bar :current-level="45" :max-level="oath.mistLevel.max" :breakpoints="oath.mistLevel.qualityBreakpoints" /></div>
    <div class="glass-card p-lg mt-xl"><h3 class="cyan">获取渠道</h3><ul class="acq-list"><li v-for="ch in oath.acquisition" :key="ch">• {{ ch }}</li></ul></div>
    <div class="glass-card p-lg mt-lg" v-if="oath.relatedSetId"><h3 class="cyan">关联装备套装</h3><router-link :to="'/detail/'+oath.relatedSetId" class="btn btn-outline mt-sm">→ 查看「{{ relatedSetName }}」</router-link></div>
  </div>
  <div class="container page-container" v-else><empty-state icon="❓" title="未找到誓约套装" /></div>`
};
