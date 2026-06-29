export default {
  name: 'SetGrid',
  props: { sets: { type: Array, required: true } },
  template: `<div class="set-grid"><set-card v-for="set in sets" :key="set.id" :set="set" :is-oath="set.isOath || false" /></div>`
};
