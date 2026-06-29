export default {
  name: 'EmptyState',
  props: { icon: { default: '📭' }, title: { default: '暂无数据' }, description: { default: '' } },
  template: `<div class="empty-state"><span class="empty-icon">{{ icon }}</span><h3 class="empty-title">{{ title }}</h3><p v-if="description" class="empty-desc">{{ description }}</p><slot /></div>`
};
