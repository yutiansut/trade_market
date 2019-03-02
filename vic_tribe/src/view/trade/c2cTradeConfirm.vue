<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-cell-group>
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
        <van-field
          v-if="tradeType==2"
          v-model="paypass"
          :border='false'
          placeholder='请输入交易密码'
        ></van-field>
      </van-cell-group>
      <div class="btn-wrap">
        <button
          @touchend='onSubmit'
          class="btn btn-block btn-large btn-dark btn-radius"
          v-text='tradeType==1?"买入":"卖出"'
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import { matchingMoneyTrade } from "@/vuexStore/tradeController.js";
export default {
  data() {
    return {
      tradeType: "",
      moneyNum: "",
      tradePrice: "",
      payPass: "",
      id: ""
    };
  },
  mounted() {
    let { id, tradePrice, moneyNum, tradeType } = this.$route.query;
    this.tradePrice = tradePrice;
    this.moneyNum = moneyNum;
    this.tradeType = tradeType;
    this.id = id;
  },
  methods: {
    onSubmit() {
      if (this.tradeType == 2) {
        this.id && matchingMoneyTrade(this.id, this.payPass);
      } else {
        this.id && matchingMoneyTrade(this.id);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-wrap {
  padding: 0 15px;
  margin-top: 30px;
}
</style>