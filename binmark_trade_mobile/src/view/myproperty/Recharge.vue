<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div v-if="address" class="content van-hairline--top app-body h-full">
      <div class="qr-code flex flex-h-center">
        <vue-qr :callback="codeComplete" :text="address" margin="10" dotScale="1" size="180"></vue-qr>
      </div>
      <div class="text font-14 font-bold txt-center">
        <span class="riple">长按二维码可保存</span>
      </div>
      <p class="charge-address font-15 txt-center">{{address}}</p>
      <div class="text font-14 font-bold txt-center">
        <span v-clipboard:copy="address" v-clipboard:success="onCopy" class="riple">复制地址</span>
      </div>
    </div>
    <div v-else class="h-full flex flex-v-center flex-h-center font-16 color-999">暂无数据</div>
  </div>
</template>
<script>
import vueQr from "vue-qr";
import { getRechargeAddr } from "@/vuexStore/storeService.js";
export default {
  components: { vueQr },
  data() {
    return {
      address: ""
    };
  },
  mounted() {
    let { coin } = this.$route.query;
    getRechargeAddr(coin).then(res => {
      if (res.address[0]) this.address = res.address;
    });
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