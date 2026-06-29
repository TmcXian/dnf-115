import { terms } from '../data/terms.js';
import { showToast } from '../store.js';

export default {
  name: 'TermTooltip',
  props: { term: { type: String, required: true } },
  computed: { explanation() { return terms[this.term] || ''; } },
  methods: { showTerm() { const e = this.explanation; if (e) showToast(`${this.term}：${e}`, 'info', 6000); } },
  template: `<span class="term-wrap" @click="showTerm"><span class="term-trigger">{{ term }}</span></span>`
};
