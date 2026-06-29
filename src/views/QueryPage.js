import { sets } from '../data/sets.js';
import { debounce } from '../utils/helpers.js';

export default {
  name: 'QueryPage',
  data() {
    return {
      searchQuery: '', activeCategory: 'all', filteredSets: [...sets],
      categories: [{key:'all',label:'全部'},{key:'core',label:'核心毕业'},{key:'balanced',label:'均衡实用'},{key:'beginner',label:'新手/平民'}],
      breadcrumbs: [{label:'首页',to:'/'},{label:'套装查询'}]
    };
  },
  created() { this.performSearch = debounce(this._performSearch, 200); },
  methods: {
    _performSearch() {
      let result = [...sets];
      const q = this.searchQuery.trim().toLowerCase();
      if (q) result = result.filter(s => s.name.toLowerCase().includes(q) || s.alias.toLowerCase().includes(q) || s.keywords.some(k => k.toLowerCase().includes(q)));
      if (this.activeCategory !== 'all') result = result.filter(s => s.category === this.activeCategory);
      this.filteredSets = result;
    },
    resetSearch() { this.searchQuery = ''; this.activeCategory = 'all'; this._performSearch(); }
  },
  template: `
  <div class="container page-container">
    <breadcrumb-nav :items="breadcrumbs" /><h1 class="page-title">套装查询</h1>
    <div class="search-bar">
      <input type="text" class="input search-input" v-model="searchQuery" @input="performSearch" placeholder="输入套装名称、别名或关键词..." />
      <button class="btn btn-ghost" @click="resetSearch" v-if="searchQuery">✕ 清除</button>
    </div>
    <div class="category-tabs">
      <button v-for="cat in categories" :key="cat.key" class="tab-btn" :class="{active:activeCategory===cat.key}" @click="activeCategory=cat.key;performSearch()">{{ cat.label }}</button>
    </div>
    <set-grid :sets="filteredSets" />
    <empty-state v-if="!filteredSets.length" icon="🔍" title="未找到匹配的套装" :description="searchQuery ? '没有找到包含 ' + searchQuery + ' 的套装' : '请选择分类'" />
  </div>`
};
