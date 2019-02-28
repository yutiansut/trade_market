<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-tabs
        sticky
        v-model="active"
        line-width='40'
        color='#333'
      >
        <van-tab title="买入">
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
            <chart />
          </div>
          <div class="form-panel">
            <div class="text-bar font-14 color-danger">1 VIC 折合&nbsp;{{marketVal.ratioRate}}&nbsp;余额</div>
            <form @submit.prevent>
              <van-cell-group>
                <van-field
                  v-model="moneyNum"
                  placeholder='数量'
                >
                </van-field>
                <van-field
                  v-model="tradePrice"
                  placeholder='金额'
                >
                </van-field>
              </van-cell-group>
              <div class="btn-wrap">
                <button
                  @touchen='pubBuyOrder'
                  :disabled='disabled'
                  class="btn-block btn-active btn-large btn-danger btn-radius"
                >买入</button>
              </div>
            </form>
          </div>
        </van-tab>
        <van-tab title="卖出">
          <div class="k-map-header flex flex-between">
            <span class="font-15 font-bold">行情(H)</span>
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
            <chart />
          </div>
          <div class="form-panel">
            <div class="text-bar font-14 color-danger">CNYD折合&nbsp;1&nbsp;CNY</div>
            <form @submit.prevent>
              <van-cell-group>
                <van-field
                  v-model="moneyNum"
                  placeholder='数量'
                >
                </van-field>
                <van-field
                  v-model="tradePrice"
                  placeholder='金额'
                >
                </van-field>
              </van-cell-group>
              <div class="btn-wrap">
                <button
                  @touchen='pubSellOrder'
                  :disabled='disabled'
                  class="btn-block btn-active btn-large btn-success btn-radius"
                >卖出</button>
              </div>
            </form>
          </div>
        </van-tab>
        <van-tab title="我的订单"></van-tab>
        <van-tab title="历史订单"></van-tab>
      </van-tabs>
      <!-- 交易大厅 -->
      <div class="trade-panel">
        <div class="panel-head">
          <div class="title font-16 font-bold">交易大厅</div>
          <div class="search-box flex flex-between flex-v-center">
            <label class="flex flex-between">
              <van-icon
                size='16px'
                name='search'
              ></van-icon>
              <input
                class="font-14"
                type="text"
                placeholder="请输入对方账号进行查找"
              >
            </label>
            <button class="btn-dark btn-active font-15 btn-radius">搜索</button>
          </div>
        </div>
        <div
          v-show="active<1"
          class="panel-body"
        >
          <div class="list-item flex flex-between">
            <div class="item-left">
              <van-row class="font-16">
                <van-col span='14'>李某某</van-col>
                <van-col span='10'>￥4894</van-col>
              </van-row>
              <van-row class="font-14">
                <van-col span='14'>数量:1</van-col>
                <van-col span='10'>价格:￥1</van-col>
              </van-row>
              <van-row class="font-14">
                <van-col span='14'>日期:2018-8-8</van-col>
                <van-col span='10'>总计:￥44959</van-col>
              </van-row>
            </div>
            <div class="item-right flex flex-h-center flex-v-center">
              <button class="btn btn-danger btn-active font-14">买入</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "../../components/charts/EctLine";
import {
  selectIndexData,
  pushCoinTradeInfo
} from "@/vuexStore/tradeController.js";
export default {
  components: { Chart },
  data() {
    return {
      active: 0,
      marketVal: {},
      tradePrice: "",
      moneyNum: ""
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    disabled() {
      if (!this.tradePrice || !this.moneyNum) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async loadData() {
      let marketVal = await selectIndexData();
      marketVal && (this.marketVal = marketVal);
    },
    pubBuyOrder() {
      pushCoinTradeInfo();
    },
    pubSellOrder() {}
  },
  watch: {
    active() {
      this.tradePrice = "";
      this.moneyNum = "";
    }
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.mt {
  margin-top: $gap;
}
.k-map {
  padding-bottom: $gap;
  background: #fff;
}
.k-map-header {
  @include textVcenter(45px);
  padding: 0 $gap;
  background: #fff;
}
.market-val {
  span:first-child {
    margin-right: $gap;
  }
}
.form-panel {
  background: #fff;
  padding-bottom: $gap;
  .text-bar {
    @include textVcenter(40px);
    padding: 0 $gap;
  }
  .btn-wrap {
    margin-top: $gap;
    padding: 0 $gap;
  }
}
.trade-panel {
  margin-top: $gap;
  .panel-body {
    padding: $gap;
  }
  .panel-head {
    background: #fff;
    padding: 20px $gap $gap;
  }
  .title {
    margin-bottom: $gap;
  }
}
.search-box {
  height: 40px;
  button {
    width: 60px;
    height: 100%;
    margin-left: 1rem;
  }
  .van-icon {
    color: #999;
    margin: 12px 10px 10px;
    float: left;
  }
  label {
    display: block;
    overflow: hidden;
    height: 100%;
    flex: 1;
    background: #eee;
    border-radius: 2px;
  }
  input {
    background: transparent;
    height: 100%;
    border: none;
  }
}
.list-item {
  overflow: hidden;
  padding: 20px 0 $gap $gap;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  &:not(:first-child) {
    margin-top: 1rem;
  }
  .item-left {
    width: 73.76%;
  }
  .van-row {
    line-height: 1;
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
  .item-right {
    width: 26.24%;
  }
  .btn {
    width: 4rem;
    @include textVcenter(4rem);
    border-radius: 4rem;
  }
}
</style>