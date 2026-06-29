export default {
  name: 'RankItem',
  props: { rank: { type: Number, required: true }, set: { type: Object, required: true }, score: { type: Number, default: 0 } },
  computed: { rankColor() { return this.rank === 1 ? 'gold' : this.rank === 2 ? 'silver' : this.rank === 3 ? 'bronze' : 'normal'; } },
  template: `
  <div class="rank-item glass-card p-md" :class="{'rank-top':rank<=3}">
    <div class="rank-number" :class="'rank-'+rankColor">{{ rank }}</div>
    <img :src="set.icon" :alt="set.name" class="rank-icon" @error="e=>e.target.src='./static/img/logo/dnf-logo.png'" />
    <div class="rank-info"><h4 class="rank-name">{{ set.name }}</h4><p class="rank-alias">{{ set.alias }}</p></div>
    <div class="rank-score-wrap"><stat-bar :value="score" :max="100" :display-value="String(score)" color="var(--color-accent)" /></div>
    <tag-badge :label="set.difficulty" variant="difficulty" />
    <button class="btn btn-ghost btn-sm" @click="$router.push('/detail/'+set.id)">详情 →</button>
  </div>`
};
