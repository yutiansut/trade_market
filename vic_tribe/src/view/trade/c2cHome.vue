<template>
  <div class="app-body overflow-y">
    <van-tabs
      sticky
      v-model="active"
      @change='onTabChange'
      line-width='40'
      color='#333'
    >
      <van-tab title="买入">
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
            ></van-field>
          </van-cell-group>
          <div class="btn-wrap">
            <button
              @touchend='pubCoinTrade'
              :disabled='disabled'
              class="btn-block btn-active btn-large btn-danger btn-radius"
            >买入</button>
          </div>
        </form>
      </van-tab>
      <van-tab title="卖出">
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
            ></van-field>
            <van-field
              type="password"
              v-model="payPass"
              placeholder='输入支付密码'
            >
            </van-field>
          </van-cell-group>
          <div class="btn-wrap">
            <button
              @touchend='pubCoinTrade'
              :disabled='disabled||payPass==""'
              class="btn-block btn-active btn-large btn-success btn-radius"
            >卖出</button>
          </div>
        </form>
      </van-tab>
      <van-tab title="待交易">
        <div class="list-container mt">
          <template v-if='pendingTradeList.length>0'>
            <div
              v-for='item in pendingTradeList'
              :key='item.id'
              class="list-item"
            >
              <div class="list-header h-45 van-hairline--bottom font-16">
                <span>{{item.customerName}}</span>
                <span class="amount">{{item.customerPhone|encryptPhone}}</span>
              </div>
              <div class="list-body font-14">
                <div class="row flex flex-between">
                  <div class="col">价格：{{item.tradePrice}}</div>
                  <div class="col color-666">数量：{{item.moneyNum}}</div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">总计：{{item.moneyNum*item.tradePrice}}</div>
                  <div class="col color-666">时间：{{item.createTime|formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
                </div>
              </div>
              <div class="van-hairline--top"></div>
              <div class="list-footer h-45">
                <button class="btn-small color-danger btn-radius">撤单</button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
        </div>
      </van-tab>
      <van-tab title="交易中">
        <div class="list-container mt">
          <template v-if='tradingList.length>0'>
            <div
              v-for='item in tradingList'
              :key='item.id'
              class="list-item"
            >
              <div class="list-header h-45 van-hairline--bottom font-16">
                <span>{{item.customerName}}</span>
                <span class="amount">{{item.customerPhone|encryptPhone}}</span>
              </div>
              <div class="list-body font-14">
                <div class="row flex flex-between">
                  <div class="col">价格：{{item.tradePrice}}</div>
                  <div class="col color-666">数量：{{item.moneyNum}}</div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">总计：{{item.moneyNum*item.tradePrice}}</div>
                  <div class="col color-666">时间：{{item.createTime|formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
                </div>
              </div>
              <div class="van-hairline--top"></div>
              <div class="list-footer h-45">
                <span class="status status-1">{{statusMap['status_'+item.tradeStatus]}}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div class="list-container mt">
          <template v-if='doneList.length>0'>
            <div
              v-for='item in doneList'
              :key='item.id'
              class="list-item"
            >
              <div class="list-header h-45 van-hairline--bottom font-16">
                <span>{{item.customerName}}</span>
                <span class="amount">{{item.customerPhone|encryptPhone}}</span>
              </div>
              <div class="list-body font-14">
                <div class="row flex flex-between">
                  <div class="col">价格：{{item.tradePrice}}</div>
                  <div class="col color-666">数量：{{item.moneyNum}}</div>
                </div>
                <div class="row flex flex-between">
                  <div class="col">总计：{{item.moneyNum*item.tradePrice}}</div>
                  <div class="col color-666">时间：{{item.createTime|formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
                </div>
              </div>
              <div class="van-hairline--top"></div>
              <div class="list-footer h-45">
                <span class="status status-1">{{statusMap['status_'+item.tradeStatus]}}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">暂无数据</div>
          </template>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 市场挂单 -->
    <div
      v-show="active<=1"
      class="market-order"
    >
      <div class="text-bar font-14 color-666">
        <span class="font-bold">市场挂单</span>（只显示在线商家）
      </div>
      <div class="list-container">
        <template v-if='tradeHallData.length>0'>
          <div
            v-for='item in tradeHallData'
            :key='item.id'
            class="list-item"
          >
            <div class="list-header h-45 van-hairline--bottom font-16">
              <span>{{item.customerName}}</span>
              <span class="amount">{{item.customerPhone|encryptPhone}}</span>
            </div>
            <div class="list-body font-14">
              <div class="row flex flex-between">
                <div class="col">价格：{{item.tradePrice}}</div>
                <div class="col color-666">数量：{{item.moneyNum}}</div>
              </div>
              <div class="row flex flex-between">
                <div class="col">总计：{{item.moneyNum*item.tradePrice}}</div>
                <div class="col color-666">时间：{{item.createTime|formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
              </div>
            </div>
            <div class="van-hairline--top"></div>
            <div class="list-footer h-45">
              <button
                @touchend='toConfirmPage(item)'
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
</template>
<script>
import {
  selectIndexData,
  pushCoinTradeInfo,
  selectMoneyTradeList,
  matchingMoneyTrade,
  selectMyMoneyTrade,
  selectMyMoneyTrading,
  selectMyMoneyTradeList,
  cancleMyMoneyTradeById
} from "@/vuexStore/tradeController.js";
import { removeItemById } from "../../assets/js/Utils.js";
export default {
  data() {
    return {
      active: 0,
      marketVal: {},
      tradePrice: "",
      tradeHallData: [],
      pendingTradeList: [],
      tradingList: [],
      doneList: [],
      moneyNum: "",
      searchVal: "",
      pageNo: 0,
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
      this.getTradeHallList();
    },
    toPage(status, page, pageSize, id) {
      let params = { page, pageSize, id };
      this.navigateTo("/trade/c2c_pending_order", params);
    },
    cancelOrder(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认撤单？"
        })
        .then(res => {
          cancleMyMoneyTradeById(id).then(res => {
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
      this.pageNo = 0;
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
      selectMoneyTradeList(
        this.tradeType,
        this.searchVal,
        this.pageNo,
        this.pageSize
      ).then(res => {
        if (res) {
          this.tradeHallData = res.list;
          this.pageNo = res.currentPageNo;
          this.pageCount = res.pageCount;
        }
      });
    },
    //待匹配数据
    getToMatchList() {
      selectMyMoneyTrade(0).then(res => {
        if (res) this.pendingTradeList = res;
      });
    },
    //交易中数据
    getTradingList() {
      selectMyMoneyTrading().then(res => {
        if (res) this.tradingList = res;
      });
    },
    //交易完成列表
    getDoneList() {
      selectMyMoneyTradeList(this.pageNo, this.pageSize).then(res => {
        if (res) this.doneList = res.list;
      });
    },
    toConfirmPage(item) {
      if (item.tradeType == 1) {
        //买入
        this.navigateTo("/c2c/confirm", {
          id: item.id,
          tradePrice: item.tradePrice,
          moneyNum: item.moneyNum,
          tradeType: item.tradeType
        });
      } else {
        this.navigateTo("/c2c/confirm", {
          id: item.id,
          tradePrice: item.tradePrice,
          moneyNum: item.moneyNum,
          tradeType: item.tradeType
        });
      }
    },
    //买入/卖出操作
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
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$gap: 1rem;
.mt {
  margin-top: 1rem;
}
.text-bar {
  @include textVcenter(40px);
  padding: 0 $gap;
}
.btn-wrap {
  margin-top: $gap;
  padding: 0 $gap;
}
.list-item {
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
  .status-1 {
    border-color: $color-success;
    color: $color-success;
  }
}
</style>
