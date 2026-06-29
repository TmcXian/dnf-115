import { OATH_BRANCH_TYPES } from '../utils/constants.js';

export default {
  name: 'OathBranchCard',
  props: { branch: { type: Object, required: true } },
  computed: {
    typeIcon() { return OATH_BRANCH_TYPES[this.branch.type]?.icon || '◆'; },
    typeColor() { return OATH_BRANCH_TYPES[this.branch.type]?.color || '#f0c040'; },
    typeLabel() { return this.branch.type === 'burst' ? '爆发' : this.branch.type === 'sustain' ? '续航' : '基础'; }
  },
  template: `
  <div class="branch-card glass-card p-lg">
    <div class="branch-header"><span class="branch-type" :style="{color:typeColor}">{{ typeIcon }} {{ typeLabel }}</span></div>
    <p class="branch-summary">{{ branch.summary }}</p>
    <div class="branch-stats"><div v-for="s in branch.stats" :key="s.label" class="branch-stat-row"><span class="branch-stat-label">{{ s.label }}</span><span class="branch-stat-val">{{ s.value }}</span></div></div>
    <div class="branch-effects" v-if="branch.effects.length"><h5>特殊效果</h5><ul><li v-for="e in branch.effects" :key="e">{{ e }}</li></ul></div>
    <div class="branch-note" v-if="branch.note"><span class="note-icon">💡</span> {{ branch.note }}</div>
  </div>`
};
