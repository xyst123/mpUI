<template>
  <div class="mp-slider" :style="{left:`${map[step]}%`}"></div>
</template>
<script>
export default {
  name: "mp-slider",
  componentName: "MPSlider",
  props: {
    step: {
      required: true
    },
    map: {
      required: true
    }
  }
};
</script>

