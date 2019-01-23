<template>
  <div
    :class="myClass"
    v-if="tabItem"
    class="tab-bar font-16 font-bold"
  >
    <template v-for="(item,i) in tabItem">
      <span
        class="p-rel"
        :class="tabIndex==item.type?'active':''"
        @touchend='onTabTouch(i,item.type)'
        :key="i"
        v-text="item.label"
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
  props: ["tabItem", "myClass", "tabIndex"],
  name: "tab-bar",
  data() {
    return {};
  },
  methods: {
    onTabTouch(i, type) {
      let { isemail, isgoogle, istel } = this.Store.state.checkLoginState;
      if (type == 0 && !isgoogle) {
        this.$toast({
          message: "您未绑定谷歌"
        });
        return;
      }
      if (type == 1 && !istel) {
        this.$toast({
          message: "您未绑定手机"
        });
        return;
      }
      if (type == 2 && !isemail) {
        this.$toast({
          message: "您未绑定邮箱"
        });
        return;
      }
      this.$emit("onTabChange", type);
    }
  }
};
</script>

