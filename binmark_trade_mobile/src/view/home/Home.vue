<template>
  <div class="app-body overflow-y">
    <!-- 侧栏滑块 -->
    <slide-pop
      @onClose="slideClose"
      :showPop="showPop"
    >
      <user-aside slot="content"></user-aside>
    </slide-pop>
    <div class="head">
      <app-header
        :iconLeft="assetConfig.imgs.user_head_portrait"
        @onHeadClick="slideShow"
      >
        <img
          slot="title"
          class="logo abs-vh-center"
          :src="assetConfig.imgs.logo_2"
        >
      </app-header>
      <!-- banner -->
      <div class="banner">
        <swiper :options="BannerSwiperOptions">
          <swiper-slide
            v-for="(item,i) in banners"
            :key="i"
          >
            <img
              :onerror="errorGoodsImg"
              class="banner-img"
              :src="item.bannerUrl?item.bannerUrl:errorGoodsImg"
            >
          </swiper-slide>
        </swiper>
      </div>
      <!-- 公告 -->
      <van-row class="notice-bar font-14 h-50">
        <van-col
          class="flex h-50 flex-v-center"
          span="3"
        >
          <img
            class="icon-notice h-30"
            :src="assetConfig.imgs.notice_logo"
            alt
          >
        </van-col>
        <van-col span="21">
          <swiper
            class="h-50"
            :options="noticeSwiper"
          >
            <template v-for="(item,i) in Store.state.newsList">
              <swiper-slide :key="i">
                <van-row class="notice-detail">
                  <van-col span="20">
                    <router-link
                      :to="'/news/detail/'+item.id"
                      v-text="item.title"
                    ></router-link>
                  </van-col>
                  <van-col
                    class="color-666 txt-rt"
                    span="4"
                  >10-08</van-col>
                </van-row>
              </swiper-slide>
            </template>
          </swiper>
        </van-col>
        <van-col span="4"></van-col>
      </van-row>
    </div>
    <!-- 币种列表 -->
    <div class="tab h-45 flex flex-v-center">
      <a
        v-for="(item,index) in Store.state.mainCoin"
        :key="item.id"
        href="javascript:"
        class="font-16 font-bold"
        :class="activeIndex==index&&'active'"
        v-text="item.coinid"
        @click="onMainCoinChange(item,index)"
      ></a>
    </div>
    <div class="van-hairline--bottom"></div>
    <div class="coin-list">
      <div
        @click="showKline(item.coinid)"
        v-for="(item,i) in Store.state.tradeCoin"
        :key="i"
        class="list-item van-hairline--bottom"
      >
        <van-row>
          <van-col span="2">
            <img
              :src="item.logo?item.logo:errorGoodsImg"
              :onerror="errorGoodsImg"
              class="thumb-25"
            >
          </van-col>
          <van-col span="8">
            <div
              class="font-15 font-bold"
              v-text="item.coinid"
            ></div>
            <div class="color-666">
              <span>24h量&nbsp;</span>
              <span v-text="item.number*1"></span>
            </div>
          </van-col>
          <van-col span="9">
            <div class="font-15 font-bold">{{item.prise*1}}&nbsp;{{mainCoinInfo.icon}}</div>
            <div
              class="color-666"
              v-html="'≈&nbsp;'+mainCoinInfo.cny*item.prise+'&nbsp;cny'"
            ></div>
          </van-col>
          <van-col span="5">
            <span
              class="rise font-16"
              v-text="item.rise*1"
              :class="item.rise>0?'up':'down'"
            ></span>
          </van-col>
        </van-row>
        <div
          v-show="item.coinid==tradecoinid"
          class="k-line"
        >
          <van-row class="k-head">
            <van-col
              class="flex flex-v-center flex-h-center"
              span='6'
            >
              <div class="title color-999">24H最高价</div>
              <span
                class="color-danger"
                v-text="item.height*1"
              ></span>
            </van-col>
            <van-col
              class="flex flex-v-center flex-h-center"
              span='6'
            >
              <div class="title color-999">24H最低价</div>
              <span
                class="color-success"
                v-text="item.low*1"
              ></span>
            </van-col>
            <van-col
              class="flex flex-v-center flex-h-center"
              span='6'
            >
              <div class="title color-999">24H成交量</div>
              <span v-text="item.number*1"></span>
            </van-col>
            <van-col
              class="flex flex-v-center flex-h-center"
              span='6'
            >
              <div
                @click="toTrade(item)"
                class="color-danger"
              >去交易&nbsp;&nbsp;→</div>
            </van-col>
          </van-row>
          <div class="k-map">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getNewsList,
  getIndexBanner,
  getChart
} from "@/vuexStore/storeService.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import slidePop from "@/components/other/slidePop";
import userAside from "@/components/slideContent/UserAside";
import appHeader from "@/components/header/AppHeader";
import { asideMixin, coinTradeMixin } from "@/mixin/mixin";
export default {
  components: { swiper, swiperSlide, slidePop, appHeader, userAside },
  mixins: [asideMixin, coinTradeMixin],
  data() {
    return {
      banners: [],
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
      tradecoinid: null,
      noticeSwiper: {
        loop: true,
        height: 50,
        direction: "vertical",
        autoplay: true,
        speed: 300
      },
      chartsLine: [],
      errorGoodsImg: `this.src="${this.assetConfig.imgs.default}"`,
      activeIndex: 0,
      mainCoinInfo: {}
    };
  },
  mounted() {
    this.getBanner();
    this.getCoinData().then(list => {
      this.mainCoinInfo = list[0];
      list && this.getTradeCoin(list[0].coinid);
    });
    getNewsList();
  },
  methods: {
    onMainCoinChange(item, index) {
      this.activeIndex = index;
      this.mainCoinInfo = item;
      this.getTradeCoin(item.coinid);
    },
    showKline(id) {
      this.tradecoinid = id;
      getChart(id).then(res => {
        let list = res.data;
        list.map(item => {
          let Obj = {
            日期: newDate(Number(item[0])).toLocaleDateString(),
            走势: item[1] * 1
          };
          this.chartsLine.push(Obj);
        });
      });
    },
    getBanner() {
      if (
        window.sessionStorage &&
        window.sessionStorage.getItem("banner") * 1
      ) {
        try {
          this.banners = JSON.parse(window.sessionStorage.getItem("banner"));
        } catch (err) {
          console.log(err);
        }
      } else {
        getIndexBanner().then(list => {
          this.banners = list;
        });
      }
    },
    toTrade(item) {
      this.navigateTo("/trade/coin_trade", {
        maincoinid: item.maincoinid,
        tradecoinid: item.coinid
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.head {
  background: #fff;
  .logo {
    height: 2.6rem;
  }
  .banner {
    overflow: hidden;
    .banner-img {
      width: 100%;
    }
  }
  .notice-bar {
    padding: 0 $gap;
    .notice-detail {
      @include textVcenter(50px);
    }
    a {
      display: block;
      width: 100%;
    }
  }
}
.coin-list {
  background: #fff;
  .list-item {
    padding: 0 $gap;
  }
}
.tab {
  margin-top: 1.25rem;
  padding: 0 $gap;
  background: #fff;
  a {
    display: block;
    height: 100%;
    line-height: 45px;
    box-sizing: border-box;
    &:not(:last-child) {
      margin-right: 2rem;
    }
    &.active {
      border-bottom: 0.25rem solid $color-primary;
    }
  }
}
.list-item {
  > .van-row {
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
  .k-head {
    height: 3.4rem;
    .van-col {
      height: 100%;
    }
  }
  .k-map {
    padding-top: 0.85rem;
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


