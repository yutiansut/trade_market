<template>
  <div class="w-full">
    <div
      v-if='showHead'
      class="hd-top"
    >
      <div class="hd-top-inner">
        <div class="hd-top-lf">
          <slot name="top-slot"></slot>
        </div>
        <login-bar></login-bar>
      </div>
    </div>
    <div
      v-if="showHeadBody"
      class="hd-body"
    >
      <div class="nav-inner">
        <router-link to="/main">
          <img
            class="logo p-rel"
            :src="headLogo"
            alt=""
          >
        </router-link>
        <ul class="nav-bar">
          <!-- 币币交易 -->
          <li
            class="nav-item p-rel"
            :class='currentPath==mainCoin.link?"active":""'
          >
            <router-link :to='mainCoin.link'>
              <span
                class="fl"
                v-text="$t(mainCoin.i18nKey)||item.mainCoin"
              ></span>&nbsp;
              <i
                v-if='mainCoin.subItem'
                class="iconfont icon-xiala"
              ></i>
            </router-link>
            <ol
              class="sub-nav p-abs"
              v-if="mainCoin.subItem"
            >
              <li
                class="sub-nav-item p-rel"
                @mouseenter='getTradeCoin(sItem.coinid,index)'
                v-for="(sItem,index) in mainCoin.subItem"
                :key='index'
              >
                <a href="javascript:void(0)">
                  <span>{{sItem.coinid}}&nbsp;{{$t('trade')}}</span>
                  <i class="iconfont icon-arrow-right abs-v-center rt-0"></i>
                </a>
                <!-- 二级导航 -->
                <div
                  v-loading='showLoading'
                  element-loading-spinner='el-icon-loading'
                  element-loading-background='rgba(0,0,0,.4)'
                  class="nav-container p-abs"
                >
                  <currency-nav></currency-nav>
                </div>
              </li>
            </ol>
          </li>
          <!-- 其他交易 -->
          <li
            v-for='(item,i) in navBarCfg'
            :key='i'
            class="nav-item p-rel"
            :class='currentPath==item.link?"active":""'
          >
            <router-link :to='item.link?item.link:""'>
              <span v-text="$t(item.i18nKey)||item.label"></span>&nbsp;
              <i
                v-if='item.subItem'
                class="iconfont icon-xiala"
              ></i>
            </router-link>
            <ol
              class="sub-nav p-abs"
              v-if="item.subItem"
            >
              <li
                class="sub-nav-item p-rel"
                v-for="(sItem,j) in item.subItem"
                :key='j'
              >
                <router-link :to="sItem.link?sItem.link:''">
                  <span v-text="$t(sItem.i18nKey)||sItem.label"></span>
                  <i
                    v-if='sItem.type'
                    class="iconfont icon-arrow-right abs-v-center rt-0"
                  ></i>
                </router-link>
              </li>
              <!-- <li class="sub-nav-item p-rel">
                <a
                  target="view_window"
                  :href="agreementUrl"
                >
                  <span v-text="$t('agreement')"></span>
                </a>
              </li> -->
            </ol>
          </li>
        </ul>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import currencyNav from "@/components/other/currencyNav";
