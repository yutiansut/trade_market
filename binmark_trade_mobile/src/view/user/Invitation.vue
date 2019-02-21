<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div
      :style="{backgroundImage:'url('+assetConfig.imgs.share_bg+')'}"
      class="app-body h-full p-rel"
    >
      <div
        :style="{backgroundImage:'url('+assetConfig.imgs.share_content_bg+')'}"
        v-if="link"
        class="content p-abs abs-h-center txt-center"
      >
        <span class="share-label font-16">您的邀请码</span><br>
        <span
          class="font-30 font-bold"
          v-text="shareCode"
        ></span><br>
        <button
          v-clipboard:copy="shareCode"
          v-clipboard:success="onCopy"
          class="btn-small btn-radius riple"
        >复制</button>
        <div class="qr-code">
          <vueQr
            :size='size'
            :text='link'
            margin='5'
          />
        </div>
        <div class="font-14">邀请好友扫一扫</div>
      </div>
    </div>
  </div>
</template>
<script>
import vueQr from "vue-qr";
import { getShareCode } from "@/vuexStore/storeService.js";
export default {
  components: { vueQr },
  data() {
    return {
      size: 0,
      scale: 0.45,
      link: "",
      shareCode: ""
    };
  },
  mounted() {
    this.size = Math.ceil(window.innerWidth * this.scale);
    getShareCode().then(res => {
      this.link = res.url;
      this.shareCode = res.sharecode;
    });
  },
  methods: {
    onCopy() {
      this.$toast({
        message: "复制成功",
        position: "bottom"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-body {
  background-repeat: no-repeat;
  background-size: cover;
}
.content {
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center center;
  width: 100%;
  bottom: 4%;
  height: 72.4%;
  padding-top: 25px;
  box-sizing: border-box;
  color: #fff;
  .share-label {
    display: inline-block;
    margin-bottom: 15px;
  }
  button {
    margin-top: 15px;
    background: #d0a771;
  }
  .qr-code {
    text-align: center;
    margin-top: 24px;
    margin-bottom: 10px;
  }
}
</style>