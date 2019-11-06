import Vue from 'vue';
import MP from '../lib/index';

let id = 0;
const createElement = () => {
  const element = document.createElement('div');
  element.id = `app${id += 1}`;
  document.body.appendChild(element);
  return element;
};

export const destroyVM = (vm) => {
  vm.$destroy && vm.$destroy();
  vm.$el
    && vm.$el.parentNode
    && vm.$el.parentNode.removeChild(vm.$el);
};


export const createTest = (Component, propsData = {}, mounted = false) => {
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const element = createElement();
  const Constructor = Vue.extend(Component);
  return new Constructor({ propsData }).$mount(mounted === false ? null : element);
};

export const createVue = (Component, mounted = false) => {
  if (Object.prototype.toString.call(Component) === '[object String]') {
    Component = { template: Component };
  }
  return new Vue(Component).$mount(mounted === false ? null : createElement());
};
