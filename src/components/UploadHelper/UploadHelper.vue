<template>
  <label class="mp-upload-helper">
    <i class="icon-upload-helper-add" />
    <input
      multiple
      type="file"
      v-bind="$attrs"
      @change="handleFileAdd"
    >
  </label>
</template>
<script>
export default {
  name: 'mp-upload-helper',
  componentName: 'MPUploadHelper',
  props: {
    data: {
      type: null,
      default: null
    },
    onSelected: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleFileAdd(event) {
      const { files } = event.target;
      if (files.length > 0) {
        this.onSelected(Array.from(files), this.data);
        event.target.value = '';
      }
    }
  }
};
</script>
