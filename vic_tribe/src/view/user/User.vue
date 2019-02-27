<template>
  <div class="overflow-y app-body">
    <div
      :style="{backgroundImage:'url('+assetConfig.topBg+')'}"
      class="user"
    >
      <div class="header-title txt-center h-45 font-16">{{$store.state.headerTitle}}</div>
      <div class="user-info">
        <div class="portrait thumb-50">
          <img :src="$store.state.userInfo.customerHead?$store.state.userInfo.customerHead:assetConfig.portrait">
        </div>
        <div class="info-detail txt-center font-16">
          <div class="name">{{$store.state.userInfo.customerName}}</div>
          <div class="user-id">ID:{{$store.state.userInfo.customerNumber}}</div>
        </div>
      </div>
    </div>
    <van-row class="menu">
      <van-col
        v-for="(item,i) in menuConfig"
        :key='i'
        span='6'
      >
        <router-link :to='item.link?item.link:""'>
          <img
            v-if="assetConfig['menuIcon_'+(i+1)]"
            class="icon"
            :src="assetConfig['menuIcon_'+(i+1)]"
            :alt="item.label"
          >
          <span
            class="font-16 color-666"
            v-text="item.label"
          ></span>
        </router-link>
      </van-col>
    </van-row>
    <div class="nav">
      <van-cell-group>
        <van-cell
          v-for="(item,i) in navConfig"
          :key='i'
          :icon="assetConfig['navIcon_'+(i+1)]?assetConfig['navIcon_'+(i+1)]:''"
          is-link
          :to='item.link'
        >
          <template
            size='large'
            slot="title"
          >
            <span
              class="title font-15"
              v-text="item.title"
            ></span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { selectCustomer } from "../../vuexStore/customerController.js";
export default {
  data() {
    const assetConfig = {
      topBg: require("../../assets/images/user/bj.png"),
      portrait: require("../../assets/images/user/portrait.png"),
      menuIcon_1: require("../../assets/images/user/grzx-icon1.png"),
      menuIcon_2: require("../../assets/images/user/grzx-icon2.png"),
      menuIcon_3: require("../../assets/images/user/grzx-icon3.png"),
      menuIcon_4: require("../../assets/images/user/grzx-icon4.png"),
      navIcon_1: require("../../assets/images/user/grqb.png"),
      navIcon_2: require("../../assets/images/user/wfzd.png"),
      navIcon_3: require("../../assets/images/user/grzx-icon9.png"),
      navIcon_4: require("../../assets/images/user/zhsz.png"),
      navIcon_5: require("../../assets/images/user/grzx-icon14.png"),
      navIcon_6: require("../../assets/images/user/grzx-icon15.png")
    };
    return {
      assetConfig: assetConfig,
      menuConfig: [
        {
          label: "邀请好友",
          link: "/user/invite"
        },
        {
          label: "我的圈友",
          link: "/user/myteam"
        },
        {
          label: "商家服务",
          link: ""
        },
        {
          label: "我的任务",
          link: ""
        }
      ],
      navConfig: [
        {
          title: "个人钱包",
          link: "/user/wallet"
        },
        {
          title: "我的账单",
          link: "/record/bill_record"
        },
        {
          title: "个人信息",
          link: "/user/info"
        },
        {
          title: "账户设置",
          link: "/user/setting"
        },
        {
          title: "我的小蜜",
          link: "/user/feedback"
        },
        {
          title: "关于我们",
          link: ""
        }
      ]
    };
  },
  mounted() {
    selectCustomer();
  }
};
</script>
<style lang="scss" scoped>
.user {
  height: 28.86%;
  background-color: #18191e;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
}
.header-title {
  line-height: 45px;
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.portrait {
  margin-top: 0.5rem;
  border-radius: 50%;
  img {
    width: 100%;
  }
}
.menu {
  background: #fff;
  .van-col > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.8rem 0;
  }
  .icon {
    width: 2.25rem;
    margin-bottom: 0.5rem;
  }
}
.info-detail {
  margin-top: 1rem;
  line-height: 1.5;
}
.nav {
  margin-top: 1.25rem;
}
</style>

