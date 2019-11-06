<template>
  <label class="mp-image-upload">
    <div
      v-if="status===1"
      class="mp-image-upload-tip"
    >
      <i class="icon-image-upload-uploading" />
      <p>图片上传中...</p>
    </div>
    <div
      v-else-if="status===3"
      class="mp-image-upload-tip"
    >
      <i class="icon-image-upload-fail" />
      <p>{{ failMessage }}</p>
    </div>
    <img
      v-else
      :src="image"
      alt
    >
    <i
      class="icon-input-close"
      @click.stop="handleDelete"
    >
      <span class="path1" />
      <span class="path2" />
    </i>
    <input
      type="file"
      v-bind="$attrs"
      @change="handleFileChange"
    >
  </label>
</template>
<script>
import { upload } from '@/utils';

export default {
  name: 'mp-image-upload',
  componentName: 'MPImageUpload',
  props: {
    image: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'POST'
    },
    file: {
      type: null,
      default: null
    },
    name: {
      type: String,
      default: 'file'
    },
    data: {
      type: null,
      default: null
    },
    beforeUpload: {
      type: Function,
      default() {}
    },
    onInvoke: {
      type: Function,
      default() {}
    },
    onSuccess: {
      type: Function,
      default() {}
    },
    onFail: {
      type: Function,
      default() {}
    },
    onDelete: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      status: 2,
      failMessage: ''
    };
  },
  created() {
    if (!this.image) {
      this.handleFileChange({
        target: {
          files: [this.file]
        }
      });
    }
  },
  methods: {
    handleDelete(event) {
      event.preventDefault();
      this.onDelete(this.data);
    },
    async handleFileChange(event) {
      this.status = 1;
      const file = event.target.files[0];
      try {
        this.failMessage = this.beforeUpload(file);
        if (this.failMessage) {
          this.status = 3;
          this.onFail(this.failMessage, file, this.data);
        } else {
          const res = await upload({
            url: this.url,
            method: this.method,
            name: this.name,
            file
          });
          this.failMessage = this.onInvoke(res, file, this.data);
          if (this.failMessage) {
            this.status = 3;
            this.onFail(this.failMessage, file, this.data);
          } else {
            this.status = 2;
            this.onSuccess(res, file, this.data);
          }
        }
      } catch (error) {
        this.failMessage = '图片上传失败';
        this.status = 3;
        this.onFail(error, file, this.data);
      }
    }
  }
};
</script>
