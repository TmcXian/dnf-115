import { oaths, oathMechanics } from '../data/oaths.js';

export default {
  name: 'OathOverviewPage',
  data() {
    return {
      breadcrumbs: [{label:'首页',to:'/'},{label:'誓约系统'}],
      mechanics: [
        {icon:'🔮',title:'誓约核心',desc:'位于装备栏中央，周围可镶嵌11个星蕴石，最多佩戴3个太初级星蕴石'},
        {icon:'🌫',title:'迷雾誓约',desc:'账号通用，最高100级。30/60/80/100级分别提升品质至稀有/传说/史诗/太初'},
        {icon:'📊',title:'积分补正',desc:'主装备积分未达太初(2550分)时，自动从誓约系统补足分数'},
        {icon:'🎲',title:'防重复掉落',desc:'已获取的誓约不会再掉落，类似不放回抽奖机制'}
      ],
      guarantees: oathMechanics.guarantees,
      channels: oathMechanics.acquisitionChannels
    };
  },
  computed: {
    oathSetsForGrid() {
      const iconMap = {
        gold: 'gold-set.png', dragon: 'dragon-set.png', hunt: 'hunt-set.png',
        shadow: 'shadow-set.png', chaos: 'chaos-set.png', energy_3: 'energy3-set.png',
        energy_2: 'energy2-set.png', valkyrie: 'valkyrie-set.png',
        nature: 'nature-set.png', spirit_orb: 'orb-set.png', mage_normal: 'mage-set.png',
        fate: 'fate-set.png'
      };
      return oaths.map(o => ({
        id: o.id, name: o.name, alias: o.recommendedBranch===0?'推荐基础分支':(o.recommendedBranch===1?'推荐分支1(爆发)':'推荐分支2(续航)'),
        category: 'core', icon: `./static/img/logo/func-icon/${iconMap[o.id] || o.id+'-set.png'}`, tierLabel: o.overallStrength+'级', difficulty: '高', isOath: true
      }));
    }
  },
  template: `
  <div class="oath-page">
    <!-- 顶部横幅 -->
    <section class="oath-hero">
      <div class="container">
        <breadcrumb-nav :items="breadcrumbs" />
        <h1 class="oath-hero-title">🔱 誓约系统</h1>
        <p class="oath-hero-desc">千海天版本全新装备体系 — 取代融合石，12套誓约 + 三分支选择 + 防重复掉落保底机制</p>
      </div>
    </section>

    <!-- 系统机制 -->
    <section class="container oath-section">
      <h2 class="oath-section-title"><span class="title-line"></span>系统机制</h2>
      <div class="mech-row">
        <div class="mech-item glass-card" v-for="m in mechanics" :key="m.title">
          <span class="mech-icon">{{ m.icon }}</span>
          <div class="mech-text">
            <h4>{{ m.title }}</h4>
            <p>{{ m.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 三大保底机制 -->
    <section class="container oath-section">
      <h2 class="oath-section-title"><span class="title-line"></span>三大保底机制</h2>
      <div class="guarantee-row">
        <div class="guarantee-item glass-card" v-for="(g,i) in guarantees" :key="i">
          <div class="guarantee-top">
            <span class="guarantee-num">{{ i+1 }}</span>
            <h4>{{ g.name }}</h4>
          </div>
          <p>{{ g.detail }}</p>
        </div>
      </div>
    </section>

    <!-- 获取渠道 -->
    <section class="container oath-section">
      <h2 class="oath-section-title"><span class="title-line"></span>获取渠道</h2>
      <div class="channel-row">
        <div class="channel-item glass-card" v-for="ch in channels" :key="ch.name">
          <h4>{{ ch.name }}</h4>
          <tag-badge :label="ch.type" variant="info" />
          <p>{{ ch.drop }}</p>
        </div>
      </div>
    </section>

    <!-- 12套誓约 -->
    <section class="container oath-section">
      <h2 class="oath-section-title"><span class="title-line"></span>12套誓约套装</h2>
      <set-grid :sets="oathSetsForGrid" />
    </section>
  </div>`
};
