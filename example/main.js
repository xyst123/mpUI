import Vue from 'vue';
import App from './App.vue';
import router from './router';
import MpUI from '../src';
import '../src/style/index.less'
import Mobile from './components/Mobile.vue';
import DemoBlock from './components/DemoBlock.vue';

Vue.component('mobile', Mobile);
Vue.component('demo-block', DemoBlock);
Vue.config.productionTip = false;
Vue.use(MpUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
