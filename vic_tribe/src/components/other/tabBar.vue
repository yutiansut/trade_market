<template>
  <div class="tab-bar font-16 font-bold">
    <template
      v-if="tabItem"
      v-for="(item,i) in tabItem"
    >
      <span
        class="p-rel"
        :class="tabIndex==i?'active':''"
        @click='onTabTouch(i,item)'
        :key="i"
        v-text="item"
      ></span>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.tab-bar {
  color: #a8abad;
  span {
    padding-bottom: 1.2rem;
    &:first-child {
      margin-right: 4.2rem;
      display: inline-block;
    }
    &.active {
      color: #fff;
    }
    &.active:after {
      content: "";
      position: absolute;
      height: 0.25rem;
      background: #fff;
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
    }
  }
}
</style>
<script>
export default {
  props: ["tabItem"],
  name: "tab-bar",
  data() {
    return {
      tabIndex: 0
    };
  },
  methods: {
    onTabTouch(i, item) {
      this.tabIndex = i;
      this.$emit("onTabChange", i);
    }
  }
};
</script>

