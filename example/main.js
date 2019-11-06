import Vue from 'vue';
import App from './App.vue';
import router from './router';
import MpUI from '../src';
import '../src/style/index.less'
import DemoMobile from './components/DemoMobile.vue';
import DemoBlock from './components/DemoBlock.vue';

Vue.component('demo-mobile', DemoMobile);
Vue.component('demo-block', DemoBlock);
Vue.config.productionTip = false;
Vue.use(MpUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
