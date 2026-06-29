export default {
  name: 'OathStarSlots',
  props: { totalSlots: { type: Number, default: 11 }, maxPrimordial: { type: Number, default: 3 }, primordialCount: { type: Number, default: 3 }, filledCount: { type: Number, default: 8 } },
  methods: {
    slotClass(i) { return i <= this.primordialCount ? 'primordial' : i <= this.filledCount ? 'filled' : 'empty'; },
    slotStyle(i) {
      const angle = (2 * Math.PI * (i - 1)) / this.totalSlots - Math.PI / 2;
      const r = 90;
      return { position: 'absolute', left: `calc(50% + ${Math.cos(angle) * r}px - 16px)`, top: `calc(50% + ${Math.sin(angle) * r}px - 16px)` };
    }
  },
  template: `
  <div class="star-slots-wrap">
    <div class="star-core"><div class="core-circle"><span class="core-label">誓约核心</span></div></div>
    <div class="star-ring">
      <div v-for="i in totalSlots" :key="i" class="star-slot" :class="slotClass(i)" :style="slotStyle(i)">
        <span class="star-inner">{{ i <= primordialCount ? '✦' : (i <= filledCount ? '○' : '·') }}</span>
      </div>
    </div>
    <div class="star-legend">
      <span class="legend-item"><span class="legend-dot primordial"></span> 太初 ({{ primordialCount }}/{{ maxPrimordial }})</span>
      <span class="legend-item"><span class="legend-dot normal"></span> 普通</span>
      <span class="legend-item"><span class="legend-dot empty"></span> 未激活</span>
    </div>
  </div>`
};
