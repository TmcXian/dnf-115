export default {
  name: 'Breadcrumb',
  props: { items: { type: Array, required: true } },
  template: `
  <nav class="breadcrumb">
    <template v-for="(item, idx) in items" :key="idx">
      <router-link v-if="item.to" :to="item.to" class="crumb-link">{{ item.label }}</router-link>
      <span v-else class="crumb-current">{{ item.label }}</span>
      <span v-if="idx < items.length - 1" class="crumb-sep">›</span>
    </template>
  </nav>`
};
