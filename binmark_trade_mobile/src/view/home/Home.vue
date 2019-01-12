<template>
  <div class="app-body overflow-y">
    <div class="head">
      <div class="home-header flex flex-v-center">
        <img
          class="logo"
          :src="assetConfig.imgs.logo_1"
          alt=""
        >
      </div>
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
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: { swiper, swiperSlide },
  data() {
    return {
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
        height: 170,
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
      }
    };
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
$padding-between: 1rem;
.head {
  padding: 0 $padding-between;
  background: #fff;
  .home-header {
    height: 5rem;
  }
  .logo {
    height: 2.8rem;
  }
  .banner {
    .banner-img {
      width: 100%;
    }
  }
}

.notice-detail {
  @include textVcenter(50px);
}
</style>


