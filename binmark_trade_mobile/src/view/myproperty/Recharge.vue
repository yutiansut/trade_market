<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="content van-hairline--top app-body h-full">
      <div class="qr-code flex flex-h-center">
        <vue-qr
          :callback='codeComplete'
          :text='address'
          margin='10'
          dotScale='1'
          size='180'
        ></vue-qr>
      </div>
      <div class="text font-14 font-bold txt-center"><span class="riple">长按二维码可保存</span></div>
      <p class="charge-address font-15 txt-center">{{address}}</p>
      <div class="text font-14 font-bold txt-center"><span
          v-clipboard:copy="address"
          v-clipboard:success='onCopy'
          class="riple"
        >复制地址</span></div>
    </div>
  </div>
</template>
<script>
import vueQr from "vue-qr";
export default {
  components: { vueQr },
  data() {
    return {
      address: "1ANJ79WBF6Ceuk6ffpd2L5org7xjYvbw6"
    };
  },
  methods: {
    codeComplete(data, id) {
      console.log(data);
    },
    onCopy(e) {
      this.$toast.success("复制成功");
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  background: #fff;
  .qr-code {
    padding-top: 2.5rem;
    overflow: hidden;
  }
  .text {
    color: #3388ff;
    margin-top: 1.85rem;
  }
  .charge-address {
    margin-top: 3rem;
  }
}
</style>