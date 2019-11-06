<template>
  <div class="header">
    <div class="header-container">
      <h1>mp-ui</h1>
      <div class="link-list">
        <router-link
          v-for="(item, index) in menu"
          :key="`menu-${index}`"
          :to="{name:item.name}"
          :class="{'active': $route.name === item.key }"
        >
          {{ item.value }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [{ key: 'check', value: '组件' }],
    };
  }
};
</script>
<style lang="less" scoped>
@import url("../style/vars.less");
.header {
  height: 80px;
  padding: 0 48px;
  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid @grey0;
    box-sizing: border-box;
    h1 {
      font-size: @font-largest;
      color: @subject-dark;
    }
    .link-list {
      padding: 0 15px;
      margin: 0;
      height: 80px;
      list-style: none;
      line-height: 80px;
      border-bottom: 1px solid @subject-normal;
      a {
        display: block;
        color: @subject-dark;
        height: 100%;
        display: inline-block;
        text-decoration: none;
        &.active {
          border-bottom: 2px solid @subject-dark;
        }
      }
    }
  }
}
</style>
