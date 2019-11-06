<template>
  <div class="demo-mobile-wrapper">
    <div
      class="demo-mobile"
      :style="{width:`${mobileWidth}px`,height:`${mobileHeight}px`}"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'demo-mobile',
  data() {
    return {
      mobileWidth: 375,
      mobileHeight: 766
    };
  }
};
</script>
<style lang="less" scoped>
@import url("../style/vars.less");
.demo-mobile-wrapper{
  position: relative;
  float: right;
  width: 372px;
  height: 697px;
  background: url("../images/mobile/mobile.png") no-repeat center center;
  background-size: 100%;
  overflow: hidden;
  .demo-mobile{
    transform: scale(0.8);
    transform-origin: 0 0;
    position: absolute;
    top: 58px;
    left: 36px;
    box-sizing: border-box;
    padding: 12px;
  }
}
</style>
