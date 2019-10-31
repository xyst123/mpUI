<template>
  <div class="mp-list">
    <div class="mp-list-items-wrapper" :style="{height:`${height}px`}">
      <ul
        class="mp-list-items"
        :style="{transform: `translate3d(0,${visibleItems[0]?visibleItems[0].top:0}px,0)`}"
        @resize="loadItems"
      >
        <li
          v-for="(item,index) in visibleItems"
          :key="`item-${index}`"
          :style="{opacity:Number(item.loaded)}"
          class="mp-list-item"
        >
          <slot name="item" :data="item.data" :index="item.index"></slot>
        </li>
        <div v-show="loadingQueue.length>0">
          <slot name="loading"></slot>
        </div>
        <div v-show="!hasMore">
          <slot name="end"></slot>
        </div>
      </ul>
      <ul class="mp-list-pool">
        <li :ref="`item-${index}`" v-for="(item,index) in items" :key="`item-${index}`">
          <slot name="item" :data="item.data" :index="item.index"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "mp-list",
  componentName: "MPList",
  props: {
    list: {
      type: Array,
      default: []
    },
    size: {
      type: Number,
      default: 15
    },
    hasMore: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 200
    },
    loadMore: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      items: [],
      height: 0,
      startIndex: 0,
      startOffset: 0,
      loadingQueue: []
    };
  },
  watch: {
    list(value) {
      if (value.length) {
        this.loadingQueue.shift();
        if (!this.loadingQueue.length) {
          // 更新items
          this.loadItems();
        }
      } else {
        this.init();
      }
    }
  },
  computed: {
    visibleItems() {
      return this.items.slice(
        Math.max(0, this.startIndex - this.size),
        Math.min(this.items.length, this.startIndex + this.size)
      );
    }
  },
  mounted() {
    this.$el.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);
    this.init();
  },
  destroyed() {
    this.$el.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    init() {
      this.items = [];
      this.startIndex = this.height = 0;
      this.$el.scrollTop = 0;
    },
    loadData() {
      if (!this.loadingQueue.length) {
        this.getItems();
      }
    },
    getItems() {
      if (this.hasMore) {
        this.loadingQueue.push(true);
        this.loadMore();
      }
    },
    loadItems() {
      const promises = [];
      for (let index = 0; index < this.list.length; index++) {
        if (this.items[index] && this.items[index].loaded) {
          continue;
        }
        this.setItem(index, this.list[index]);
        promises.push(
          this.$nextTick().then(() => {
            this.updateItemHeight(index);
          })
        );
      }
      Promise.all(promises).then(() => {
        this.updateItemTop();
      });
    },
    setItem(index, data) {
      this.$set(this.items, index, {
        data: data || {},
        height: 0,
        top: -1000,
        index,
        loaded: Boolean(data)
      });
      if (this.items.length > this.list.length) {
        this.getItems();
      }
    },
    updateItemHeight(index) {
      const currentItem = this.items[index];
      const itemDOM = this.$refs[`item-${index}`];
      if (itemDOM && itemDOM[0]) {
        currentItem.height = itemDOM[0].offsetHeight;
      }
    },
    updateItemTop() {
      this.height = 0;
      for (let index = 0; index < this.items.length; index++) {
        const previous = this.items[index - 1];
        this.items[index].top = previous ? previous.top + previous.height : 0;
        this.height += this.items[index].height;
      }
      if (this.startOffset) {
        const startItem = this.items[this.startIndex];
        if (startItem) {
          this.$el.scrollTop = startItem.top - this.startOffset;
          this.startOffset = 0;
        }
      }
      this.updateStartIndex();
      this.$el.classList.add("mp-list_scroll");
    },
    updateStartIndex() {
      const top = this.$el.scrollTop;
      for (let index in this.items) {
        if (this.items[index].top > top) {
          this.startIndex = Math.max(0, index - 1);
          break;
        }
      }
    },
    onScroll() {
      const DOM = this.$el;
      if (DOM.scrollTop + DOM.offsetHeight > this.height - this.offset) {
        this.loadData();
      }
      this.updateStartIndex();
    },
    onResize() {
      const startItem = this.items[this.startIndex];
      if (startItem) {
        this.startOffset = startItem.top - this.$el.scrollTop;
      }

      this.items.forEach(item => {
        item.loaded = false;
      });
      this.loadItems();
    }
  }
};
</script>

