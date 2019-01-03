<template>
  <div
    :style="{backgroundImage:'url('+assetCfg.imgs.banner+')'}"
    class="banner p-rel"
  >
    <!-- banner内容 -->
    <div class="banner-inner">
      <h1>专业数字交易所</h1>
      <p class="font-16">我们24小时交易总额为&nbsp;&nbsp;<em class="font">{{tradeTotal|toThousand}}</em></p>
      <div class="main-coin flex">
        <div class="flex flex-v-center">
          <img
            class="thumb-30"
            src="http://www.binmark.io/images/logo/1546499563166btc.png"
          >
          <span class="font-16 font">{{btc|toThousand}}</span>
        </div>
        <div class="flex flex-v-center">
          <img
            class="thumb-30"
            src="http://www.binmark.io/images/logo/1546501213807ltc.png"
          >
          <span class="font-16 font">{{bth|toThousand}}</span>
        </div>
        <div class="flex flex-v-center">
          <img
            class="thumb-30"
            src="http://www.binmark.io/images/logo/1546502799373tct.png"
          >
          <span class="font-16 font">{{eth|toThousand}}</span>
        </div>
      </div>
      <button class="btn-large btn-primary btn-round">开始交易</button>
      <!-- 轮播公告 -->
      <div class="carousal p-abs">
        <div class="news-head flex flex-v-center flex-between">
          <span class="font-22">最新公告</span>
          <router-link to=''>查看更多</router-link>
        </div>
        <swiper-ad :swiperData='newsList'></swiper-ad>
      </div>
    </div>
  </div>
</template>
<script>
import swiperAd from "@/components/other/SwiperAd.vue";
export default {
  name: "main-banner",
  components: {
    swiperAd
  },
  data() {
    return {
      tradeTotal: "1239324224324",
      btc: "1239324",
      bth: "24224324",
      eth: "393242243",
      newsList: [
        {
          title: "标题1gageageawgaewg发个啊啊啊标题1gageageawgaewg发个啊啊啊",
          id: "1",
          type: "1",
          typeLabel: "活动公告"
        },
        {
          title: "标题1",
          id: "2",
          type: "2",
          typeLabel: "活动公告"
        },
        {
          title: "标题1",
          id: "3",
          type: "3",
          typeLabel: "活动公告"
        }
      ]
    };
  },
  filters: {
    toThousand(n) {
      return (n || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }
  }
};
</script>
<style lang="scss" scoped>
.font {
  font-family: "Oswald-Regular";
}
.banner {
  overflow: hidden;
  background-color: $bg-dark;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: 41.67vw;
  min-height: 600px;
}
.banner-inner {
  width: $content-width;
  margin: 9.63vw auto 0 auto;
  color: #fff;
  h1 {
    font-size: 50px;
  }
  p {
    margin-top: 35px;
  }
  button {
    margin-top: 40px;
  }
  .main-coin {
    margin-top: 25px;
    img[class^="thumb"] {
      margin-right: 10px;
    }
    > div {
      margin-left: 45px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .news-head {
    margin-bottom: 30px;
  }
  .carousal {
    width: $content-width;
    bottom: 55px;
  }
}
</style>