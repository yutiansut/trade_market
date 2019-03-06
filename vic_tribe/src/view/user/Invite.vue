<template>
  <div
    :style="{backgroundImage:'url('+assetConfig.bg+')'}"
    class="app-main wh-full"
  >
    <my-header></my-header>
    <div class="app-body p-rel h-full">
      <div
        :style="{backgroundImage:'url('+assetConfig.qrcodeBg+')'}"
        class="content abs-h-center"
      >
        <div class="tip font-16 color-999 txt-center">扫描二维码下载APP</div>
        <div class="qr-code">
          <vue-qr
            :text="qrUrl"
            margin="10"
            dotScale="1"
            size="120"
          ></vue-qr>

        </div>
        <div class="rec-code abs-h-center flex flex-v-center font-14">
          <div>我的推荐</div>
          <div class="line"></div>
          <div
            class="code"
            v-text="this.$store.state.userInfo.customerName"
          ></div>
          <div
            v-clipboard:copy="this.$store.state.userInfo.customerName"
            v-clipboard:success="onCopy"
            class="btn-copy p-abs abs-v-center"
          >
            <img :src="assetConfig.btnCopy">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueQr from "vue-qr";
import { selectCustomer } from "../../vuexStore/customerController.js";
import apiConfig from "../../config/apiConfig.js";
export default {
  components: { vueQr },
  data() {
    const assetConfig = {
      bg: require("@/assets/images/invite/bj.png"),
      qrcodeBg: require("@/assets/images/invite/k.png"),
      btnCopy: require("@/assets/images/invite/fz.png")
    };
    return {
      assetConfig: assetConfig
    };
  },
  mounted() {
    selectCustomer();
  },
  computed: {
    qrUrl() {
      return `${apiConfig.qrUrl}?parentPhone=${
        this.$store.state.userInfo.customerName
      }`;
    }
  },
  methods: {
    onCopy() {
      this.$toast("复制成功");
    }
  }
};
</script>
<style lang="scss" scoped>
.app-main {
  background-repeat: no-repeat;
  background-size: cover;
}
.content {
  width: 77.87%;
  height: 48.96%;
  bottom: 4rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  .qr-code {
    width: 120px;
    height: 120px;
    margin: 20px auto auto;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid #e5e5e5;
  }
  .tip {
    letter-spacing: 1px;
    margin-top: 50px;
  }
  .rec-code {
    bottom: 45px;
    @include textVcenter(40px);
    border: 1px solid #eee;
    color: #555;
    box-sizing: border-box;
    width: 77%;
    padding-left: 10px;
    margin: 0 auto;
  }
  .code {
    margin-left: 1rem;
  }
  .line {
    height: 1.5rem;
    margin-left: 1rem;
    border-left: 1px solid #ddd;
  }
  .btn-copy {
    width: 40px;
    height: 40px;
    right: -1px;
    img {
      width: 100%;
    }
  }
}
</style>