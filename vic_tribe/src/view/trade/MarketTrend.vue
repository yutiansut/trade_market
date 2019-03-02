<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body overflow-y h-full">
      <div class="k-map">
        <div class="k-map-header flex flex-between">
          <span class="font-15 font-bold">行情（H）</span>
          <div class="market-val font-12 color-666">
            市值（$）<span
              class="color-danger"
              v-text="marketVal.dollarRate"
            ></span>
            市值（￥）<span
              class="color-danger"
              v-text="marketVal.moneyRate"
            ></span>
          </div>
        </div>
        <!-- 折线图 -->
        <div class="k-map-container">
          <template v-if="marketVal.tables && marketVal.tables.Market">
            <chart :chartData='marketVal.tables.Market' />
          </template>
        </div>
      </div>
      <div class="k-map">
        <div class="k-map-header flex flex-between">
          <span class="font-15 font-bold">交易量（V）</span>
          <div class="market-val font-12 color-666">
            市值（$）<span
              class="color-danger"
              v-text="marketVal.dollarRate"
            ></span>
            市值（￥）<span
              class="color-danger"
              v-text="marketVal.moneyRate"
            ></span>
          </div>
        </div>
        <!-- 折线图 -->
        <div class="k-map-container">
          <template v-if="marketVal.tables && marketVal.tables.coinColume">
            <chart :chartData='marketVal.tables.coinColume' />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "../../components/charts/EctLine";
import { selectIndexData } from "@/vuexStore/tradeController.js";
export default {
  components: { Chart },
  data() {
    return {
      marketVal: {}
    };
  },
  mounted() {
    selectIndexData().then(res => {
      if (res) {
        console.log(res);
        this.marketVal = res;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.app-body {
  margin-top: 1rem;
  background: #fff;
}
.k-map {
  padding-bottom: $gap;
}
.k-map-header {
  @include textVcenter(45px);
  padding: 0 $gap;
}
.market-val {
  span:first-child {
    margin-right: $gap;
  }
}
</style>