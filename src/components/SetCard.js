import { addToCompare, isInCompare } from '../store.js';

export default {
  name: 'SetCard',
  props: { set: { type: Object, required: true }, isOath: { type: Boolean, default: false } },
  computed: {
    tierVariant() {
      const map = { '顶级打造': 'primordial', '高端打造': 'epic', '中等打造': 'legendary', '平民打造': 'rare' };
      return map[this.set.tierLabel] || 'default';
    },
    canAdd() { return !this.isOath && !isInCompare(this.set.id); },
    inCompare() { return !this.isOath && isInCompare(this.set.id); }
  },
  methods: {
    goDetail() { this.$router.push(this.isOath ? `/oaths/${this.set.id}` : `/detail/${this.set.id}`); },
    addCompare() { if (this.canAdd) addToCompare(this.set.id); },
    onImgError(e) { e.target.src = './static/img/logo/dnf-logo.png'; }
  },
  template: `
  <div class="set-card glass-card" @click="goDetail" :class="{'oath-card':isOath}">
    <div class="card-img-wrap">
      <img :src="set.icon" :alt="set.name" class="card-img" @error="onImgError" />
      <div v-if="isOath" class="oath-badge">誓约</div>
    </div>
    <div class="card-body">
      <h3 class="card-name" :class="{cyan:isOath}">{{ set.name }}</h3>
      <p class="card-alias">{{ set.alias }}</p>
      <div class="card-tags">
        <tag-badge :label="set.tierLabel" :variant="tierVariant" />
        <tag-badge v-if="set.difficulty" :label="set.difficulty" variant="difficulty" />
      </div>
      <button class="btn btn-ghost btn-sm compare-btn" @click.stop="addCompare" :disabled="!canAdd">
        ⚖ {{ canAdd ? '加入对比' : (inCompare ? '已添加' : '已满') }}
      </button>
    </div>
  </div>`
};
