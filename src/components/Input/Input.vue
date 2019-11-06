<template>
  <div
    ref="input"
    class="mp-input"
  >
    <template v-if="type==='textarea'">
      <textarea
        v-bind="$attrs"
        :value="value"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="$emit('blur')"
        @change="$emit('change')"
      />
    </template>
    <template v-else>
      <input
        type="text"
        v-bind="$attrs"
        :value="value"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="$emit('blur')"
        @change="$emit('change')"
      >
      <i
        v-if="value"
        class="icon-input-close"
        @click="clear"
      >
        <span class="path1" />
        <span class="path2" />
      </i>
    </template>
    <p
      v-if="maxlength>0 && count"
      class="mp-input-counter"
    >
      {{ `${currentLength}/${maxlength}` }}
    </p>
  </div>
</template>
<script>
import { clearTimeout } from 'timers';
import { getLimitedString } from '@/utils';

let timer = null;
export default {
  name: 'mp-input',
  componentName: 'MPInput',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    type: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: Infinity
    },
    count: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentLength: 0,
      isComposing: false
    };
  },
  created() {
    this.handleInput({
      target: {
        value: this.value
      }
    });
  },
  methods: {
    clear() {
      this.$emit('input', '');
    },
    handleFocus() {
      this.$emit('focus');
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const { input } = this.$refs;
        const position = input.getBoundingClientRect();
        const { bottom } = position;
        const { innerHeight } = window;
        console.log(bottom, innerHeight);
        if (bottom > innerHeight) {
          input.scrollIntoView({
            behavior: 'smooth'
          });
        }
        timer = null;
      }, 400);
    },
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      if (this.isComposing) return;
      const string = event.target.value;
      const stringInfo = getLimitedString(string, this.maxlength);
      this.currentLength = stringInfo.length;
      this.$emit('input', stringInfo.result);
      if (event.target.value !== stringInfo.result) {
        // vm.props.value更新，不会自动触发输入框文本更新
        event.target.value = stringInfo.result;
      }
    }
  }
};
</script>
