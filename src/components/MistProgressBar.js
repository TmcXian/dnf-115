export default {
  name: 'MistProgressBar',
  props: {
    currentLevel: { type: Number, default: 0 }, maxLevel: { type: Number, default: 100 },
    breakpoints: { type: Array, default: () => [] }
  },
  computed: {
    fillPercent() { return Math.min(100, Math.round(this.currentLevel / this.maxLevel * 100)); },
    currentQualityLabel() {
      const sorted = [...this.breakpoints].sort((a, b) => b.level - a.level);
      for (const bp of sorted) { if (this.currentLevel >= bp.level) return bp.label; }
      return '基础';
    },
    currentQualityColor() {
      const sorted = [...this.breakpoints].sort((a, b) => b.level - a.level);
      for (const bp of sorted) { if (this.currentLevel >= bp.level) return bp.colorDesc || '#8b949e'; }
      return '#8b949e';
    }
  },
  template: `
  <div class="mist-progress">
    <div class="mist-header"><span class="mist-label">迷雾誓约等级</span><span class="mist-level">Lv.{{ currentLevel }} / {{ maxLevel }}</span></div>
    <div class="mist-track">
      <div class="mist-fill" :style="{width:fillPercent+'%'}"><div class="mist-fill-glow"></div></div>
      <div v-for="bp in breakpoints" :key="bp.level" class="mist-marker" :style="{left:(bp.level/maxLevel*100)+'%'}" :title="'Lv.'+bp.level+' — '+bp.label+'品质解锁'">
        <div class="marker-dot" :style="{background:bp.colorDesc||'#8b949e'}"></div><span class="marker-label">{{ bp.label }}</span><span class="marker-level">Lv.{{ bp.level }}</span>
      </div>
      <div class="mist-indicator" :style="{left:fillPercent+'%'}"><span class="indicator-arrow">▼</span></div>
    </div>
    <div class="mist-quality">当前品质: <strong :style="{color:currentQualityColor}">{{ currentQualityLabel }}</strong></div>
  </div>`
};
