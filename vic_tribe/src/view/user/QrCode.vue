<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <div class="content">
        <div class="qr-code flex flex-h-center">
          <vue-qr
            :text="codeAddress"
            margin="10"
            dotScale="1"
            size="150"
          ></vue-qr>
        </div>
        <div
          v-clipboard:copy="codeAddress"
          class="copy-text font-14 txt-center"
        >点击复制二维码地址</div>
      </div>
      <div class="address font-14">
        <span class="color-666">地址</span>
        <span v-text="codeAddress"></span>
      </div>
    </div>
  </div>
</template>
<script>
import vueQr from "vue-qr";
export default {
  components: { vueQr },
  data() {
    return {
      codeAddress: "abdjogepkpokpfe"
    };
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin-top: 15px;
  background: #fff;
  padding: 40px 0;
  .copy-text {
    margin-top: 15px;
  }
}
.address {
  @include textVcenter(45px);
  padding: 0 1rem;
  box-sizing: border-box;
  margin-top: 15px;
  background: #fff;
  span:first-child {
    padding-right: 10px;
  }
}
</style>