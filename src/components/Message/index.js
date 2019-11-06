import Vue from 'vue';
// 使用基础Vue构造器，创建一个子类
const MessageConstructor = Vue.extend(require('./Message.vue').default);

let index = 0;

export default (options) => {
  const id = `message-${index += 1}`;
  options = options || {};
  const MessageInstance = new MessageConstructor({
    data: options
  })
  MessageInstance.id = id;
  // 挂载vue实例
  MessageInstance.vm = MessageInstance.$mount();
  MessageInstance.vm.visible = true;
  MessageInstance.dom = MessageInstance.vm.$el;
  document.body.appendChild(MessageInstance.dom);
  MessageInstance.dom.style.zIndex = index + 1000;
  const top = document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `${-1 * top}px`;
  return MessageInstance.vm
}
