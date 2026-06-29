export default {
  name: 'StatRadar',
  props: { dimensions: { type: Array, required: true }, size: { type: Number, default: 240 } },
  computed: { cx() { return this.size / 2; }, cy() { return this.size / 2; }, radius() { return this.size / 2 - 30; }, n() { return this.dimensions.length; } },
  methods: {
    angle(i) { return (2 * Math.PI * i / this.n) - Math.PI / 2; },
    pointX(i, r) { return this.cx + this.radius * r * Math.cos(this.angle(i)); },
    pointY(i, r) { return this.cy + this.radius * r * Math.sin(this.angle(i)); },
    valueRatio(i) { const d = this.dimensions[i]; if (!d.max || d.max <= 0) return 0.3; return Math.max(0.1, Math.min(1, d.value / d.max)); },
    gridPoints(ratio) { return this.dimensions.map((_, i) => `${this.pointX(i, ratio)},${this.pointY(i, ratio)}`).join(' '); },
    dataPoints() { return this.dimensions.map((_, i) => `${this.pointX(i, this.valueRatio(i))},${this.pointY(i, this.valueRatio(i))}`).join(' '); }
  },
  template: `
  <div class="radar-wrap">
    <svg :viewBox="'0 0 '+size+' '+size" :width="size" :height="size" class="radar-svg">
      <polygon v-for="level in [1,2,3,4,5]" :key="level" :points="gridPoints(level/5)" fill="none" :stroke="level===5?'var(--color-border-emphasis)':'var(--color-border-default)'" stroke-width="1"/>
      <line v-for="(_,i) in dimensions" :key="'a'+i" :x1="cx" :y1="cy" :x2="pointX(i,1)" :y2="pointY(i,1)" stroke="var(--color-border-default)" stroke-width="0.5"/>
      <polygon :points="dataPoints()" fill="rgba(240,192,64,0.15)" stroke="var(--color-accent)" stroke-width="2"/>
      <circle v-for="(_,i) in dimensions" :key="'d'+i" :cx="pointX(i,valueRatio(i))" :cy="pointY(i,valueRatio(i))" r="4" fill="var(--color-accent)"/>
      <text v-for="(d,i) in dimensions" :key="'l'+i" :x="pointX(i,1.15)" :y="pointY(i,1.15)" text-anchor="middle" dominant-baseline="middle" fill="var(--color-text-secondary)" font-size="11">{{ d.label }}</text>
    </svg>
  </div>`
};
