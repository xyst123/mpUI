<template>
  <div class="mp-check-group">
    <slot />
  </div>
</template>
<script>
import emitter from "@/mixins/emitter";
export default {
  name: "mp-check-group",
  componentName: "MPCheckGroup",
  mixins: [emitter],
  model: {
    prop: "value",
    event: "check"
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {}
};
</script>

