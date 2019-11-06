<template>
  <div class="mp-board">
    <div
      v-if="title"
      class="mp-board-title"
    >
      <slot name="prefixer" />
      <h3>{{ title }}</h3>
      <p>{{ error }}</p>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'mp-board',
  componentName: 'MPBoard',
  props: {
    title: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    icon: {
      type: null,
      default: null
    }
  }
};
</script>
