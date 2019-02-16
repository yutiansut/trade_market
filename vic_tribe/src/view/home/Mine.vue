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
        >0.00</div>
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
          :style="{left:randomX,top:randomY}"
          class="item-random p-abs"
        >
          <img
            class="thumb-45"
            :src="assetConfig.icon_5"
          >
          <span class="font-12">1.005</span>
        </div>
      </div>
      <div class="menu flex flex-between">
        <div class="flex">
          <div class="item">
            <img
              class="icon thumb-45"
              :src="assetConfig.icon_1"
            >
            <span class="label font-14">兑换中心</span>
          </div>
          <div class="item">
            <img
              class="icon thumb-45"
              :src="assetConfig.icon_2"
            >
            <span class="label font-14">邀请好友</span>
          </div>
        </div>
        <div class="flex">
          <div class="item">
            <img
              class="icon thumb-45"
              :src="assetConfig.icon_3"
            >
            <span class="label font-14">收益记录</span>
          </div>
          <div class="item">
            <img
              class="icon thumb-45"
              :src="assetConfig.icon_4"
            >
            <span class="label font-14">每日签到</span>
          </div>
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
          <swiper-slide :key='item.autoid'>
            <router-link
              class="font-14 van-ellipsis"
              :to='"/news/detail/"+item.autoid'
              v-text="item.title"
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
                :src="assetConfig.banner1"
              >
            </router-link>
          </swiper-slide>
        </template>
      </swiper>
    </div>
    <!-- 签到 -->
    <div
      v-show="showSign"
      class="pop-up wh-full"
    >
      <div
        :style="{backgroundImage:'url('+assetConfig.signBg+')'}"
        class="sign-box p-rel"
      >
        <van-icon
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
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
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
      banner1: require("@/assets/images/mine/banner1.png"),
      signBg: require("@/assets/images/mine/tc.png"),
      signBtn: require("@/assets/images/mine/sign_btn.png")
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
      newsList: [
        {
          autoid: 1,
          title: "新闻测试"
        }
      ],
      randomSize: [30, 35, 40, 45],
      randomX: "15%",
      randomY: "20%",
      showSign: false,
      banners: new Array(3)
    };
  },
  methods: {
    getSize() {},
    getPos() {},
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
</style>