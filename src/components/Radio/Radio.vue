<template>
  <div
    class="mp-radio-wrapper"
    @click="handleClick"
  >
    <div
      v-if="type==='tag'"
      :class="{'mp-radio-tag':true,'mp-radio-tag__active':value===chosenValue}"
    >
      <slot />
    </div>
    <div
      v-else
      :class="{'mp-radio-normal':true,'mp-radio-normal__active':value===model}"
    >
      <div :class="['ring']" />
      <slot />
    </div>
  </div>
</template>
<script>
import emitter from '@/mixins/emitter';

export default {
  name: 'mp-radio',
  componentName: 'MPRadio',
  mixins: [emitter],
  model: {
    prop: 'chosenValue',
    event: 'radio'
  },
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    size: {
      type: String,
      default: 'normal'
    },
    chosenValue: {
      type: null,
      default: ''
    },
    value: {
      type: null,
      default: ''
    }
  },
  computed: {
    RadioGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'MPRadioGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return null;
    },
    model() {
      return this.RadioGroup ? this.RadioGroup.value : this.chosenValue;
    }
  },
  methods: {
    handleClick() {
      if (this.RadioGroup) {
        this.dispatch('MPRadioGroup', 'radio', [this.value]);
      } else {
        this.$emit('radio', this.value);
      }
    }
  }
};
</script>
