<template>
  <div class="mp-text" :style="{'height':`${height}px`}">
    <p
      ref="text"
      :style="{'max-height':`${maxHeight}px`,'line-height':`${lineHeight}px`}"
      class="content real-content"
      v-html="content"
    ></p>

    <p
      v-if="isOverflow && !stretch"
      :style="{'line-height':`${lineHeight}px`,'-webkit-line-clamp': limitRow,'padding-right':`${endIndent}em`,'text-indent':`${-1*endIndent*(limitRow-1)}em`}"
      class="content fake-content"
      v-html="content"
    ></p>

    <p
      ref="hidden-text"
      :style="{'max-height':`${(limitRow-1)*lineHeight}px`, 'line-height': `${lineHeight}px`}"
      class="content hidden-content"
      v-html="hiddenContent"
    ></p>

    <i v-if="isOverflow" :class="{'icon-text-triangle':true,rotate:stretch}" @click="toggleStretch"></i>
  </div>
</template>

<script>
export default {
  name: "mp-text",
  componentName: "MPText",
  props: {
    content: {
      type: String,
      default: ""
    },
    limitRow: {
      type: Number,
      default: 4
    },
    lineHeight: {
      type: Number,
      default: 18
    },
    endIndent: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      stretch: false,
      isOverflow: false,
      realHeight: 0,
      willCover: false
    };
  },
  computed: {
    hiddenContent() {
      return "  " + this.content;
    },
    maxHeight() {
      if (!this.isOverflow) {
        return this.limitRow * this.lineHeight;
      }
      if (this.stretch) {
        return this.realHeight;
      }
      return (this.limitRow - 1) * this.lineHeight;
    },
    // wrapper高度
    height() {
      if (this.isOverflow && !this.stretch) {
        return this.limitRow * this.lineHeight;
      }
      if (this.willCover && this.isOverflow && this.stretch) {
        return this.realHeight + this.lineHeight;
      }
      return this.realHeight;
    }
  },
  watch: {
    content(content) {
      this.$nextTick(() => {
        let DOM = this.$refs.text;
        let hiddenDOM = this.$refs["hidden-text"];
        if (DOM && hiddenDOM) {
          const DOMScrollHeight = DOM.scrollHeight;
          const DOMClientHeight = DOM.clientHeight;
          this.realHeight = DOMScrollHeight;
          const hiddenDOMScrollHeight = hiddenDOM.scrollHeight;
          this.isOverflow =
            DOMScrollHeight - DOMClientHeight > this.lineHeight * 0.5;
          this.willCover = hiddenDOMScrollHeight - DOMScrollHeight > 0;
          DOM = null;
          hiddenDOM = null;
        }
      });
    }
  },
  methods: {
    toggleStretch() {
      this.stretch = !this.stretch;
      this.$emit("toggleChange", this.stretch);
    }
  }
};
</script>

<style lang="less">
</style>
