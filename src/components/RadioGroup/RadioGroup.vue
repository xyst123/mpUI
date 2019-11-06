<template>
  <div class="mp-radio-group">
    <slot />
  </div>
</template>
<script>
import emitter from '@/mixins/emitter';

export default {
  name: 'mp-radio-group',
  componentName: 'MPRadioGroup',
  mixins: [emitter],
  model: {
    prop: 'value',
    event: 'radio'
  },
  props: {
    value: {
      type: null,
      default: ''
    }
  },
  computed: {}
};
</script>
