<template>
  <div @click="handleClick" :class="{'mp-check':true}">
    <i v-if="realChecked" class="icon-check-check"></i>
    <div v-else class="ring"></div>
    <slot />
  </div>
</template>
<script>
import emitter from "@/mixins/emitter";
export default {
  name: "mp-check",
  componentName: "MPCheck",
  mixins: [emitter],
  model: {
    prop: "checked",
    event: "check"
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: null,
      default: ""
    }
  },
  created() {
    if (this.checked) {
      this.setValue(this.value, "add");
    }
  },
  computed: {
    CheckGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "MPCheckGroup") {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return null;
    },
    realChecked() {
      if (this.CheckGroup) {
        return this.CheckGroup.value.indexOf(this.value) > -1;
      }
      return this.checked;
    }
  },
  methods: {
    setValue(value, type) {
      if (this.CheckGroup) {
        let currentValue;
        const index = this.CheckGroup.value.indexOf(value);
        if (index === -1) {
          if (type !== "delete") {
            currentValue = [...this.CheckGroup.value, this.value];
          }
        } else {
          if (type !== "add") {
            currentValue = [...this.CheckGroup.value].splice(index, 1);
          }
        }
        this.dispatch("MPCheckGroup", "check", [currentValue]);
      }
    },
    handleClick() {
      if (this.CheckGroup) {
        this.setValue(this.value, "add");
      } else {
        this.$emit("check", !this.checked);
      }
    }
  }
};
</script>

