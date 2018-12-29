<template>
  <div class="footer">
    <div class="ft-body">
      <div class="ft-lf">
        <dl
          v-for="(item,i) in footerNavList"
          :key='i'
          class="ft-nav"
        >
          <dt v-text="$t(item.i18nKey)||item.title"></dt>
          <dd
            v-for="(itemIn,j) in item.items"
            :key='j'
          >
            <a
              v-if="itemIn.label=='用户协议'"
              target="view_window"
              :href="itemIn.link"
              v-text="$t(itemIn.i18nKey)||itemIn.label"
            >
            </a>
            <router-link
              v-else
              :to='itemIn.link'
              v-text="$t(itemIn.i18nKey)||itemIn.label"
            >
            </router-link>
          </dd>
        </dl>
      </div>
      <div class="ft-rt">
        <ul>
          <li class="social-link">
            <router-link
              class="foot-logo p-rel"
              to='/'
            >
              <img
                :src="logo"
                alt="logo"
              >
            </router-link>
            <router-link
              class="ml-0"
              to='/Binmarkxqc@gmail.com'
            ><i class="iconfont icon-icon"></i></router-link>
            <router-link to='/'><i class="iconfont icon-zhifeiji"></i></router-link>
            <router-link to='/Binmarkxqc@gmail.com'><i class="iconfont icon-email"></i></router-link>
            <router-link to='Binmarkxqc@gmail.com'><i class="iconfont icon-facebook"></i></router-link>
          </li>
          <li class="font-14">CopyRight&nbsp;2015-2018&nbsp;
            <em v-text="$t('copyRight')"></em>&nbsp;
            <em v-text="$t('ISP')"></em>：156159948
          </li>
          <li>
            <div
              class="warning"
              v-text="$t('riskWarning')"
            ></div>
          </li>
        </ul>
        <div class="qr-code">
          <vue-qr
            v-if="qrcode"
            :text="qrcode"
            :margin="10"
            :size="150"
          >
          </vue-qr>
          <span v-text="$t('appDownLoad')||'扫码下载App'"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueQr from "vue-qr";
export default {
  name: "my-footer",
  components: { VueQr },
  data() {
    return {
      footerNavList: [
        {
          i18nKey: "aboutUs",
          title: "关于XX网",
          items: [
            {
              i18nKey: "aboutCompany",
              label: "关于公司",
              link: "/help_center/about"
            },
            {
              i18nKey: "contact",
              label: "联系我们",
              link: "/help_center/contact"
            },
            {
              i18nKey: "ruleOfTrans",
              label: "交易规则",
              link: "/help_center/rules"
            },
            {
              i18nKey: "userAuth",
              label: "用户认证",
              link: "/account/identify"
            }
          ]
        },
        {
          i18nKey: "currencyIntro",
          title: "资产介绍",
          items: [
            {
              i18nKey: "USDT",
              label: "USDT（太达币）",
              link: "/help_center/currency_intro"
            },
            {
              i18nKey: "ETH",
              label: "ETH（以太坊）",
              link: "/help_center/currency_intro"
            },
            {
              i18nKey: "BTC",
              label: "BTC（比特币）",
              link: "/help_center/currency_intro"
            },
            {
              i18nKey: "BTH",
              label: "BTH（比特现金）",
              link: "/help_center/currency_intro"
            }
          ]
        },
        {
          i18nKey: "faqCenter",
          title: "问题中心",
          items: [
            {
              i18nKey: "rate",
              label: "费率标准",
              link: "/help_center/fee"
            },
            {
              i18nKey: "faqCenter",
              label: "常见问题",
              link: "/help_center/faq"
            },
            {
              i18nKey: "agreement",
              label: "用户协议",
              link: "http://47.95.213.181/binmark/static/services.pdf"
            },
            {
              i18nKey: "currencyProfile",
              label: "币种资料",
              link: "/help_center/currency_intro"
            }
          ]
        },
        {
          i18nKey: "helpCenter",
          title: "帮助中心",
          items: [
            {
              i18nKey: "legalStatement",
              label: "法律声明",
              link: "/help_center/law"
            },
            {
              i18nKey: "privacy",
              label: "隐私条款",
              link: "/help_center/privacy"
            },
            {
              i18nKey: "riskStament",
              label: "风险披露声明",
              link: "/help_center/risk"
            }
          ]
        }
      ],
      logo: require("@/assets/images/footer/bottom_logo.png"),
      qrcode: "../../static/download.html"
    };
  },
  mounted() {
    if (this.qrcode) return false;
    this.$bus.on("qrCodeLoad", url => {
      url && (this.qrcode = url);
    });
  }
};
</script>
<style lang="scss" scoped>
$footer-font-color: #fff;
.footer {
  // height: 300px;
  margin-top: 89px;
  box-sizing: border-box;
  background: $bg-dark;
  width: 100%;
  .ft-body {
    @include minWidth;
    overflow: hidden;
    width: 77%;
    padding: 30px 0;
    @include hCenter;
  }
  .ft-lf {
    overflow: hidden;
    width: 54%;
    @include float;
  }
  .ft-nav {
    @include float;
    margin-left: 106px;
    &:first-child {
      margin-left: 0;
    }
    dt {
      font-weight: 600;
      margin-bottom: 25px;
      font-size: 15px;
      color: $footer-font-color;
    }
    dd {
      font-size: 14px;
      color: #999;
      @include textVcenter(26px);
      &:hover {
        color: $footer-font-color;
      }
    }
  }
  .ft-rt {
    color: #666;
    margin-left: 54%;
    ul {
      width: 70%;
      float: left;
    }
    li {
      margin-top: 15px;
      &:first-child {
        margin-top: 0;
        color: $footer-font-color;
      }
    }
    .warning {
      font-size: 13px;
      @include float;
      line-height: 1.8;
      text-align: justify;
    }
    .qr-code {
      margin-left: 75%;
      text-align: center;
      font-size: $font-default;
      img {
        display: block;
        margin: 12px auto;
        width: 150px;
        height: 150px;
      }
    }
  }
  .social-link {
    a {
      display: inline-block;
      margin-left: 10%;
      transition: all 0.3s;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        color: $main-bg-color;
      }
    }
    .ml-0 {
      margin-left: 0;
    }
    .foot-logo {
      margin-right: 61px;
      float: left;
      top: 4px;
    }
    .iconfont {
      font-size: $font-ex-large !important;
    }
  }
}
</style>