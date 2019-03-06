<template>
  <div class="container wh-full">
    <!-- 顶部矿区 -->
    <div
      :style="{backgroundImage:'url('+assetConfig.bg+')'}"
      class="content"
    >
      <div class="header p-rel txt-center">
        <van-icon
          @click="goBack"
          size='18px'
          class="p-abs"
          name='arrow-left'
        ></van-icon>
        <span
          class="font-16"
          v-text="$store.state.headerTitle"
        ></span>
        <div
          :style="{backgroundImage:'url('+assetConfig.mineBg+')'}"
          class="mine-number p-abs font-14 txt-rt"
          v-text="$store.state.accountInfo.customerIntegral"
        ></div>
      </div>
      <!-- 矿石仓库 -->
      <div class="mine-zone p-rel">
        <!--挖矿中 -->
        <div class="item-fixed abs-h-center">
          <img
            class="thumb"
            :src="assetConfig.iconDiamond"
          >
        </div>
        <!-- 随机出现矿石 -->
        <div
          v-for="(item,i) in awards"
          :key='item.id'
          :style="item.cssStyle"
          @touchend='getAward(item.id,i)'
          class="item-random p-abs scaleAni"
        >
          <img
            :class="'thumb-'+item.size"
            :src="assetConfig.icon_5"
          >
          <span
            class="font-12"
            v-text="item.releaseNum"
          ></span>
        </div>
      </div>
      <div class="menu flex flex-between">
        <div class="flex">
          <div
            @touchend='navigateTo("/user/invite")'
            class="item"
          >
            <img
              class="icon thumb-45"
              :src="assetConfig.icon_2"
            >
            <span class="label font-14">邀请好友</span>
          </div>
        </div>
        <div class="flex">
          <div
            @touchend='navigateTo("/record/bill_record")'
            class="item"
          >
            <img
              class="icon thumb-45"
              :src="assetConfig.icon_3"
            >
            <span class="label font-14">收益记录</span>
          </div>
          <!-- <div
            @touchend='toggleSignShow'
            class="item"
          >
            <img
              class="icon thumb-45"
              :src="assetConfig.icon_4"
            >
            <span class="label font-14">每日签到</span>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 轮播公告 -->
    <div class="notice-swiper h-45 flex flex-between flex-v-center">
      <div class="icon-notice">
        <img :src="assetConfig.iconNotice">
      </div>
      <swiper :options="noticeSwiper">
        <template v-for="item in newsList">
          <swiper-slide :key='item.id'>
            <router-link
              class="font-14 van-ellipsis"
              :to='{path:"/news/detail/",query:{id:item.id,pageNo:item.page,pageSize:item.pageSize}}'
              v-text="item.noticeTitle"
            ></router-link>
          </swiper-slide>
        </template>
      </swiper>
    </div>
    <!-- 轮播图 -->
    <div class="banner-swiper">
      <swiper :options='bannerSwiper'>
        <template v-for="(item,i) in banners">
          <swiper-slide :key='i'>
            <router-link to=''>
              <img
                class="banner-img"
                :src="item.bannerImage"
              >
            </router-link>
          </swiper-slide>
        </template>
      </swiper>
    </div>
    <!-- 签到 -->
    <!-- <div
      v-show="showSign"
      class="pop-up wh-full"
    >
      <div
        :style="{backgroundImage:'url('+assetConfig.signBg+')'}"
        class="sign-box p-rel"
      >
        <van-icon
          @touchend='toggleSignShow'
          size='30px'
          name='close'
        />
        <div class="text txt-center">
          <div class="font-22">今日签领取</div>
          <div class="font-24">20 <small>积分</small>
          </div>
        </div>
        <img
          class="sign-btn abs-h-center"
          :src="assetConfig.signBtn"
        >
      </div>
    </div> -->
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {
  selectNotice,
  selectBanner,
  UnclaimedAward,
  getAward,
  selectAccount
} from "@/vuexStore/customerController.js";
import { randomNum } from "@/assets/js/Utils.js";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    const assetConfig = {
      bg: require("@/assets/images/mine/bj.png"),
      mineBg: require("@/assets/images/mine/zzc.png"),
      icon_1: require("@/assets/images/mine/dhzx.png"),
      icon_2: require("@/assets/images/mine/yqhy.png"),
      icon_3: require("@/assets/images/mine/syjl.png"),
      icon_4: require("@/assets/images/mine/qd.png"),
      icon_5: require("@/assets/images/mine/sy.png"),
      iconDiamond: require("@/assets/images/mine/wkz.png"),
      iconNotice: require("@/assets/images/mine/icon_notice.png"),
      signBg: require("@/assets/images/mine/tc.png")
    };
    return {
      assetConfig: assetConfig,
      noticeSwiper: {
        loop: true,
        height: 45,
        direction: "vertical",
        autoplay: true,
        speed: 300
      },
      bannerSwiper: {
        loop: true,
        autoplay: true,
        speed: 800
      },
      newsList: [],
      randomSize: [30, 35, 40, 45],
      showSign: false,
      awards: [],
      banners: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        let noticeResult = await selectNotice(2);
        let bannerList = await selectBanner(1);
        let awards = await UnclaimedAward();
        selectAccount();
        noticeResult && (this.newsList = noticeResult.list);
        this.banners = bannerList;
        this.awards = this.randomDiamond(awards);
      } catch (err) {
        console.log(err);
      }
    },
    toggleSignShow() {
      this.showSign = !this.showSign;
    },
    //设置矿石随机位置及大小
    randomDiamond(arr) {
      if (!Array.isArray(arr)) return false;
      let len = arr.length,
        randomSizeIndex = 0,
        x = 0,
        y = 0;
      for (let i = len; i > 0; i--) {
        x = randomNum(0, 95);
        y = randomNum(0, 95);
        arr[len - 1].cssStyle = `left:${x}%;top:${y}%`;
        randomSizeIndex = randomNum(0, this.randomSize.length);
        arr[len - i].size = this.randomSize[randomSizeIndex];
      }
      return arr;
    },
    getAward(id, index) {
      if (id) {
        getAward(id).then(res => {
          if (res && index) {
            this.awards.splice(index, 1);
          }
        });
      }
    },
    goBack() {
      this.$router.push(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  overflow: hidden;
}
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
  margin: 20px 0;
  > div {
    flex: 1;
    display: flex;
    &:first-child {
      justify-content: flex-start;
    }
    &:last-child {
      justify-content: flex-end;
    }
  }
  .icon {
    display: block;
    margin: 0 auto 0.4rem auto;
  }
}
.mine-zone {
  flex: 1;
  .item-fixed {
    bottom: 24%;
  }
  .thumb {
    width: 45px;
  }
}
.notice-swiper {
  background: #fff;
  padding: 0 1rem;
  overflow: hidden;
  .icon-notice {
    padding-right: 1rem;
    height: 20px;
    border-right: 1px solid #ddd;
    img {
      height: 100%;
    }
  }
  .swiper-container {
    flex: 1;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    margin-left: 1rem;
    word-wrap: wrap;
    a {
      display: block;
    }
  }
}
.item-random {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  img {
    margin-bottom: 0.5rem;
  }
}
.banner-swiper {
  height: calc(25.2% - 50px);
  .banner-img {
    width: 100%;
  }
}
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sign-box {
  width: 77.33%;
  height: 46.1%;
  border-radius: 6px;
  background-repeat: no-repeat;
  background-size: contain;
  .van-icon {
    color: #eee;
    position: absolute;
    right: -8%;
    top: -12%;
  }
  .text {
    position: absolute;
    bottom: 32%;
    width: 100%;
    color: #ff6228;
    line-height: 1.5;
  }
  .sign-btn {
    width: 65%;
    bottom: 8.5%;
    z-index: 99;
  }
}
@keyframes scaleZoom {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
.scaleAni {
  animation: scaleZoom 0.8s alternate infinite;
}
</style>