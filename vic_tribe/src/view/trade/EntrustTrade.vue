<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-tabs
        sticky
        v-model="active"
        @change='onTabChange'
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
            <template v-if="marketVal.tables && marketVal.tables.Market">
              <chart :chartData='marketVal.tables.Market' />
            </template>
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
                  @click='pubCoinTrade'
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
            <template v-if="marketVal.tables && marketVal.tables.Market">
              <chart :chartData='marketVal.tables.Market' />
            </template>
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
                <van-field
                  type="password"
                  v-model="payPass"
                  placeholder='输入支付密码'
                >
                </van-field>
              </van-cell-group>
              <div class="btn-wrap">
                <button
                  @click='pubCoinTrade'
                  :disabled='disabled||payPass==""'
                  class="btn-block btn-active btn-large btn-success btn-radius"
                >卖出</button>
              </div>
            </form>
          </div>
        </van-tab>
        <van-tab title="待匹配">
          <template v-if='pendingTradeList.length>0'>
            <div
              v-for="item in pendingTradeList"
              :key='item.id'
              class="order-list-item"
            >
              <div class="list-header h-45 van-hairline--bottom font-16">
                <van-col span='14'>{{item.customerName}}</van-col>
                <span class="amount">总计：{{item.moneyNum*item.tradePrice}}</span>
              </div>
              <div class="list-body font-14">
                <div class="row flex flex-between">
                  <div class="col van-ellipsis">数量：{{item.moneyNum}}</div>
                  <div class="col color-666">
                    类型：<span class="color-danger">{{item.tradeType==1?"卖出":"买入"}}</span>
                  </div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">价格：{{item.tradePrice}}</div>
                  <div class="col color-666">时间：{{item.createTime|formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">单号：{{item.id}}</div>
                </div>
              </div>
              <div class="van-hairline--top"></div>
              <div class="list-footer van-hairline--top h-45">
                <span
                  @click='cancelOrder(item.id)'
                  class="status status-1"
                >撤单</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
        </van-tab>
        <van-tab title="交易中">
          <template v-if='tradingList.length>0'>
            <div
              @click='toPage(item.tradeStatus,item.page,item.pageSize,item.id)'
              v-for="item in tradingList"
              :key='item.id'
              class="order-list-item"
            >
              <div class="list-header h-45 van-hairline--bottom font-16">
                <van-col span='14'>{{item.tradeType==1?item.buyRealName:item.mallRealName}}</van-col>
                <span class="amount">总计：{{item.moneyNum*item.tradePrice}}</span>
              </div>
              <div class="list-body font-14">
                <div class="row flex flex-between">
                  <div class="col van-ellipsis">数量：{{item.moneyNum}}</div>
                  <div class="col color-666">
                    类型：<span class="color-danger">{{item.tradeType==1?"卖出":"买入"}}</span>
                  </div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">价格：{{item.tradePrice}}</div>
                  <div class="col color-666">时间：{{item.tradeMatchTime|formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">单号：{{item.id}}</div>
                </div>
              </div>
              <div class="van-hairline--top"></div>
              <div class="list-footer van-hairline--top h-45">
                <span class="status status-1">{{statusMap['status_'+item.tradeStatus]}}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
        </van-tab>
        <van-tab title="已完成">
          <template v-if='doneList.length>0'>
            <div
              v-for="item in doneList"
              :key='item.id'
              class="order-list-item"
            >
              <div class="list-header h-45 van-hairline--bottom font-16">
                <van-col span='14'>{{item.customerName}}</van-col>
                <span class="amount">总计：{{item.moneyNum*item.tradePrice}}</span>
              </div>
              <div class="list-body font-14">
                <div class="row flex flex-between">
                  <div class="col van-ellipsis">数量：{{item.moneyNum}}</div>
                  <div class="col color-666">
                    类型：<span class="color-danger">{{item.tradeType==1?"卖出":"买入"}}</span>
                  </div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">价格：{{item.tradePrice}}</div>
                  <div class="col color-666">时间：2018-7-7</div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">单号：{{item.id}}</div>
                </div>
              </div>
              <div class="van-hairline--top"></div>
              <div class="list-footer van-hairline--top h-45">
                <span class="status status-1">{{statusMap['status_'+item.tradeStatus]}}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
        </van-tab>
      </van-tabs>
      <!-- 交易大厅 -->
      <div
        v-show="active<=1"
        class="trade-panel"
      >
        <div class="panel-head">
          <div class="title font-16 font-bold">交易大厅</div>
          <div class="search-box flex flex-between flex-v-center">
            <label class="flex flex-between">
              <van-icon
                size='16px'
                name='search'
              ></van-icon>
              <input
                v-model="searchVal"
                class="font-14"
                type="text"
                placeholder="请输入对方账号进行查找"
              >
            </label>
            <button
              @click='toSearch'
              class="btn-dark btn-active font-15 btn-radius"
            >搜索</button>
          </div>
        </div>
        <div class="panel-body">
          <template v-if="tradeHallData.length>0">
            <div
              v-for="item in tradeHallData"
              :key='item.id'
              class="list-item flex flex-between"
            >
              <div class="item-left">
                <van-row class="font-16">
                  <van-col span='14'>{{item.customerName}}</van-col>
                  <van-col span='10'>{{item.customerPhone|encryptPhone()}}</van-col>
                </van-row>
                <van-row class="font-14">
                  <van-col span='14'>数量:{{item.tradePrice}}</van-col>
                  <van-col span='10'>价格:￥{{item.moneyNum}}</van-col>
                </van-row>
                <van-row class="font-14">
                  <van-col span='14'>日期:{{item.createTime|formatDate('yyyy-M-dd-hh')}}</van-col>
                  <van-col span='10'>总计:￥{{item.tradePrice*item.moneyNum}}</van-col>
                </van-row>
              </div>
              <div class="item-right flex flex-h-center flex-v-center">
                <button
                  @click='toConfirmPage(item)'
                  class="btn btn-danger btn-active font-14"
                >{{item.tradeType==1?"买入":"卖出"}}</button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "../../components/charts/EctLine";
import {
  selectIndexData,
  pushCoinTradeInfo,
  selectCoinTradeList,
  matchingCoinTrade,
  selectMyCoinTrade,
  selectMyCoinTrading,
  selectMyCoinTradeList,
  cancleMyCoinTradeById
} from "@/vuexStore/tradeController.js";
import { removeItemById } from "../../assets/js/Utils.js";
export default {
  components: { Chart },
  data() {
    return {
      show: false,
      active: 0,
      marketVal: {},
      tradePrice: "",
      tradeHallData: [],
      pendingTradeList: [],
      tradingList: [],
      doneList: [],
      moneyNum: "",
      searchVal: "",
      pageNo: 1,
      pageSize: 10,
      pageCount: 1,
      payPass: "",
      orderId: "",
      statusMap: {
        status_1: "待交易",
        status_2: "待支付",
        status_3: "待确认",
        status_4: "交易投诉",
        status_5: "交易取消",
        status_6: "交易完成"
      }
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    disabled() {
      if (
        !this.tradePrice ||
        !this.moneyNum ||
        isNaN(this.moneyNum) ||
        isNaN(this.tradePrice)
      ) {
        return true;
      } else {
        return false;
      }
    },
    tradeType() {
      return this.active == 0 ? 2 : 1;
    }
  },
  methods: {
    async loadData() {
      let marketVal = await selectIndexData();
      this.getTradeHallList();
      marketVal && (this.marketVal = marketVal);
    },
    toPage(status, page, pageSize, id) {
      let params = { page, pageSize, id };
      this.navigateTo("/trade/entrust_pending_order", params);
    },
    cancelOrder(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认撤单？"
        })
        .then(res => {
          cancleMyCoinTradeById(id).then(res => {
            if (res)
              this.pendingTradeList = removeItemById(id, this.pendingTradeList);
          });
        });
    },
    toSearch() {
      if (this.searchVal == "") return;
      this.pageNo = "";
      this.pageCount = 1;
      this.getTradeHallList();
    },
    onTabChange(index) {
      let that = this;
      this.tradePrice = "";
      this.moneyNum = "";
      this.pageNo = 1;
      this.pageCount = 1;
      if (index <= 1) {
        this.getTradeHallList();
      } else if (index == 2) {
        this.getToMatchList();
      } else if (index == 3) {
        this.getTradingList();
      } else if (index == 4) {
        this.getDoneList();
      }
    },
    //大厅数据
    getTradeHallList() {
      if (this.pageNo > 1 && this.pageNo >= this.pageCount) {
        this.$toast("没有更所数据了");
        return;
      }
      selectCoinTradeList(
        this.tradeType,
        this.searchVal,
        this.pageNo,
        this.pageSize
      ).then(res => {
        if (res) {
          this.tradeHallData = res.list;
          this.pageNo = res.currentPageNo;
          this.pageCount = res.pageCount;
          if (this.pageNo < this.pageCount) this.pageNo++;
        }
      });
    },
    //待匹配数据
    getToMatchList() {
      if (this.pageNo > 1 && this.pageNo >= this.pageCount) {
        this.$toast("没有更所数据了");
        return;
      }
      selectMyCoinTrade(1).then(res => {
        if (res) {
          this.pendingTradeList = res;
          this.pageNo = res.currentPageNo;
          this.pageCount = res.pageCount;
          if (this.pageNo < this.pageCount) this.pageNo++;
        }
      });
    },
    //交易中数据
    getTradingList() {
      if (this.pageNo > 1 && this.pageNo >= this.pageCount) {
        this.$toast("没有更所数据了");
        return;
      }
      selectMyCoinTrading().then(res => {
        if (res) {
          this.tradingList = res;
          this.pageNo = res.currentPageNo;
          this.pageCount = res.pageCount;
          if (this.pageNo < this.pageCount) this.pageNo++;
        }
      });
    },
    //交易完成列表
    getDoneList() {
      if (this.pageNo > 1 && this.pageNo >= this.pageCount) {
        this.$toast("没有更所数据了");
        return;
      }
      selectMyCoinTradeList(this.pageNo, this.pageSize).then(res => {
        if (res) {
          this.doneList = res.list;
          this.pageNo = res.currentPageNo;
          this.pageCount = res.pageCount;
          if (this.pageNo < this.pageCount) this.pageNo++;
        }
      });
    },
    toConfirmPage(item) {
      if (item.tradeType == 1) {
        //买入
        this.navigateTo("/trade/entrust_buy", {
          id: item.id,
          tradePrice: item.tradePrice,
          moneyNum: item.moneyNum
        });
      } else {
        this.navigateTo("/trade/entrust_sell", {
          id: item.id,
          tradePrice: item.tradePrice,
          moneyNum: item.moneyNum
        });
      }
    },
    //发布买入/卖出操作
    pubCoinTrade() {
      pushCoinTradeInfo(
        this.tradeType,
        this.moneyNum,
        this.tradePrice,
        this.payPass
      ).then(() => {
        this.tradePrice = "";
        this.moneyNum = "";
        this.payPass = "";
        this.getTradeHallList();
      });
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
.order-list-item {
  padding: 0 $gap;
  margin-top: $gap;
  &:first-child {
    margin-top: 0;
  }
  background: #fff;
  .list-footer,
  .list-header {
    display: flex;
    align-items: center;
  }
  .list-header {
    justify-content: space-between;
  }

  .list-body {
    .row {
      @include textVcenter(35px);
    }
  }
  .list-footer {
    justify-content: flex-end;
    button {
      border: 1px solid $color-danger;
    }
  }
  .status {
    height: 30px;
    line-height: 28px;
    width: 80px;
    font-size: 14px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
  }
  .status-0 {
    border-color: #eee;
    color: #999;
  }
  .status-1 {
    border-color: $color-danger;
    color: $color-danger;
  }
  .status-2 {
    border-color: $color-success;
    color: $color-success;
  }
}
</style>