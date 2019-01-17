<template>
  <div class="wh-full app-body">
    <!-- 侧栏滑块 -->
    <slide-pop
      @onClose='closeSlide'
      :showPop='showPop'
    >
      <trade-aside slot="content"></trade-aside>
    </slide-pop>
    <!-- 头部 -->
    <app-header
      :iconLeft='assetConfig.imgs.nav_transaction_menu'
      @onHeadClick='showSlide'
    >
      <div
        slot="title"
        class="coin font-16 abs-vh-center"
      >BTC/USDT</div>
    </app-header>
    <!-- 交易区 -->
    <div class="trade-panel flex flex-between">
      <!-- 买入卖出 -->
      <div class="form-box p-rel">
        <div class="btn-box flex flex-between h-35">
          <div
            @click="toggleType(0)"
            :class="type==0&&'active-0'"
            class="font-16 font-bold"
          >买入</div>
          <div
            @click="toggleType(1)"
            :class="type==1&&'active-1'"
            class="font-16 font-bold"
          >卖出</div>
        </div>
        <p class="price-label color-999">限价</p>
        <form @submit.prevent="onSubmit">
          <div class="from-group flex flex-between flex-v-center font-14 h-45">
            <input
              v-model.number='price'
              type="text"
              placeholder="价格"
            >
          </div>
          <div class="from-group flex flex-between flex-v-center font-14 h-45">
            <input
              v-model.number='number'
              type="text"
              placeholder="数量"
            >
            <span class="label">USDT</span>
          </div>
          <div class="available font-13 color-danger">可用：1216165&nbsp;USDT</div>
          <!-- 快速输入数量 -->
          <van-row
            class="fast-input h-30"
            gutter='6'
          >
            <van-col
              v-for="(item,i) in fastInputNum"
              :key='i'
              span='6'
            >
              <div
                :class="numLevel==item.val &&'active'"
                @click="getNum(item.val)"
                v-text="item.label"
              ></div>
            </van-col>
          </van-row>
          <div class="total font-16 font-bold color-666">交易额：<span
              class="color-danger"
              v-text="total"
            ></span>
          </div>
          <button
            v-show="type==0"
            class="btn-large btn-block riple btn-danger"
          >买入</button>
          <button
            v-show="type==1"
            class="btn-large btn-block riple btn-success"
          >卖出</button>
        </form>
      </div>
      <!-- 行情 -->
      <div class="trade-trend">
        <div class="table">
          <van-row class="thead h-35 color-666">
            <van-col
              class="font-13"
              span='12'
            >价格</van-col>
            <van-col
              class="txt-rt font-13"
              span='12'
            >数量</van-col>
          </van-row>
          <div class="tbody">
            <van-row class="h-25 p-rel">
              <div class="progress p-abs"></div>
              <van-col
                class="font-13 color-success"
                span='12'
              >1321</van-col>
              <van-col
                class="txt-rt font-13"
                span='12'
              >1321</van-col>
            </van-row>
          </div>
          <div
            :class="rise>0?'color-danger':'color-success'"
            class="rise txt-center font-14 h-25"
          >最新价 {{rise}}</div>
          <div class="tbody">
            <van-row class="h-25 p-rel">
              <div class="progress p-abs"></div>
              <van-col
                class="font-13 color-danger"
                span='12'
              >1321</van-col>
              <van-col
                class="txt-rt font-13"
                span='12'
              >1321</van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 交易记录 -->
    <div class="trade-record">
      <van-tabs
        color='#b72026'
        line-width='30'
        v-model="tabActive"
      >
        <van-tab title="当前委托">
          <div class="record-table">
            <van-row class="thead color-666 flex flex-v-center h-45">
              <van-col span='6 font-14'>市场</van-col>
              <van-col span='7 font-14'>价格</van-col>
              <van-col span='7 font-14'>成交量/数量</van-col>
              <van-col span='4 font-14 txt-rt'>操作</van-col>
            </van-row>
            <div class="tbody">
              <van-row class="flex flex-v-center">
                <van-col span='6 font-14'>
                  <div class="font-14 font-bold">BTC/USDT</div>
                  <small class="color-999">07-17</small>
                </van-col>
                <van-col span='7 font-14 color-success'>
                  <div class="font-14 font-bold">1519159</div>
                  <small>卖出</small>
                </van-col>
                <van-col span='7 font-14'>
                  <div class="font-14 font-bold">1</div>
                  <small class="color-999">116516</small>
                </van-col>
                <van-col span='4 font-14 txt-rt'>
                  <button class="btn-mini btn-success">撤单</button>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-tab>
        <van-tab title="历史委托">
          <div class="record-table">
            <van-row class="thead color-666 flex flex-v-center h-45">
              <van-col span='9 font-14'>市场</van-col>
              <van-col span='8 font-14'>价格</van-col>
              <van-col span='7 font-14 txt-rt'>成交量/数量</van-col>
            </van-row>
            <div class="tbody">
              <van-row class="flex flex-v-center">
                <van-col span='9 font-14'>
                  <div class="font-14 font-bold">BTC/USDT</div>
                  <small class="color-999">07-17</small>
                </van-col>
                <van-col span='8 font-14 color-success'>
                  <div class="font-14 font-bold">1519159</div>
                  <small>卖出</small>
                </van-col>
                <van-col span='7 font-14 txt-rt'>
                  <div class="font-14 font-bold">1</div>
                  <small class="color-999">116516</small>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>

