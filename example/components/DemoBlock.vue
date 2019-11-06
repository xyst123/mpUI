<template>
  <div class="demo-code">
    <div span="14">
      <div class="demo-content">
        <div class="highlight-wrapper">
          <slot name="highlight" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isExpand: false
    };
  },
  methods: {
    toggle() {
      this.isExpand = !this.isExpand;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../style/vars.less");
.demo-code {
  height: 697px;
  background-color: @grey3;
  overflow: hidden;
}
.demo-content {
  width: 100%;
  box-sizing: border-box;
  font-size: @font-normal;
  .highlight-wrapper{
    box-sizing: border-box;
    padding: 16px;
    pre{
      height: 697px;
      margin: 0;
      overflow: auto;
      code {
        font-family: Consolas, Menlo, Courier, monospace;
        line-height: 22px;
        border: none;
      }
    }
    p{
      padding: 16px;
      margin: 0;
    }
  }
}
</style>
