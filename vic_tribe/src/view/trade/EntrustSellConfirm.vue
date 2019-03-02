<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <div class="order-info">
        <van-cell
          title="数量"
          title-class='color-666'
          :value='moneyNum'
        ></van-cell>
        <van-cell
          title="金额"
          title-class='color-666'
          :value='tradePrice'
        ></van-cell>
      </div>
      <div class="container">
        <div class="input-group">
          <span class="label font-14">交易密码</span>
          <van-field
            v-model="paypass"
            :border='false'
            placeholder='请输入交易密码'
          ></van-field>
          <div class="van-hairline--top"></div>
        </div>
        <button
          :disabled="disabled"
          @touchend='onSubmit'
          class="btn-block btn-large btn-dark btn-radius"
        >确定卖出</button>
      </div>
    </div>
  </div>
</template>
<script>
import { matchingCoinTrade } from "@/vuexStore/tradeController.js";
export default {
  data() {
    return {
      id: "",
      tradePrice: "",
      moneyNum: "",
      payPass: ""
    };
  },
  computed: {
    disabled() {
      if (!this.tradePrice || !this.moneyNum || !this.payPass) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    let { id, tradePrice, moneyNum } = this.$route.query;
    this.tradePrice = tradePrice;
    this.moneyNum = moneyNum;
    this.id = id;
  },
  methods: {
    onSubmit() {
      this.id && matchingCoinTrade(this.id, this.payPass);
    }
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.app-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.order-info {
  background: #fff;
  margin-top: $gap;
}
.container {
  background: #fff;
  margin-top: $gap;
  padding: $gap;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .label {
    color: #444;
  }
  .van-field {
    padding-left: 0;
    padding-right: 0;
    margin-top: 8px;
  }
}
</style>