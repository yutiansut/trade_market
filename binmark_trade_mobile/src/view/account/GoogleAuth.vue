<template>
  <div class="h-full overflow-y van-hairline--top">
    <!-- 下载 -->
    <div class="panel">
      <div class="panel-head font-16 font-bold">下载安装</div>
      <img
        class="app-logo"
        :src="assetConfig.imgs.user_google_logo"
        alt=""
      >
      <a class="download-btn color-primary riple txt-center font-15">下载安装</a>
    </div>
    <!-- 扫码 -->
    <div class="scan-code panel">
      <div class="font-16 font-bold">谷歌身份验证</div>
      <div class="warning font-14 color-999">如果你的手机丢失，被盗或秘钥被删除，你将需要此秘钥找回 你的谷歌二次验证</div>
      <div class="font-15 font-bold">秘钥</div>
      <van-row class="google-key font-14 h-45 flex flex-v-center">
        <van-col
          class="van-ellipsis"
          span='20'
        >{{keystr}}</van-col>
        <van-col
          class="txt-rt color-info"
          span='4'
          v-clipboard:copy="keystr"
          v-clipboard:success="onCopy"
        >复制</van-col>
      </van-row>
      <!-- 二维吗区域 -->
      <div class="qr-code txt-center">
        <vue-qr
          :text='googlekey'
          size='175'
          margin='5'
        />
        <div class="font-15 font-bold">扫码二维码</div>
      </div>
      <div class="warning font-14 color-999">请确保你已备份密钥。如果你的手机丢失、被盗或密钥被删除，你将需要此密钥找回你的谷歌二次验证。否则重置你的谷歌二次验证需要提交工</div>
    </div>
    <!-- 表单 -->
    <form
      @submit.prevent="onSubmit"
      class="panel"
    >
      <div class="panel-head font-16 font-bold">完成绑定</div>
      <div class="form-group">
        <div class="label color-666 font-14">登录密码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="password"
            type="password"
            autocomplete="off"
            class="h-35"
            placeholder="请输入登录密码"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">谷歌验证码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="googlecode"
            autocomplete="off"
            class="h-35"
            placeholder="请输入谷歌验证码"
          >
        </div>
      </div>
      <button
        :disabled='disabled'
        class="btn-large btn-block riple btn-primary"
      >确定</button>
    </form>
  </div>
</template>
<script>
import vueQr from "vue-qr";
import { getGoogleKey, bindGoogle } from "@/vuexStore/storeService.js";
export default {
  components: { vueQr },
  data() {
    return {
      googlekey: "",
      password: "",
      googlecode: ""
    };
  },
  mounted() {
    getGoogleKey().then(res => {
      this.googlekey = res;
    });
  },
  computed: {
    keystr() {
      return this.googlekey.substr(this.googlekey.indexOf("=") + 1);
    },
    disabled() {
      if (!this.password || !this.googlecode) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async onSubmit() {
      let res = await bindGoogle({
        googlekey: this.keystr,
        password: this.password,
        googlecode: this.googlecode
      });
      if (res) {
        this.navigateTo("/account");
      }
    },
    onCopy() {
      this.$toast("复制成功");
    }
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.container {
  background: inherit;
}
.panel {
  overflow-x: hidden;
  background: #fff;
  margin-top: $gap;
  .panel-head {
    margin-top: 1.25rem;
    padding: 0 $gap;
  }
}
.scan-code {
  padding: $gap 1.25rem $gap;
  > div:not(:first-child) {
    margin-top: 1.25rem;
  }
  .warning {
    line-height: 1.8;
  }
  .google-key {
    padding: $gap;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    background: #f2f2f2;
  }
}
.qr-code {
  div:first-child {
    padding: 20px 0;
  }
}
.download-btn {
  display: block;
  margin: 0 auto 1.25rem auto;
  width: 8.25rem;
  border-radius: 0.2rem;
  @include textVcenter(35px);
  border: 1px solid $color-primary;
}
.app-logo {
  display: block;
  width: 8.25rem;
  margin: 0.84rem auto;
}
.form-group {
  margin-top: 1rem;
}

button {
  margin: 3.3rem auto 0.85rem auto;
  width: calc(100% - 2rem);
}
</style>