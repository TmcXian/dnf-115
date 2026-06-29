import { sets } from '../data/sets.js';
import { rankings } from '../data/rankings.js';
import { RANK_TYPES, PLAYER_LEVELS, GAME_MODES } from '../utils/constants.js';

export default {
  name: 'RankPage',
  data() { return { rankType:'overall', playerLevel:'high', gameMode:'general', rankTypes:RANK_TYPES, playerLevels:PLAYER_LEVELS, gameModes:GAME_MODES, rankedSets:[], breadcrumbs:[{label:'首页',to:'/'},{label:'强度排行'}] }; },
  created() { this.updateRanking(); },
  methods: {
    updateRanking() {
      const key = `${this.rankType}_${this.playerLevel}_${this.gameMode}`;
      const data = rankings[key] || rankings['overall_high_general'];
      this.rankedSets = data.map(item => { const set = sets.find(s => s.id === item.id); return { ...set, displayScore: item.score, rankScore: item.score }; });
    }
  },
  template: `
  <div class="container page-container">
    <breadcrumb-nav :items="breadcrumbs" /><h1 class="page-title">强度排行</h1>
    <div class="filter-bar">
      <select class="select" v-model="rankType" @change="updateRanking"><option v-for="r in rankTypes" :key="r.value" :value="r.value">{{ r.label }}</option></select>
      <select class="select" v-model="playerLevel" @change="updateRanking"><option v-for="l in playerLevels" :key="l.value" :value="l.value">{{ l.label }}</option></select>
      <select class="select" v-model="gameMode" @change="updateRanking"><option v-for="m in gameModes" :key="m.value" :value="m.value">{{ m.label }}</option></select>
    </div>
    <transition-group name="list" tag="div" class="rank-list">
      <rank-item v-for="(item,idx) in rankedSets" :key="item.id" :rank="idx+1" :set="item" :score="item.displayScore" :is-active="idx===0" />
    </transition-group>
  </div>`
};
