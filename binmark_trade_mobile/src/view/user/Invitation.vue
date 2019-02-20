<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full p-rel">
      <div
        v-if="link"
        class="content p-abs abs-h-center"
      >
        <div class="qr-code">
          <vueQr
            :size='size'
            :text='link'
            margin='10'
          />
        </div>
        <div class="color-666 font-14 txt-center">扫一扫邀请好友</div>
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
      scale: 0.5,
      link: ""
    };
  },
  mounted() {
    this.size = Math.ceil(window.innerWidth * this.scale);
    // getShareCode().then(res => {
    //   this.link = res[0];
    // });
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 80%;
  bottom: 15%;
  border-radius: 4px;
  background: #fff;
  padding: 40px 0;
  .qr-code {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>