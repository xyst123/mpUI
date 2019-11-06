import Vue from 'vue';
import Router from 'vue-router';
import navConfig from './nav.config';

Vue.use(Router);

const routes = [];

const addComponent = (router) => {
  router.forEach((route) => {
    if (route.children) {
      addComponent(route.children);
    } else {
      routes.push(route);
      if (route.type === 'pages') {
        route.component = () => import(`./components/${route.name}.vue`);
        return;
      }
      route.component = () => import(`./docs/${route.name}.md`);
    }
  });
};

addComponent(navConfig);

routes.push({
  path: '*',
  redirect: '/guide',
});

export default new Router({
  routes,
});
