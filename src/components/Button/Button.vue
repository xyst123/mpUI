<template>
  <button
    :class="['mp-button',`mp-button__${type}`,{
      'mp-button__round':round,
      'mp-button__plain':plain,
      'mp-button__disabled':disabled,
    }]"
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: 'mp-button',
  componentName: 'MPButton',
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    round: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
