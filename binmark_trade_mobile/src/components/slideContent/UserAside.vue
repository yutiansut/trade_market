<template>
  <div class="user-aside w-full">
    <div
      :style="{backgroundImage:'url('+assetConfig.imgs.sideslip_bg+')'}"
      class="user-info"
    >
      <template v-if='Store.state.isLogin'>
        <div
          class="user-id font-20"
          v-text="Store.state.userInfo.tel||Store.state.userInfo.email"
        ></div>
        <span class="color-666 font-14">账号ID:{{Store.state.userInfo.member}}</span>
        <em class="vip-lv">VIP{{Store.state.userInfo.viplevel}}</em>
      </template>
      <template v-else>
        <div
          @click="navigateTo('/userentry/login')"
          class="user-id font-20"
        >请登录</div>
      </template>
    </div>
    <div class="nav-bar">
      <router-link
        v-for="(item,i) in navBar"
        :key="i"
        :to="item.link"
        :class="(i+1)%4==0&&'van-hairline--bottom'"
      >
        <div class="bar-item flex flex-v-center flex-between">
          <div class="label flex flex-v-center">
            <img
              class="icon-img"
              :src="item.icon"
            >
            <div
              class="font-14"
              v-text="item.label"
            ></div>
          </div>
          <van-icon
            color="#999"
            size="1.2rem"
            name="arrow"
          />
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from "@/vuexStore/storeService.js";
export default {
  name: "user-aside",
  data() {
    return {
      navBar: [
        {
          label: "安全中心",
          link: "/account",
          icon: this.assetConfig.imgs.user_icon_1
        },
        {
          label: "账户管理",
          link: "/account/center",
          icon: this.assetConfig.imgs.user_icon_2
        },
        {
          label: "币种资料",
          link: "/articles/coininfo",
          icon: this.assetConfig.imgs.user_icon_3
        },
        {
          label: "我的公告",
          link: "/news",
          icon: this.assetConfig.imgs.user_icon_4
        },
        {
          label: "费率标准",
          link: "/articles/fee",
          icon: this.assetConfig.imgs.user_icon_5
        },
        {
          label: "有问必答",
          link: "/articles",
          icon: this.assetConfig.imgs.user_icon_6
        },
        {
          label: "关于我们",
          link: "",
          icon: this.assetConfig.imgs.user_icon_7
        },
        {
          label: "版本更新",
          link: "",
          icon: this.assetConfig.imgs.user_icon_8
        },
        {
          label: "隐私协议",
          link: "",
          icon: this.assetConfig.imgs.user_icon_9
        }
      ]
    };
  },
  mounted() {
    if (this.Store.state.isLogin) {
      getUserInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
$gap: 1.25rem;

.user-info {
  background-repeat: no-repeat;
  box-sizing: border-box;
  height: 10.5rem;
  padding: 4.5rem $gap 0;
  .user-id {
    color: #fff;
    margin-bottom: 0.25rem;
  }
  .vip-lv {
    display: inline-block;
    padding: 0 0.5rem;
    height: 1.25rem;
    line-height: 1.25rem;
    margin-left: 0.25rem;
    background: linear-gradient(#d0a771, #dcb480);
    border-radius: 1rem;
    color:#fff;
  }
}
.nav-bar {
  a {
    display: block;
    padding: 0 $gap;
  }
  .bar-item {
    height: 4rem;
  }
  .icon-img {
    width: 1.5rem;
    margin-right: 1.5rem;
  }
  .label {
    line-height: 2rem;
  }
}
</style>