<template>
  <div class="hd-top-rt flex flex-end">
    <div
      ref="dropDown"
      class="download-app drop-down p-rel"
    >
      <span>
        <em v-text="$t('appDownLoad')"></em>
        <i class="iconfont icon-xiala fr"></i>
        <div
          :style='{"top":dropDownTop}'
          class="drop-down-item abs-h-center"
        >
          <span v-text="$t('scanToDownLoad')"></span>
          <vue-qr
            :text="qrUrl"
            :margin="10"
            :size="150"
          >
          </vue-qr>
        </div>
      </span>
    </div>
    <div
      v-if='userData.isLogin'
      class="opration-wrap flex flex-end"
    >
      <span>
        <i class="iconfont icon-zichan fl"></i>
        <span
          @click="navigateTo('/property')"
          v-text="$t('assets')"
        >
        </span>
      </span>
      <div
        ref='dropDown'
        class="drop-down p-rel"
      >
        <span>
          <i class="iconfont icon-dingdan fl"></i>
          <em v-text="$t('order')"></em>
          <i class="iconfont icon-xiala fr"></i>
        </span>
        <ul
          :style='{"top":dropDownTop}'
          class="drop-down-item lf-0"
        >
          <li
            v-for='(item,i) in myOrderDropdown'
            :key='i'
            v-text="$t(item.i18nKey)||item.label"
            @click='dropDownHandle(item.link)'
          >
          </li>
        </ul>
      </div>
      <div
        ref='dropDown'
        class="drop-down p-rel"
      >
        <span>
          <i class="iconfont icon-yonghu fl"></i>
          <em v-text="member"></em>
          <i class="iconfont icon-xiala fr"></i>
        </span>
        <ul
          :style='{"top":dropDownTop}'
          class="drop-down-item lf-0"
        >
          <li
            v-for='(item,i) in userDropDown'
            :key='i'
            v-text="$t(item.i18nKey)||item.label"
            @click='dropDownHandle(item.link)'
          >
          </li>
          <li
            @click="logout"
            v-text="$t('logout')||'退出登录'"
          ></li>
        </ul>
      </div>
    </div>
    <div
      v-else
      class="opration-wrap"
    >
      <span
        @click="navigateTo('/user/login')"
        v-text='$t("login")'
      ></span>
      <button
        @click="navigateTo('/user/register')"
        v-text="$t('register')"
      ></button>
    </div>
    <div class="lang-selection drop-down p-rel">
      <span class="flex flex-between flex-v-center">
        <i class="iconfont icon-duoyuyan m-right-10"></i>
        <em v-text='$t("language")'></em>
        <i class="iconfont icon-xiala fr"></i>
      </span>
      <ul
        :style='{"top":dropDownTop}'
        ref='dropDown'
        class="drop-down-item rt-0"
      >
        <li
          v-for="(item,i) in langList.items"
          :key='i'
          v-text="item.label"
          @click='selectLang(i)'
        >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import VueQr from "vue-qr";
export default {
  name: "login-bar",
  components: { VueQr },
  data() {
    return {
      userData: this.userModel,
      dropDownTop: 0,
      qrUrl: "http://www.binmark.io/static/download.html",
      myOrderDropdown: [
        {
          label: "账单明细",
          i18nKey: "billDetail",
          link: "/my/order_detail"
        },
        {
          label: "我的委托",
          i18nKey: "myEntrustment",
          link: "/my/entrustment"
        },
        {
          label: "交易记录",
          i18nKey: "transRecord",
          link: "/my/deal_history"
        },
        {
          label: "OTC记录",
          i18nKey: "otcRecord",
          link: "/my/otc_history"
        },
        {
          label: "CTC记录",
          i18nKey: "ctcRecord",
          link: "/my/c2c_history"
        }
      ],
      userDropDown: [
        {
          label: "安全中心",
          i18nKey: "securityCenter",
          link: "/account/security",
          icon: ""
        },
        {
          label: "身份认证",
          i18nKey: "identify",
          link: "/account/identify",
          icon: ""
        },
        {
          i18nKey: "label111",
          label: "提交工单",
          link: "/account/work_order",
          icon: ""
        }
      ],
      member: "",
      langList: {
        id: 0,
        items: [
          {
            val: "zh-CN",
            label: "中文简体",
            thumb: ""
          },
          {
            val: "en-US",
            label: "English",
            thumb: ""
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    const h = getComputedStyle(this.$refs.dropDown).height;
    this.dropDownTop = h;
    Object.assign(this.userData, { isLogin: this.storage.get("isLogin") });
    this.$bus.on("userLoaded", data => {
      if (data) {
        this.member = data.member;
      }
    });
    this.getVersion();
  },
  methods: {
    dropDownHandle(link) {
      this.navigateTo(link);
    },
    selectLang(i) {
      let val = this.langList.items[i].val;
      let defaultLang = this.storage.get("PCDefaultLanguage");
      if (val == defaultLang) return false;
      let loading = this.$loading({
        text: "切换中...",
        background: "rgba(0, 0, 0, 0.4)"
      });
      setTimeout(() => {
        this.langList.id = i;
        this.$i18n.locale = val;
        this.storage.set("PCDefaultLanguage", val);
        loading.close();
      }, 800);
    },
    logout() {
      this.request(this.api.logout, {
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.storage.remove("token");
          this.storage.set("isLogin", false);
          this.$bus.emit("onLogout");
          this.navigateTo("Main");
        }
      });
    },
    //获取二维码
    getVersion(type) {
      if (this.qrUrl) return false;
      this.request(this.api.version, { type: type || 0 }).then(res => {
        if (res.code == "0" && res.data && res.data.result) {
          this.qrUrl = res.data.result[0].url;
          this.$bus.emit("qrCodeLoad", this.qrUrl);
        }
      });
    }
  },
  beforeDestroy() {
    this.$bus.off("qrCodeLoad");
  }
};
</script>
<style lang="scss" scoped>
$default-color: #fff;
$ml: 25px;
.hd-top-rt {
  box-sizing: border-box;
  height: inherit;
  text-align: right;
  cursor: pointer;
  color: $default-color;
  .lang-selection {
    display: inline-block;
    margin-left: $ml;
  }
  .iconfont {
    margin: 0 4px;
  }
  button {
    box-sizing: border-box;
    padding: 0 10px;
    height: 24px;
    line-height: 22px;
    border: 1px solid #fff;
    border-radius: 12px;
    margin-left: 20px;
    cursor: pointer;
  }
  .opration-wrap {
    height: inherit;
    margin-left: $ml;
  }
}
.drop-down {
  margin-left: $ml;
  &:first-child {
    margin: 0;
  }
  i {
    font-size: $font-normal;
    @media screen and (max-width: 1366px) {
      font-size: $font-default;
    }
  }
  &:hover {
    .drop-down-item {
      display: block;
    }
  }
  .drop-down-item {
    font-size: $font-default;
    @media screen and (max-width: 1366px) {
      font-size: $font-mini;
    }
    position: absolute;
    z-index: 999;
    white-space: nowrap;
    min-width: 100%;
    background: $bg-dark;
    display: none;

    li {
      @include textVcenter;
      color: #fff;
      transition: all 0.3s;
      text-align: left;
      padding: 0 40px 0 20px;
      &:hover {
        background: $main-bg-color;
      }
    }
  }
}
.download-app {
  .drop-down-item {
    line-height: 30px;
    padding: 0 10px 10px 10px;
    text-align: center;
    width: 150px;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>

