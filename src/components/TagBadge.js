export default {
  name: 'TagBadge',
  props: { label: { type: String, required: true }, variant: { type: String, default: 'default' } },
  template: `<span class="tag-badge" :class="'tag-'+variant">{{ label }}</span>`
};
