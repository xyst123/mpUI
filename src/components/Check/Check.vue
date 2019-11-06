<template>
  <div class="mp-check" @click="handleClick">
    <div :class="['mp-check-ring',{'mp-check-ring__active':realChecked}]">
      <i v-if="realChecked" class="icon-check-check" />
    </div>
    <span v-if="label" class="mp-check-label">{{ label }}</span>
  </div>
</template>
<script>
import emitter from '@/mixins/emitter';

export default {
  name: 'mp-check',
  componentName: 'MPCheck',
  mixins: [emitter],
  model: {
    prop: 'checked',
    event: 'check'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: null,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    CheckGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'MPCheckGroup') {
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
  created() {
    if (this.checked) {
      this.setValue(this.value, 'add');
    }
  },
  methods: {
    setValue(value) {
      if (this.CheckGroup) {
        let currentValue;
        const index = this.CheckGroup.value.indexOf(value);
        if (index === -1) {
          currentValue = [...this.CheckGroup.value, this.value];
        } else {
          currentValue = [...this.CheckGroup.value];
          currentValue.splice(index, 1);
        }
        this.dispatch('MPCheckGroup', 'check', [currentValue]);
      }
    },
    handleClick() {
      if (this.CheckGroup) {
        this.setValue(this.value);
      } else {
        this.$emit('check', !this.checked);
      }
    }
  }
};
</script>
