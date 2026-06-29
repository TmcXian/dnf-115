export default {
  name: 'CompareTable',
  props: { sets: { type: Array, required: true } },
  computed: {
    statRows() {
      const allKeys = new Set();
      this.sets.forEach(s => { if (s.stats) Object.keys(s.stats).forEach(k => allKeys.add(k)); });
      return Array.from(allKeys).map(key => ({
        label: key,
        getVal: (setId) => { const set = this.sets.find(s => s.id === setId); return set?.stats?.[key] || '—'; }
      }));
    }
  },
  methods: {
    isBest(row, setId) {
      if (this.sets.length < 2) return false;
      const vals = this.sets.map(s => this.parseNum(row.getVal(s.id)));
      const max = Math.max(...vals);
      return this.parseNum(row.getVal(setId)) === max && max > 0;
    },
    isWorst(row, setId) {
      if (this.sets.length < 2) return false;
      const vals = this.sets.map(s => this.parseNum(row.getVal(s.id)));
      const min = Math.min(...vals);
      return this.parseNum(row.getVal(setId)) === min && min !== Math.max(...vals);
    },
    parseNum(val) { if (typeof val === 'number') return val; const m = String(val).match(/(\d+\.?\d*)/); return m ? parseFloat(m[1]) : 0; }
  },
  template: `
  <div class="compare-table-wrap glass-card"><table class="compare-table">
    <thead><tr>
      <th class="col-label">属性</th>
      <th v-for="s in sets" :key="s.id" class="col-set"><img :src="s.icon" :alt="s.name" class="table-set-icon" /><div class="table-set-name">{{ s.name }}</div></th>
    </tr></thead>
    <tbody>
      <tr v-for="row in statRows" :key="row.label">
        <td class="col-label">{{ row.label }}</td>
        <td v-for="s in sets" :key="s.id" class="col-val" :class="{highlight:isBest(row,s.id), worst:isWorst(row,s.id)}">{{ row.getVal(s.id) }}</td>
      </tr>
      <tr><td class="col-label">上手难度</td>
        <td v-for="s in sets" :key="s.id" class="col-val"><tag-badge :label="s.difficulty" variant="difficulty" /></td>
      </tr>
    </tbody>
  </table></div>`
};
