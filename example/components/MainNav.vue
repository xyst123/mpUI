<template>
  <div class="main-nav">
    <div
      v-for="(level1,index1) in level0"
      :key="`level1-${index1}`"
      class="level0-children"
    >
      <h3 class="level1-title">
        {{ level1.title }}
      </h3>
      <div
        v-for="(level2,index2) in level1.children"
        v-show="level2.title"
        :key="`level2-${index2}`"
        class="level1-children"
      >
        <router-link
          v-if="level2.name"
          :to="{name:level2.name}"
          :class="{'active':$route.name===level2.name}"
        >
          {{ level2.title }}
        </router-link>
        <p
          v-else
          class="level2-title"
        >
          {{ level2.title }}
        </p>
        <div
          v-for="(level3,index3) in level2.children"
          :key="`level3-${index3}`"
        >
          <router-link
            :to="{name: level3.name}"
            :class="{'active':$route.name===level3.name}"
          >
            {{ level3.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navConfig from '../nav.config';

export default {
  data() {
    return {
      level0: navConfig
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../style/vars.less");
.main-nav {
  width: 15%;
  margin: 32px 0;
  text-align: left;
  color: @font-color;
  background-color: #fff;
  text-transform: uppercase;
  z-index: 10;
  .level0-children {
    margin-bottom: 24px;
    .level1-title {
      line-height: 40px;
      font-size: @font-large;
      font-weight: bold;
    }
    .level1-children {
      font-size: @font-normal;
      line-height: 36px;
      a {
        display: block;
        padding-left: 24px;
        color: @font-color;
        font-weight: normal;
        line-height: 36px;
        cursor: pointer;
        text-transform: uppercase;
        &.active {
          color: @subject-dark;
        }
        &:hover {
          color: @subject-dark;
        }
      }
      .level2-title {
        font-size: @font-small;
        color: @grey1;
      }
    }
  }
}
</style>
