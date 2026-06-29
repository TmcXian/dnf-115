export default {
  name: 'Pagination',
  props: { currentPage: { type: Number, required: true }, totalPages: { type: Number, required: true }, total: { type: Number, default: 0 } },
  emits: ['page-change'],
  computed: {
    visiblePages() { const p = []; const s = Math.max(1, this.currentPage - 2); const e = Math.min(this.totalPages, this.currentPage + 2); for (let i = s; i <= e; i++) p.push(i); return p; }
  },
  template: `
  <div class="pagination">
    <span class="page-info">共 {{ total }} 条，第 {{ currentPage }}/{{ totalPages }} 页</span>
    <div class="page-btns">
      <button class="btn btn-ghost btn-sm" :disabled="currentPage<=1" @click="$emit('page-change',1)">««</button>
      <button class="btn btn-ghost btn-sm" :disabled="currentPage<=1" @click="$emit('page-change',currentPage-1)">«</button>
      <button v-for="p in visiblePages" :key="p" class="btn btn-sm" :class="p===currentPage?'btn-primary':'btn-ghost'" @click="$emit('page-change',p)">{{ p }}</button>
      <button class="btn btn-ghost btn-sm" :disabled="currentPage>=totalPages" @click="$emit('page-change',currentPage+1)">»</button>
      <button class="btn btn-ghost btn-sm" :disabled="currentPage>=totalPages" @click="$emit('page-change',totalPages)">»»</button>
    </div>
  </div>`
};
