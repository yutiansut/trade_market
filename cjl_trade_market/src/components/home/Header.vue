<template>
    <div class="w-full">
      <div v-if='showHead' class="hd-top">
        <div class="hd-top-lf">
          <span class="mr-25">ETH/CNY  ￥4000.36 <i class="iconfont icon-up-arrow"></i></span>
        </div>
        <login-bar></login-bar>
      </div>
      <div class="hd-body">
        <router-link to="/"><img class="logo p-rel" :src="headLogo" alt=""></router-link>
        <ul class="nav-bar">
          <!-- 币币交易 -->
          <li
            class="nav-item p-rel"
            :class='currentPath==mainCoin.link?"active":""'>
            <router-link :to='mainCoin.link'>
              <span v-text="$t(mainCoin.i18nKey)||item.mainCoin"></span>&nbsp;
              <i v-if='mainCoin.subItem' class="iconfont icon-xiala"></i>
            </router-link>
            <ol class="sub-nav p-abs" v-if="mainCoin.subItem">
              <li class="sub-nav-item p-rel"
                v-for="(sItem,index) in mainCoin.subItem"
                :key='index'>
                <a href="javascript:void(0)">
                  <span>{{sItem.coinid}}&nbsp;{{$t('trade')}}</span>
                  <i class="iconfont icon-arrow-right abs-v-center rt-0"></i>
                </a>
                <div v-if="currencyConfig[sItem.type]" class="nav-container p-abs">
                  <currency-nav
                    :myValue='currencyConfig[sItem.type]'
                    :myKey='sItem.type'>
                  </currency-nav>
                </div>
              </li>
            </ol>
          </li>
          <!-- 其他交易 -->
          <li v-for='(item,i) in navBarCfg'
            :key='i' class="nav-item p-rel"
            :class='currentPath==item.link?"active":""'>
            <router-link :to='item.link?item.link:""'>
              <span v-text="$t(item.i18nKey)||item.label"></span>&nbsp;
              <i v-if='item.subItem' class="iconfont icon-xiala"></i>
            </router-link>
            <ol class="sub-nav p-abs" v-if="item.subItem">
              <li class="sub-nav-item p-rel" v-for="(sItem,j) in item.subItem" :key='j'>
                <router-link :to="sItem.link?sItem.link:''">
                  <span v-text="$t(sItem.i18nKey)||sItem.label"></span>
                  <i v-if='sItem.type' class="iconfont icon-arrow-right abs-v-center rt-0"></i>
                </router-link>
              </li>
            </ol>
          </li>
        </ul>
        <slot></slot>
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
      currencyConfig: {
        USDT: [
          {
            name: "ABC",
            label: "ABC",
            thumb:
              "http://www.ebtc2c.com/back/images/cmsimg/logo/1536059645650.jpg"
          },
          {
            name: "BBC",
            label: "BBC",
            thumb:
              "http://www.ebtc2c.com/back/images/cmsimg/logo/1536059645650.jpg"
          },
          {
            name: "CBC",
            label: "CBC",
            thumb:
              "http://www.ebtc2c.com/back/images/cmsimg/logo/1536059645650.jpg"
          },
          {
            name: "DBC",
            label: "DBC",
            thumb:
              "http://www.ebtc2c.com/back/images/cmsimg/logo/1536059645650.jpg"
          },
          {
            name: "CCC",
            label: "CCC",
            thumb:
              "http://www.ebtc2c.com/back/images/cmsimg/logo/1536059645650.jpg"
          },
          {
            name: "EFF",
            label: "EFF",
            thumb:
              "http://www.ebtc2c.com/back/images/cmsimg/logo/1536059645650.jpg"
          }
        ],
        BTC: [
          {
            name: "ABC",
            label: "ABC",
            thumb:
              "http://www.ebtc2c.com/back/images/cmsimg/logo/1536059645650.jpg"
          }
        ],
        ETH: [
          {
            name: "ABC",
            label: "ABC",
            thumb:
              "http://www.ebtc2c.com/back/images/cmsimg/logo/1536059645650.jpg"
          }
        ]
      },
      mainCoin: {
        i18nKey: "marketTrade",
        label: "币币交易",
        link: "/currency_trade",
        subItem: null
      },
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
            },
            {
              i18nKey: "agreement",
              label: "用户协议",
              link: "/help_center/agreement"
            }
          ]
        }
      ]
    };
  },
  destroyed() {
    this.$bus.off("mianCoin");
  },
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
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        let list = null;
        res.data && res.data.list && (list = res.data.list.slice(0));
        list.map(item => {
          item.coinid && (item.i18nKey = `${item.coinid.toLowerCase()}Market`);
        });
        this.mainCoin.subItem = mainCoinModel.maincoin = list;
        mainCoinModel.coinid = list[0].coinid;
        this.$bus.emit("mainCoin");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ml-25 {
  margin-left: 25px;
}
.mr-25 {
  margin-right: 25px;
}

.hd-top {
  background: $main-bg-color;
  font-size: $font-mini;
  @include textVcenter;
  span {
    display: inline-block;
    color: #fff;
  }
  .hd-top-lf {
    @include float;
    box-sizing: border-box;
    height: inherit;
    width: 65%;
    padding-left: 30px;
    .iconfont {
      font-size: 12px;
    }
  }
}
.hd-body {
  @include textVcenter(60px);
  padding-left: 30px;
  .el-menu.el-menu--horizontal {
    border: none;
  }
}
.nav-bar {
  float: left;
  height: 100%;
  margin-left: 46px;
  .nav-item {
    @include float;
    font-size: $font-normal;
    transition: all 0.4s;
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
    padding: 0 23px;
    transition: all 0.4s;
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
  width: 73px;
  float: left;
  margin-top: 22px;
}
</style>
