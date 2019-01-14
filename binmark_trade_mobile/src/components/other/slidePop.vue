<template>
  <div
    @click.self="closeSlide"
    v-show="show"
    class="wh-full pop-up"
  >
    <transition
      @after-leave='onLeave'
      name="van-slide-left"
    >
      <aside
        v-show="showAside"
        :style="{width:width+'rem'}"
        class="aside h-full overflow-y"
      >
        <slot name='content'></slot>
      </aside>
    </transition>
  </div>
</template>
<script>
export default {
  name: "slide-pop",
  props: {
    width: {
      type: String,
      default: "23"
    },
    showPop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.showPop,
      showAside: false,
      aniName: ""
    };
  },
  methods: {
    closeSlide() {
      this.showAside = false;
    },
    onLeave() {
      this.$emit("onClose");
    }
  },
  watch: {
    showPop() {
      this.showAside = this.showPop;
      this.show = this.showPop;
    }
  }
};
</script>
<style lang="scss" scoped>
.pop-up {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.aside {
  position: relative;
  z-index: 1;
  background: #fff;
}
</style>