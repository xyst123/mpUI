<template>
  <div class="mp-panel-wrapper">
    <div
      v-if="wrap"
      class="mp-panel-wrap"
    >
      <div class="mp-panel-title">
        <h3>{{ label }}</h3>
        <p>{{ error }}</p>
      </div>
      <slot />
    </div>
    <div
      v-else
      class="mp-panel"
    >
      <p class="mp-panel-label">
        {{ label }}
      </p>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'mp-panel',
  componentName: 'MPPanel',
  props: {
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  }
};
</script>
