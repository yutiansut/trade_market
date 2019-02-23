<template>
  <div class="main wh-full">
    <my-header class="header-main">
      <login-bar></login-bar>
    </my-header>
    <el-container>
      <el-aside width='400px'>
        <c2c-aside-comp
          @onListClick="onListClick"
          :myData='currencyList'
        >
        </c2c-aside-comp>
      </el-aside>
      <el-main>
        <div class="panel-container p-rel flex flex-between">
          <div class="form-wrap">
            <div
              class="font-18 font-bit-bold"
              v-html="buyingLabel"
            ></div>
            <div class="break-line"></div>
            <div class="account flex flex-between">
              <span class="balance">{{$t('avilable')||'可用'}}&nbsp;{{myBalance}}&nbsp;{{coinInfo.coinid||""}}</span>
              <router-link
                to='./property'
                v-text="$t('recharge')||'充值'"
              ></router-link>
            </div>
            <div class="input-group">
              <label v-text="$t('buyingValiation')||'买入估价'"></label>
              <el-input
                disabled
                :value='coinInfo.buycny'
              >
                <span
                  class="unit"
                  slot="suffix"
                >CNY</span>
              </el-input>
            </div>
            <div class="input-group">
              <label v-text="$t('buyVol')||'买入量'"></label>
              <el-input
                :placeholder="minNum"
                v-model="buyForm.number"
              >
                <span
                  class="unit"
                  slot="suffix"
                  v-text="coinInfo.coinid||''"
                ></span>
              </el-input>
            </div>
            <div class="input-group">
              <label v-text="$t('money')||'金额'"></label>
              <el-input
                disabled
                v-model="buyTotal"
              >
                <span
                  class="unit"
                  slot="suffix"
                >CNY</span>
              </el-input>
            </div>
            <button
              @click="buyHandle"
              class="btn-block btn-large btn-danger btn-active"
              v-html="buyingLabel"
            >
            </button>
          </div>
          <div class="vertical-line p-abs abs-h-center"></div>
          <div class="form-wrap">
            <div
              class="font-18 font-bit-bold"
              v-html="sellingLabel"
            ></div>
            <div class="break-line"></div>
            <div class="account flex flex-between">
              <span class="balance">{{$t('avilable')||'可用'}}&nbsp;{{myBalance}}&nbsp;{{coinInfo.coinid||''}}</span>
              <router-link
                to='./property'
                v-text="$t('recharge')||'充值'"
              ></router-link>
            </div>
            <div class="input-group">
              <label v-text="$t('sellingValiation')||'卖出估价'"></label>
              <el-input
                disabled
                :value='coinInfo.sellcny'
              >
                <span
                  class="unit"
                  slot="suffix"
                >CNY</span>
              </el-input>
            </div>
            <div class="input-group">
              <label v-text="$t('sellVol')||'卖出量'"></label>
              <el-input
                :placeholder='minNum'
                v-model="sellForm.number"
              >
                <span
                  class="unit"
                  slot="suffix"
                  v-text="coinInfo.coinid||''"
                ></span>
              </el-input>
            </div>
            <div class="input-group">
              <label v-text="$t('money')||'金额'"></label>
              <el-input
                disabled
                v-model="sellTotal"
              >
                <span
                  class="unit"
                  slot="suffix"
                >CNY</span>
              </el-input>
            </div>
            <button
              @click="sellHandle"
              class="btn-block btn-large btn-success btn-active"
              v-html="sellingLabel"
            >
            </button>
          </div>
        </div>
        <div class="warning-box">
          <h3 v-text="$t('transferNote')||'转让须知'"></h3>
          <span class="color-666">1、转让后获得相应的CNY。 2、转让获得的CNY可以提现至您指定的账户内，最低提现金额为100。 3、转让是直接扣除您在本平台的相应代币的数量。 4、本平台仅提供收购各类币种，转让后无法取消操作。</span>
        </div>
        <div class="panel-container">
          <div class="panel-header flex flex-between flex-v-center">
            <span
              class="font-bit-bold font-18"
              v-text="$t('myOrder')||'我的订单'"
            >
            </span>
            <!-- <router-link to=''>更多</router-link> -->
          </div>
          <div class="break-line"></div>
          <el-table
            max-height='350'
            v-loading='showLoading'
            :data='myOrderList'
          >
            <el-table-column
              prop='wdate'
              :label='$t("time")||"时间"'
            >
            </el-table-column>
            <el-table-column
              prop='coinid'
              :label='$t("currencyType")||"币种"'
            >
            </el-table-column>
            <el-table-column :label='$t("type")||"类型"'>
              <span
                slot-scope="scope"
                :class='scope.row.type=="0"?"color-danger":"color-success"'
                v-text="scope.row.type=='0'?$t('buy'):$t('sell')"
              >
              </span>
            </el-table-column>
            <el-table-column :label='$t("amount")||"数量"'>
              <template slot-scope="scope">
                {{scope.row.number*1}}
              </template>
            </el-table-column>
            <el-table-column :label='($t("unitPrice")||"单价")+"(CNY)"'>
              <template slot-scope="scope">
                {{scope.row.price*1}}
              </template>
            </el-table-column>
            <el-table-column :label='($t("totalPrice")||"总价")+"(CNY)"'>
              <template slot-scope="scope">
                {{scope.row.zj*1}}
              </template>
            </el-table-column>
            <el-table-column
              width='100'
              :label='($t("status")||"状态")'
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.type==0&&scope.row.state==0"
                  @click="showOrderDetail(scope.row)"
                  class="color-danger"
                  v-text="$t('label128')"
                ></span>
                <span
                  v-else-if="scope.row.type==1&&scope.row.state==0"
                  @click="showOrderDetail(scope.row)"
                  class="color-danger"
                  v-text="$t('label180')"
                ></span>
                <span
                  v-else
                  @click="showOrderDetail(scope.row)"
                  class="color-success"
                  v-text="$t('completed')"
                ></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <!-- 购买弹窗 -->
    <dialog-box
      width='25%'
      :dialogTitle='$t("orderDetail")'
      :showDialog='showDialog'
      @onDialogClose='dialogClose'
    >
      <div
        v-show="orderStatus==0"
        class="row"
      >
        <div
          class="column color-danger txt-center flex flex-between"
          v-text="$t('label134')"
        ></div>
      </div>
      <div class="row">
        <div class="column flex flex-between">
          <span
            class="span-lf"
            v-text="$t('owner')"
          ></span>
          <span
            class="span-rt"
            v-text="bankInfo.hz"
          ></span>
        </div>
      </div>
      <div class="row">
        <div class="column flex flex-between">
          <span
            class="span-lf"
            v-text="$t('bankCardNo')"
          ></span>
          <span
            class="span-rt"
            v-text="bankInfo.bankcard"
          >jogjgioejao</span>
        </div>
      </div>
      <div class="row">
        <div class="column flex flex-between">
          <span
            class="span-lf"
            v-text="$t('depositBank')"
          ></span>
          <span
            class="span-rt"
            v-text="bankInfo.khyh"
          ></span>
        </div>
      </div>
      <div class="row">
        <div class="column flex flex-between">
          <span
            class="span-lf"
            v-text="$t('bankBranch')"
          ></span>
          <span
            class="span-rt"
            v-text="bankInfo.khzh"
          ></span>
        </div>
      </div>
      <div class="row">
        <div class="column flex flex-between">
          <span
            class="span-lf"
            v-text="$t('transferAmount')"
          ></span>
          <span
            class="span-rt font-bold color-danger"
            v-text="'￥'+bankInfo.amount*1"
          ></span>
        </div>
      </div>
      <div class="row">
        <div class="column flex flex-between">
          <span
            class="span-lf"
            v-text="$t('status')"
          ></span>
          <span
            class="span-rt"
            :class="orderStatus=='0'?'color-danger':'color-success'"
            v-text="orderStatus=='0'?$t('label128'):$t('completed')"
          >
          </span>
        </div>
      </div>
      <div class="row">
        <div class="column flex flex-between">
          <span
            class="span-lf"
            v-text="$t('note')"
          ></span>
          <span
            class="span-rt"
            v-text="noteStr"
          ></span>
        </div>
      </div>
    </dialog-box>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { checkTradePassword } from "../../service/TradeService.js";
