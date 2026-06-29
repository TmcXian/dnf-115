export default {
  name: 'StatBar',
  props: { label: { default: '' }, value: { type: Number, default: 0 }, max: { type: Number, default: 100 }, displayValue: { default: '' }, color: { default: '' } },
  computed: { percent() { return this.max <= 0 ? 0 : Math.round((this.value / this.max) * 100); } },
  template: `
  <div class="stat-bar-wrap">
    <div class="stat-bar-info"><span class="stat-bar-label">{{ label }}</span><span class="stat-bar-val">{{ displayValue }}</span></div>
    <div class="stat-bar-track"><div class="stat-bar-fill" :style="{width:percent+'%',background:color||'var(--color-accent)'}"></div></div>
  </div>`
};
