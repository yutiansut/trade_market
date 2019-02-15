<template>
  <div class="container wh-full">
    <div
      :style="{backgroundImage:'url('+bg+')'}"
      class="content"
    >
      <div class="header p-rel txt-center">
        <van-icon
          size='18px'
          class="p-abs"
          name='arrow-left'
        ></van-icon>
        <span
          class="font-16"
          v-text="$store.state.headerTitle"
        ></span>
        <div
          :style="{backgroundImage:'url('+mineBg+')'}"
          class="mine-number p-abs font-14 txt-rt"
        >0.00</div>
      </div>
      <div class="mine-zone"></div>
      <div class="menu flex flex-between">
        <div class="flex">
          <div class="item">
            <img
              class="icon thumb-45"
              :src="icon_1"
            >
            <span class="label font-14">兑换中心</span>
          </div>
          <div class="item">
            <img
              class="icon thumb-45"
              :src="icon_2"
            >
            <span class="label font-14">邀请好友</span>
          </div>
        </div>
        <div class="flex">
          <div class="item">
            <img
              class="icon thumb-45"
              :src="icon_3"
            >
            <span class="label font-14">收益记录</span>
          </div>
          <div class="item">
            <img
              class="icon thumb-45"
              :src="icon_4"
            >
            <span class="label font-14">每日签到</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bg: require("../../assets/images/mine/bj.png"),
      mineBg: require("../../assets/images/mine/zzc.png"),
      icon_1: require("../../assets/images/mine/dhzx.png"),
      icon_2: require("../../assets/images/mine/yqhy.png"),
      icon_3: require("../../assets/images/mine/syjl.png"),
      icon_4: require("../../assets/images/mine/qd.png")
    };
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: 74.8%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header {
  @include textVcenter(48px);
  color: #fff;
  .van-icon {
    @include textVcenter(48px);
    padding-left: 1rem;
    padding-right: 1.5rem;
    left: 0;
  }
  .mine-number {
    width: 28%;
    top: 0;
    right: 1rem;
    padding-right: 1rem;
    @include textVcenter(48px);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center center;
  }
}
.menu {
  color: #fff;
  padding: 0 1.5rem;
  box-sizing: border-box;
  margin: 1rem 0;
  > div {
    flex: 1;
    display: flex;
    &:first-child {
      justify-content: flex-start;
    }
    &:last-child {
      justify-content: flex-end;
    }
    .item:first-child {
      margin-right: 2rem;
    }
  }
  .icon {
    display: block;
    margin: 0 auto 0.4rem auto;
  }
}
.mine-zone {
  flex: 1;
}
</style>