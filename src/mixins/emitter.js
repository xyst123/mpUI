function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.call(child, eventName, ...params)
    } else {
      broadcast.call(child, componentName, eventName, params)
    }
  })
}

export default {
  methods: {
    // 子组件向父组件传递
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.call(parent, eventName, ...params)
      }
    },
    // 父组件向子组件传递
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
