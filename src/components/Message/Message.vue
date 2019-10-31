<template>
  <div class="mp-message-mask">
    <div v-if="type" class="mp-message">
      <i class="icon-message-close" @click="cancelCallback"></i>
      <i :class="[`icon-message-${type}`]"></i>
      <div class="mp-message-content" v-html="html"></div>
      <mp-button round class="mp-message-button" @click="confirmCallback">{{confirmText}}</mp-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "MPMessage",
  data() {
    return {
      type: "",
      html: "",
      confirmText: "",
      confirm: () => {},
      cancel: () => {}
    };
  },
  methods: {
    confirmCallback() {
      this.close();
      this.confirm();
    },
    cancelCallback() {
      this.close();
      this.cancel();
    },
    close() {
      const top = document.body.style.top.replace("px", "");
      document.body.style.position = "static";
      window.scrollTo(0, -parseInt(top));
      this.type = "";
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