</template>
<script>
import appHeader from "@/components/header/AppHeader";
import slidePop from "@/components/other/slidePop";
import tradeAside from "@/components/slideContent/TradeAside";
export default {
  components: { appHeader, slidePop, tradeAside },
  data() {
    return {
      showPop: false,
      type: 0,
      number: "",
      price: "",
      rise: 0,
      balance: 0,
      available: 0,
      numLevel: 0,
      fastInputNum: [
        {
          label: "25%",
          val: 0.25
        },
        {
          label: "50%",
          val: 0.5
        },
        {
          label: "75%",
          val: 0.75
        },
        {
          label: "100%",
          val: 1
        }
      ],
      tabActive: 0
    };
  },

  computed: {
    total() {
      return this.number * this.price;
    }
  },
  methods: {
    resetForm() {
      this.number = "";
      this.price = "";
    },
    onSubmit() {},
    toggleType(type) {
      this.type = type * 1;
      this.resetForm();
    },
    getNum(val) {
      this.numLevel = val;
    },
    showSlide() {
      this.showPop = true;
    },
    closeSlide() {
      this.showPop = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.coin {
  color: #fff;
}
.trade-panel {
  background: #fff;
  .form-box,
  .trade-trend {
    margin-top: 1rem;
    box-sizing: border-box;
  }
  .form-box {
    padding-left: 1rem;
    padding-bottom: 20px;
    width: 56.8%;
    flex: 1;
    button {
      margin-top: 21px;
    }
  }
  .total {
    margin-top: 15px;
  }
  .trade-trend {
    width: 43.2%;
  }
  .btn-box {
    line-height: 35px;
    text-align: center;
    color: #666;
    box-sizing: border-box;
    > div {
      flex: 1;
      height: 100%;
      border-width: 1px;
      box-sizing: border-box;

      border-style: solid;
      border-color: #eee;
    }
    .active-0 {
      color: $color-danger;
      border-color: $color-danger;
      + div {
        border-left: none;
      }
    }
    .active-1 {
      color: $color-success;
      border-color: $color-success;
      + div {
        border-right: none;
      }
    }
  }
  .price-label {
    margin-top: 11px;
  }
  .available {
    margin-top: 0.5rem;
  }
  .table {
    .rise {
      line-height: 25px;
    }
  }
  .tbody {
    line-height: 25px;
    height: 125px;
    .van-col {
      position: relative;
      z-index: 99;
    }
    .progress {
      width: 100%;
      height: 100%;
      z-index: 9;
      left: 0;
      top: 0;
      background-color: #f6f6f6;
      opacity: 0.4;
    }
  }
}
.fast-input {
  margin-top: 1rem;
  .van-col {
    > div {
      @include textVcenter(30px);
      border: 1px solid transparent;
      box-sizing: border-box;
      text-align: center;
      background: #f5f5f5;
    }
  }
  div.active {
    border-color: $color-danger;
  }
}

.trade-trend {
  padding: 0 1rem;
  .thead {
    line-height: 35px;
  }
}
.from-group {
  border: 1px solid #eee;
  box-sizing: border-box;
  padding: 0 1rem;
  margin-top: 1rem;
  input {
    display: block;
    height: 100%;
    width: 60%;
    border: none;
  }
  .label {
    display: block;
    width: 40%;
    text-align: right;
  }
}
.trade-record {
  margin-top: 1rem;
}
.record-table {
  .thead {
    padding: 0 1rem;
  }
  .tbody {
    padding: 0 1rem;
    background: #fff;
    .van-row {
      padding: 1rem 0;
    }
    .van-col {
      > div:first-child {
        margin-bottom: 0.3rem;
      }
    }
  }
}
</style>