<template>
  <div
    :class="myClass"
    v-if="tabItem"
    class="tab-bar font-16 font-bold"
  >
    <template v-for="(item,i) in tabItem">
      <span
        class="p-rel"
        :class="tabIndex==i?'active':''"
        @touchend='onTabTouch(i,item)'
        :key="i"
        v-text="item"
      ></span>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.tab-bar {
  color: #a8abad;
  height: 3rem;
  span {
    box-sizing: border-box;
    padding-bottom: 1.2rem;
    transition: all 0.1s;
    display: inline-block;
    margin-left: 3rem;
    &:first-child {
      margin-left: 0;
    }
    &.active {
      color: #333;
      font-size: 1.8rem;
    }
    &.active:after {
      content: "";
      position: absolute;
      height: 0.25rem;
      background: #333;
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
  props: ["tabItem", "myClass"],
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

