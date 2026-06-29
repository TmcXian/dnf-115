import { sets } from '../data/sets.js';
import { compareState, addToCompare, clearCompare, isInCompare, showToast } from '../store.js';

export default {
  name: 'CompareSelector',
  data() { return { selectedSet: '' }; },
  computed: { compareState: () => compareState, availableSets() { return sets.filter(s => !isInCompare(s.id)); } },
  methods: {
    addSet() {
      if (!this.selectedSet) return;
      if (!addToCompare(this.selectedSet)) showToast('对比列表已满(最多4套)', 'warning');
      else showToast('已添加套装到对比列表', 'success');
      this.selectedSet = '';
    },
    clearCompare() { clearCompare(); }
  },
  template: `
  <div class="compare-selector">
    <select class="select" v-model="selectedSet" @change="addSet">
      <option value="">— 选择套装加入对比 —</option>
      <option v-for="set in availableSets" :key="set.id" :value="set.id">{{ set.name }} ({{ set.alias }})</option>
    </select>
    <span class="selector-hint">{{ compareState.selectedSets.length }}/4 已选择</span>
    <button v-if="compareState.selectedSets.length" class="btn btn-ghost btn-sm" @click="clearCompare">清空全部</button>
  </div>`
};