import { Toast } from "vant";
import mainCoinModel from "@/model/allCoinModel.js";
export default {
  name: "my-header",
  components: { currencyNav },
  props: {
    showHeadTop: Boolean,
    showHeadBody: {
      default: true,
      type: Boolean
    },
    headLogo: {
      type: String,
      default: require("@/assets/images/footer/bottom_logo.png")
    }
  },
  data() {
    return {
      activeIndex: 0,
      currentPath: "",
      showHead: false,
      // 币种类型
      currencyConfig: [],
      mainCoin: {
        i18nKey: "marketTrade",
        label: "币币交易",
        link: "/currency_trade",
        subItem: null
      },
      // 用户协议地址
      agreementUrl: "http://47.95.213.181/binmark/static/services.pdf",
      showLoading: true,
      navBarCfg: [
        {
          i18nKey: "ctcTrade",
          label: "C2C交易",
          link: "/c2c_trade"
        },
        {
          i18nKey: "otcTrade",
          label: "OTC交易",
          link: "/otc_trade"
        },
        {
          i18nKey: "anouncement",
          label: "系统公告",
          link: "/notice"
        },
        {
          i18nKey: "listing",
          label: "上币申请",
          link: "/application"
        },
        {
          i18nKey: "helpCenter",
          label: "帮助中心",
          subItem: [
            {
              i18nKey: "rate",
              label: "费率标准",
              link: "/help_center/fee"
            },
            {
              i18nKey: "currencyProfile",
              label: "币种资料",
              link: "/help_center/currency_intro"
            },
            {
              i18nKey: "faqCenter",
              label: "问题中心",
              link: "/help_center/faq"
            }
            // {
            //   i18nKey: "agreement",
            //   label: "用户协议",
            //   link: `${window.location.host}/pdf/services.pdf`
            // }
          ]
        }
      ],
      subNavIndex: ""
    };
  },
  // destroyed() {
  //   this.$bus.off("mainCoinLoad");
  // },
  mounted() {
    this.showHead = this.showHeadTop;
    this.currentPath = this.$route.path;
    // 币币交易币种列表
    if (mainCoinModel.maincoin) {
      this.mainCoin.subItem = mainCoinModel.maincoin;
    } else {
      this.getMainCoin();
    }
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
    },
    getMainCoin() {
      this.request(this.api.getmaincoin).then(res => {
        console.log(`主币种:${JSON.stringify(res)}`);
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        }
        let list = null;
        res.data && res.data.list && (list = res.data.list.slice(0));
        list.map(item => {
          item.coinid && (item.i18nKey = `${item.coinid.toLowerCase()}Market`);
        });
        this.mainCoin.subItem = mainCoinModel.maincoin = list;
        mainCoinModel.coinid = list[0].coinid;
        this.$bus.emit("mainCoinLoad", mainCoinModel.coinid);
      });
    },
    getTradeCoin(coin, index) {
      if (
        window.sessionStorage &&
        window.sessionStorage.getItem(`sub_${index}`)
      ) {
        this.currencyConfig = JSON.parse(
          window.sessionStorage.getItem(`sub_${index}`)
        );
        this.$bus.emit("navChange", this.currencyConfig);
        return false;
      }
      if (this.subNavIndex && this.subNavIndex == index) return false;
      this.subNavIndex = index;
      this.showLoading = true;
      this.request(this.api.getTradCoin, {
        maincoin: coin
      }).then(res => {
        if (res.code == "0") {
          this.currencyConfig = res.data.list;
        }
        if (window.sessionStorage) {
          window.sessionStorage.setItem(
            `sub_${index}`,
            JSON.stringify(res.data.list)
          );
        }
        // this.storage.set(`sub_${index}`, res.data.list);
        this.$bus.emit("navChange", this.currencyConfig);
        this.showLoading = false;
      });
    }
  },
  beforeDestroy() {
    this.$bus.off("userLoaded");
  }
};
</script>
<style lang="scss">
.hd-top {
  background: $main-bg-color;
  margin: 0 auto;
}
</style>
<style lang="scss" scoped>
.ml-25 {
  margin-left: 25px;
}
.mr-25 {
  margin-right: 25px;
}
.hd-top {
  font-size: $font-mini;
  @include textVcenter;
  span {
    display: inline-block;
    color: #fff;
  }
  .hd-top-lf {
    height: 40px;
    @include float;
    box-sizing: border-box;
    .iconfont {
      font-size: 12px;
    }
  }
}
.nav-inner {
  height: 100%;
}
.hd-body {
  @include textVcenter(60px);
  .el-menu.el-menu--horizontal {
    border: none;
  }
}
.nav-bar {
  float: left;
  height: 100%;
  margin-left: 2%;
  .nav-item {
    @include float;
    font-size: $font-normal;
    @media screen and (max-width: 1440px) {
      font-size: $font-default;
    }

    &:hover {
      .sub-nav {
        display: block;
      }
    }
  }
  .iconfont {
    font-size: $font-normal;
  }
  li {
    transition: all 0.4s;
    padding: 0 20px;
    @media screen and (max-width: 1440px) {
      font-size: $font-default;
      padding: 0 10px;
    }
    a {
      display: inline-block;
      height: inherit;
      width: inherit;
    }
  }
}
.sub-nav {
  min-width: 100%;
  white-space: nowrap;
  word-break: keep-all;
  z-index: 9999;
  left: 0;
  top: 60px;
  display: none;
  background: $bg-dark;
  .sub-nav-item {
    @include textVcenter;
    &:first-child {
      border-top: none;
    }
    .iconfont {
      display: block;
      margin-right: 5px;
    }
    a {
      margin-left: -10px;
      width: 100%;
      @media screen and (max-width: 1440px) {
        margin-left: -5px;
      }
    }
    &:hover {
      .nav-container {
        display: block;
      }
    }
  }
  .nav-container {
    display: none;
    left: 100%;
    top: 0;
    z-index: 1001;
  }
  a {
    color: #fff;
  }
}
.logo {
  width: 100px;
  float: left;
  margin-top: 18px;
}
</style>
