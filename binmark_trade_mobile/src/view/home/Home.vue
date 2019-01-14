<template>
  <div class="app-body overflow-y">
    <!-- 侧栏滑块 -->
    <slide-pop
      @onClose='closeSlide'
      :showPop='showPop'
    >
      <user-aside slot='content'></user-aside>
    </slide-pop>
    <div class="head">
      <app-header @onHeadClick='showSlide'>
        <img
          class="logo abs-vh-center"
          :src="assetConfig.imgs.logo_2"
        >
      </app-header>
      <!-- banner -->
      <div class="banner">
        <swiper :options='BannerSwiperOptions'>
          <swiper-slide
            v-for="(item,i) in banners"
            :key='i'
          >
            <img
              class="banner-img"
              :src="item"
              alt=""
            >
          </swiper-slide>
        </swiper>
      </div>
      <!-- 公告 -->
      <van-row class="notice-bar font-14 h-50">
        <van-col
          class="flex h-50 flex-v-center"
          span='3'
        ><img
            class="icon-notice h-30"
            :src="assetConfig.imgs.notice_logo"
            alt=""
          ></van-col>
        <van-col span='21'>
          <swiper
            class="h-50"
            :options='noticeSwiper'
          >
            <swiper-slide>
              <van-row class="notice-detail">
                <van-col span='20'>
                  <router-link to=''>标题</router-link>
                </van-col>
                <van-col
                  class="color-666 txt-rt"
                  span='4'
                >10-08</van-col>
              </van-row>
            </swiper-slide>
          </swiper>
        </van-col>
        <van-col span='4'></van-col>
      </van-row>
    </div>
    <!-- 币种列表 -->
    <div class="tab h-45 flex flex-v-center">
      <a
        href="javascript:"
        class="font-16 font-bold active"
      >USDT</a>
    </div>
    <div class="van-hairline--bottom"></div>
    <div class="coin-list">
      <div class="list-item van-hairline--bottom">
        <van-row>
          <van-col span='2'>
            <img
              class="thumb-25"
              :src="assetConfig.imgs.user_head_portrait"
            ></van-col>
          <van-col span='8'>
            <div class="font-15 font-bold">USDT</div>
            <div class="color-666">
              <span>24h量&nbsp;</span>
              <span>1564646</span>
            </div>
          </van-col>
          <van-col span='9'>
            <div class="font-15 font-bold">0101616</div>
            <div class="color-666">1.5</div>
          </van-col>
          <van-col span='5'>
            <span class="rise font-16 down">1%</span>
          </van-col>
        </van-row>
        <!-- K线图 -->
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import slidePop from "@/components/other/slidePop";
import appHeader from "@/components/header/appHeader";
import userAside from "@/components/slideContent/UserAside";
export default {
  components: { swiper, swiperSlide, slidePop, appHeader, userAside },
  data() {
    return {
      showPop: false,
      banners: [
        this.assetConfig.imgs.banner_1,
        this.assetConfig.imgs.banner_2,
        this.assetConfig.imgs.banner_3
      ],
      BannerSwiperOptions: {
        autoplay: true,
        loop: true,
        effect: "coverflow",
        slidesPerView: 1,
        speed: 800,
        coverflowEffect: {
          rotate: 30,
          stretch: 20,
          depth: 30,
          modifier: 2
        }
      },
      noticeSwiper: {
        height: 50,
        direction: "vertical",
        autoplay: true,
        speed: 300
      },
      coinid: ""
    };
  },
  mounted() {},
  methods: {
    showSlide() {
      this.showPop = true;
    },
    closeSlide() {
      this.showPop = false;
    }
  }
};
</script>
<style lang="scss" scoped>
$padding-between: 1.25rem;
.head {
  background: #fff;
  .logo {
    height: 2.6rem;
  }
  .banner {
    height: 15rem;
    overflow: hidden;
    .banner-img {
      width: 100%;
    }
  }
  .notice-bar {
    padding: 0 $padding-between;
    .notice-detail {
      @include textVcenter(50px);
    }
  }
}
.coin-list {
  background: #fff;
  .list-item {
    padding: 0 $padding-between;
  }
}
.tab {
  margin-top: 1.25rem;
  padding: 0 $padding-between;
  background: #fff;
  a {
    display: block;
    height: 100%;
    line-height: 45px;
    box-sizing: border-box;
    transition: all 0.3s;
    &:not(:last-child) {
      margin-right: 2rem;
    }
    &.active {
      border-bottom: 0.25rem solid $color-primary;
    }
  }
}
.list-item {
  .van-row {
    padding: 0.8rem 0;
  }
  .van-col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 4rem;
    &:nth-child(2) {
      padding-left: 0.5rem;
    }
  }
  .rise {
    display: inline-block;
    padding: 0.4rem 0.5rem;
    text-align: center;
    color: #fff;
    border-radius: 0.2rem;
    &.up {
      background: $color-danger;
    }
    &.down {
      background: $color-success;
    }
  }
}
</style>


