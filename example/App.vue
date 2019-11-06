<template>
  <div id="app">
    <main-header />
    <div class="content">
      <main-nav />
      <div class="document">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from './components/Header.vue';
import MainNav from './components/Nav.vue';

export default {
  components: {
    MainHeader,
    MainNav
  }
};
</script>

<style lang="less">
@import "./style/highlight.less";
@import "./style/md.less";

@grey0: #2c3e50;

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @grey0;
}
.content {
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
  }
  .document {
    text-align: left;
    margin-top: 32px;
    width: 85%;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: @grey0;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
