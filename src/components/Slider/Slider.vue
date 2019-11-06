<template>
  <div
    class="mp-slider"
    :style="{left:`${map[step]}%`}"
  />
</template>
<script>
export default {
  name: 'mp-slider',
  componentName: 'MPSlider',
  props: {
    step: {
      type: null,
      required: true
    },
    map: {
      type: Object,
      required: true
    }
  }
};
</script>