export default {
  data() {
    return {
      showDialog: false,
      currencyList: [],
      coinInfo: "",
      buyForm: {
        number: "",
        total: ""
      },
      sellForm: {
        number: "",
        total: ""
      },
      showLoading: false,
      canTrade: false,
      bindState: null,
      myOrderList: [],
      allOrderList: [],
      bankInfo: "",
      orderStatus: 0,
      myBalance: 0,

      //随机生成的备注字符串
      noteStr: ""
    };
  },
  computed: {
    buyingLabel() {
      return `${this.$t("buy") || "买入"}&nbsp;${this.coinInfo.coinid || ""}`;
    },
    sellingLabel() {
      return `${this.$t("sell") || "卖出"}&nbsp;${this.coinInfo.coinid || ""}`;
    },
    buyState() {
      return `${this.$t("buy") || "买入"}`;
    },
    minNum() {
      return `${this.$t("minNum") || "最少"} ${this.coinInfo.minnum * 1}`;
    },
    sellState() {
      return `${this.$t("sell") || "卖出"}`;
    },
    buyTotal() {
      return this.buyForm.number * this.coinInfo.buycny;
    },
    sellTotal() {
      return this.sellForm.number * this.coinInfo.sellcny;
    }
  },
  mounted() {
    this.showLoading = true;
    this.getOtcCoin().then(coin => {
      if (coin) {
        this.getAvailable(coin);
      }
    });
    this.getOtcOrder();
    this.getState();
    this.getotcbank();
  },
  methods: {
    //检测交易密码有效期
    checkTradePassword() {
      if (!this.storage.get("tradePasswordChecked")) {
        this.$prompt(this.$t("label199"), "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /\S/,
          inputType: "password",
          inputErrorMessage: this.$t("label200")
        })
          .then(({ value }) => {
            checkTradePassword(value).then(res => {
              if (res.code != 0) {
                this.storage.set("tradePasswordChecked", false);
                this.errMsg("交易密码不正确");
              } else {
                this.storage.set("tradePasswordChecked", true);
                this.successMsg(res.msg);
              }
            });
          })
          .catch(() => {});
        return false;
      }
      return true;
    },
    // 生成随机备注信息
    getNote() {
      let str = "";
      for (let i = 0; i < 6; i++) {
        str += this.Util.randomNum(0, 9);
      }
      this.noteStr = str;
    },
    //获取可用
    getAvailable(coin) {
      this.request(this.api.getdaynumber, {
        coin: coin
      }).then(res => {
        if (res.code == "0" && res.data.list && res.data.list.length > 0) {
          this.myBalance = res.data.list[0].usable * 1;
        }
      });
    },
    //系统银行信息
    getotcbank() {
      this.request(this.api.getotcbank).then(res => {
        if (res.code == "0") {
          this.bankInfo = res.data.list[0] || "";
        } else {
          this.errMsg(res.msg || "操作失败");
        }
      });
    },
    // otc币种
    getOtcCoin() {
      return this.request(this.api.getotccoin).then(res => {
        console.log(`OTC币种${JSON.stringify(res)}`);
        if (res.code == "0" && res.data && res.data.list && res.data.list[0]) {
          this.currencyList = res.data.list;
          this.coinInfo = res.data.list[0];
          return Promise.resolve(this.coinInfo.coinid);
        }
      });
    },
    // 获取所有otc订单记录
    getOtcOrder() {
      this.request(this.api.getotcorder).then(res => {
        console.log(`OTC订单${JSON.stringify(res)}`);
        this.showLoading = false;
        if (res.code == "0" && res.data && res.data.list && res.data.list[0]) {
          let list = res.data.list.slice(0);
          this.allOrderList = list;
          this.myOrderList = this.getMyOrderlist(
            list,
            this.coinInfo.coinid || list[0].coinid
          );
        }
      });
    },
    getMyOrderlist(listArr, coinid) {
      let arr = [];
      if (listArr && this.Util.dataType(listArr) == "array") {
        listArr.map(item => {
          if (item.coinid == coinid) {
            arr.push(item);
          }
        });
        return arr;
      }
    },
    // 获取状态
    getState() {
      this.request(this.api.saftyState).then(res => {
        if (res.code == "0") {
          this.bindState = res.data.list[0];
          this.canTrade = this.canTradeCheck(this.bindState);
        }
      });
    },
    onListClick(data) {
      this.coinInfo = data;
      this.myOrderList = this.getMyOrderlist(this.allOrderList, data.coinid);
      this.getAvailable(data.coinid);
      this.buyForm = {
        number: "",
        total: ""
      };
      this.sellForm = {
        number: "",
        total: ""
      };
    },
    // 是否能够交易
    canTradeCheck(statesObj) {
      if (
        statesObj.tradstate > 0 &&
        statesObj.bankstate > 0 &&
        statesObj.idcardstate > 0 &&
        statesObj.googlestate > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    beforeTrade() {
      if (!this.userModel.isLogin) {
        this.errMsg("label120" || "请登录后操作");
        return false;
      }
      if (!this.checkTradePassword()) {
        return false;
      }
      return true;
    },
    // 获取订单备注
    showOrderDetail(data) {
      if (data.type == 0) {
        this.orderStatus = data.state;
        this.showDialog = true;
        this.bankInfo.amount = data.zj;
        this.getNote();
      }
    },
    handleConfirm(api, param) {
      if (!checkTradePassword()) {
        return false;
      }
      return this.request(api, {
        coin: param.coin,
        id: this.bankInfo.autoid,
        bz: this.noteStr,
        number: param.number,
        jz: param.total,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg);
          this.getOtcOrder();
          return Promise.resolve(res);
        } else {
          this.errMsg(res.msg);
          return Promise.reject(res);
        }
      });
    },
    //卖出操作
    sellHandle() {
      if (!this.beforeTrade()) {
        return false;
      }
      if (
        isNaN(this.sellForm.number) ||
        this.sellForm.number < this.coinInfo.minnum * 1
      ) {
        this.errMsg("label122" || "请输入正确的数量");
        return false;
      }
      this.handleConfirm(this.api.otcsell, {
        coin: this.coinInfo.coinid,
        number: this.sellForm.number,
        total: this.sellTotal
      })
        .then(res => {
          this.bankInfo.amount = this.sellTotal;
          this.myBalance = this.myBalance - this.sellForm.number;
        })
        .catch(err => {
          console.log(res.msg);
        });
    },
    // 买入操作
    buyHandle() {
      this.getNote();
      if (!this.beforeTrade()) {
        return false;
      }
      if (
        isNaN(this.buyForm.number) ||
        this.buyForm.number < this.coinInfo.minnum * 1
      ) {
        this.errMsg("label122" || "请输入正确的数量");
        return false;
      }
      this.handleConfirm(this.api.otcbuy, {
        coin: this.coinInfo.coinid,
        number: this.buyForm.number,
        total: this.buyTotal
      })
        .then(res => {
          if (res.code == "0") {
            this.showDialog = true;
            this.bankInfo.amount = this.buyTotal;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    dialogClose() {
      this.showDialog = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.break-line {
  @include breakLine;
}
$mr: 11px;
$border: 1px solid #e5e5e5;
.row {
  @include textVcenter();
  span {
    display: block;
    box-sizing: border-box;
  }
  .span-lf {
    flex: 4;
    padding-right: 15px;
    text-align: right;
  }

  .span-rt {
    flex: 5;
    padding-left: 15px;
  }
}
.el-container {
  border-bottom: $border;
  .form-wrap {
    width: 48.65%;
    .break-line {
      margin-top: 12px;
    }
    .total {
      margin-top: 19px;
    }
    button {
      margin-top: 22px;
    }
    .account {
      margin-top: 14px;
      a {
        color: $color-danger;
      }
    }
    .input-group {
      margin-top: 19px;
      .unit {
        line-height: 40px;
        color: #333;
        padding-right: 6px;
      }
      .el-input {
        margin-top: 10px;
      }
      .hint {
        display: inline-block;
        margin-top: $mr;
      }
    }
  }
  .warning-box {
    border: $default-border;
    padding: 20px;
    margin-top: 20px;
    h3 {
      line-height: 2;
    }
    span {
      line-height: 1.5;
    }
  }
}
.panel-container {
  .panel-header {
    margin: 30px 0 12px 0;
  }
}
</style>
