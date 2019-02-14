<template>
  <div class="container wh-full">
    <div class="content-top">
      <div class="header p-rel txt-center">
        <van-icon
          @click="goBack"
          size='1.25rem'
          name='arrow-left'
        ></van-icon>
        <span class="font-16">等级</span>
      </div>
    </div>
    <div class="content-body">
      <div class="panel p-rel vip-info">
        <div class="user-info">
          <div
            class="font-bold font-16"
            v-text="Store.state.userInfo.tel||Store.state.userInfo.email"
          ></div>
          <em class="font-14 color-666">账户ID:{{Store.state.userInfo.member}}</em>
        </div>
        <div class="vip-level txt-center">
          <div class="font-16">V{{Store.state.userInfo.viplevel}}</div>
          <span>当前等级</span>
        </div>
        <van-row class="vip-desp">
          <van-col span='8'>
            <div
              class="font-15"
              v-text="amount"
            ></div>
            <div class="label color-666 font-14">所需交易额</div>
          </van-col>
          <van-col span='8'>
            <div
              class="font-15"
              v-text="myDiscount"
            ></div>
            <div class="label color-666 font-14">专享手续费</div>
          </van-col>
        </van-row>
      </div>
      <div
        v-for="(item,i) in vipData"
        :key='i'
        class="panel"
      >
        <div
          class="vip-lv font-18"
          v-text="item.name"
        ></div>
        <van-row class="vip-desp">
          <van-col span='8'>
            <div
              class="font-15"
              v-text="item.upgrade*1"
            ></div>
            <div class="label color-666 font-14">所需交易额</div>
          </van-col>
          <van-col span='8'>
            <div
              class="font-15"
              v-text="item.discount*100+'%'"
            ></div>
            <div class="label color-666 font-14">专享手续费</div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo, VipInfo } from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      vipData: [],
      myVipInfo: {}
    };
  },
  computed: {
    amount() {
      return (this.myVipInfo.upgrade || 0) * 1;
    },
    myDiscount() {
      return (this.myVipInfo.discount || 0) * 100 + "%";
    }
  },
  mounted() {
    if (this.Store.state.isLogin) {
      getUserInfo();
    }
    VipInfo().then(res => {
      if (res.list) {
        this.vipData = res.list;
      }
      this.myVipInfo = res.info[0];
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  background: #fff;
}
.content-top {
  background: #444b58;
  height: 11.25rem;
  .header {
    @include textVcenter(3.85rem);
    color: #fff;
  }
  .van-icon {
    position: absolute;
    @include textVcenter(3.85rem);
    padding: 0 1rem;
    left: 0;
  }
}
.content-body {
  padding: 0 1rem;
  margin-top: -7.16rem;
  .panel {
    padding: 1.25rem;
    background: #fff;
    box-sizing: border-box;
    border-radius: 0.25rem;
    border: 1px solid #eee;
    border-bottom-color: #e5e5e5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:not(:first-child) {
      margin-top: 1.25rem;
    }
  }
  .vip-info {
    height: 10.42rem;
  }
  .user-info {
    > div {
      margin-bottom: 0.25rem;
    }
  }
  .vip-level {
    display: flex;
    right: 1rem;
    top: -1px;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    width: 5rem;
    height: 5.5rem;
    background: #d0a771;
    color: #5a482f;
  }
}
.vip-lv {
  color: #d0a771;
  margin-bottom: 1.25rem;
}
.label {
  margin-top: 0.5rem;
}
</style>
