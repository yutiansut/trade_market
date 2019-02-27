<template>
  <div class="app-body overflow-y">
    <div class="header flex flex-v-center flex-between">
      <div class="head-lf flex flex-v-center">
        <img
          class="logo"
          :src="assetConfig.logo"
        >
        <span class="font-bit-bold font-18">VIC</span>
      </div>
      <div class="head-rt">
        <span
          :style="{backgroundImage:'url('+assetConfig.iconBg_1+')'}"
          class="icon"
        ></span>
        <span
          :style="{backgroundImage:'url('+assetConfig.iconBg_2+')'}"
          class="icon"
        ></span>
      </div>
    </div>
    <!-- 资产信息 -->
    <div class="account-info">
      <div :style="{backgroundImage:'url('+assetConfig.totalAsset+')'}">
        <p class="label font-bold font-16">总资产</p>
        <p
          class="val font-bold font-22"
          v-text="$store.state.accountInfo.customerIntegral"
        ></p>
      </div>
      <div :style="{backgroundImage:'url('+assetConfig.balance+')'}">
        <p class="label font-bold font-16">余额</p>
        <p
          class="val font-bold font-22"
          v-text="$store.state.accountInfo.useMoney"
        ></p>
      </div>
      <div :style="{backgroundImage:'url('+assetConfig.VIC+')'}">
        <p class="label font-bold font-16">VIC</p>
        <p
          class="val font-bold font-22"
          v-text="$store.state.accountInfo.useCoin"
        ></p>
      </div>
    </div>
    <!-- 新消息提示 -->
    <van-row class="news-bar flex flex-v-center flex-between">
      <van-col span='4'>
        <img
          class="tag"
          :src="assetConfig.ioncNotice"
          alt=""
        >
      </van-col>
      <van-col
        span='16'
        class="font-16 news-title"
      >
        <swiper :options="noticeSwiper">
          <template v-for="item in scrollNotices">
            <swiper-slide :key='item.id'>
              <router-link
                class="font-14 van-ellipsis"
                :to='"/news/detail/"+item.id'
                v-text="item.noticeTitle"
              ></router-link>
            </swiper-slide>
          </template>
        </swiper>
      </van-col>
      <van-col
        span='4'
        class="flex flex-end"
      >
        <van-icon name='arrow font-16'></van-icon>
      </van-col>
    </van-row>
    <div class="van-hairline--bottom"></div>
    <!-- 菜单项 -->
    <div class="menu">
      <router-link to=''>
        <img
          class="add-banner"
          :src="assetConfig.noticeBarBg"
        >
      </router-link>
      <div class="market-val flex flex-between">
        <div class="m-item">
          <span class="font-16">0.011</span>
          <span class="font-14 color-666">市值($)</span>
        </div>
        <div class="m-item">
          <span class="font-16">0.011</span>
          <span class="font-14 color-666">市值(￥)</span>
        </div>
      </div>
      <van-row class="menu-item">
        <van-col
          v-for="(item,i) in menuItem"
          :key='i'
          span='8'
        >
          <router-link :to='item.link'>
            <img
              v-if="assetConfig['menuIcon_'+(i+1)]"
              class="icon"
              :src="assetConfig['menuIcon_'+(i+1)]"
            >
            <span
              v-text="item.label"
              class="menu-label font-16"
            ></span>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <!-- 资讯 -->
    <!-- <div class="news">
      <van-cell
        title="热门资讯"
        value='查看更多'
        title-class="title font-16"
        value-class='more color-666'
        is-link
        to='/news'
      />
    </div> -->
  </div>
</template>
<script>
import newsList from "@/components/other/newsList";
import { selectNotice, selectAccount } from "@/vuexStore/customerController.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Toast } from "vant";
let count = 0;
export default {
  components: { newsList, swiper, swiperSlide },
  data() {
    const assetConfig = {
      logo: require("@/assets/images/home/home_logo.png"),
      iconBg_1: require("@/assets/images/home/ewm.png"),
      iconBg_2: require("@/assets/images/home/sys.png"),
      menuIcon_1: require("@/assets/images/home/dxzz.png"),
      menuIcon_2: require("@/assets/images/home/zvpt.png"),
      menuIcon_3: require("@/assets/images/home/Goldzz.png"),
      menuIcon_4: require("@/assets/images/home/wytg.png"),
      menuIcon_5: require("@/assets/images/home/VICHQ.png"),
      menuIcon_6: require("@/assets/images/home/txjl.png"),
      totalAsset: require("@/assets/images/home/total_asset.png"),
      balance: require("@/assets/images/home/balance.png"),
      VIC: require("@/assets/images/home/VIC.png"),
      noticeBarBg: require("@/assets/images/home/banner.png"),
      ioncNotice: require("@/assets/images/home/TZ.png")
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
      menuItem: [
        {
          label: "货币兑换",
          link: "/currency_exchange"
        },
        {
          label: "VIC交易",
          link: "/trade/entrust_trade"
        },
        {
          label: "定向交易",
          link: "/dir_trade"
        },
        {
          label: "VIC兑换",
          link: "/vicexchange"
        },
        {
          label: "VIC行情",
          link: "/market"
        },
        {
          label: "我的账单",
          link: "/record/bill_record"
        }
      ],
      scrollNotices: [],
      pageNo: 1,
      pageSize: 5,
      pageCount: 0 //总页数
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      selectAccount();
      // 咨询公告
      let scrollNoticeRes = await selectNotice(2);
      scrollNoticeRes && (this.scrollNotices = scrollNoticeRes.list);
    }
  }
};
</script>
<style lang="scss" scoped>
$padding: 3.3vw;
.header {
  padding: 1rem $padding 0;
  background: #fff;
  .logo {
    width: 9.3vw;
    & + span {
      margin: 0.5rem;
    }
  }
  .head-rt {
    align-content: flex-end;
  }
  .icon {
    width: 2rem;
    height: 2rem;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    &:first-child {
      margin-right: 1.2rem;
    }
  }
}
.account-info {
  padding: 4.53vw $padding;
  overflow-x: auto;
  white-space: nowrap;
  background: #fff;
  color: #fff;
  > div {
    width: 12.08rem;
    height: 7.8rem;
    border-radius: 1rem;
    display: inline-block;
    margin-left: 1.2rem;
    box-sizing: border-box;
    overflow: hidden;
    padding: 1.6rem 0 0 1.8rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &:first-child {
      margin-left: 0;
    }
    .label {
      margin-bottom: 0.5rem;
    }
  }
}
.news-bar {
  margin-top: 0.9rem;
  height: 13.3vw;
  padding: 0 3.3vw;
  background: #fff;
  .news-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 45px;
  }
  .tag {
    width: 6.6vh;
  }
}
.menu {
  background: #fff;
  padding: 0 $padding;
  overflow: hidden;
  .add-banner {
    width: 93.4vw;
    margin-top: 1.5rem;
  }
}
.market-val {
  margin: 1.5rem auto;
  .m-item {
    height: 5rem;
    width: 48%;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 0.2rem;
    box-shadow: 0px 0px 0.8rem 0.2rem #ddd;
    span {
      display: block;
      &:first-child {
        margin-bottom: 0.2rem;
        font-weight: bold;
      }
    }
  }
}
.menu-item {
  .van-col {
    text-align: center;
    margin: 16px 0;
  }
  .icon {
    width: 10vw;
    height: 10vw;
    display: block;
    margin: 0 auto 1.5rem auto;
  }
}
.news {
  margin-top: 0.9rem;
  background: #fff;
  .news-list-container {
    padding: 0 15px;
    margin-top: 1.9rem;
  }
}
</style>


