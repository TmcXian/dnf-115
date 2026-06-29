export default {
  name: 'LoadingSpinner',
  props: { size: { type: String, default: 'md' }, text: { type: String, default: '' } },
  template: `<div class="loading-wrap" :class="'loading-'+size"><div class="spinner" :class="'spinner-'+size"></div><p v-if="text" class="loading-text">{{ text }}</p></div>`
};
