<template>
  <div class="main">
    <my-header class="header-main">
      <login-bar></login-bar>
    </my-header>
    <el-container>
      <!-- 侧栏列表 -->
      <el-aside width="400px">
        <c2c-aside-comp
          :myData='currencyList'
          @onListClick='onListClick'
        >
        </c2c-aside-comp>
      </el-aside>
      <el-main>
        <div class="panel-head flex flex-v-center">
          <img
            class="thumb-30"
            src=""
            alt=""
          >
          <span class="font-bold font-20">{{coinInfo.coinid}}/CNY</span>
          <div class="market-condition">
            <span>
              <em
                class="color-666"
                v-text="$t('livePrice')||'实时价'"
              ></em>
              <i v-text="'￥'+(coinInfo.cny||0)"></i>
            </span>
            <span>
              <em
                class="color-666"
                v-text="$t('increase')||'涨幅'"
              ></em>
              <i class="color-danger">+3.68%</i>
            </span>
            <span>
              <em
                class="color-666"
                v-text="$t('high')||'高'"
              ></em>
              <i>￥7.29</i>
            </span>
            <span>
              <em
                class="color-666"
                v-text="$t('low')||'低'"
              ></em>
              <i>￥6.70</i>
            </span>
          </div>
        </div>
        <!-- 分割线 -->
        <div class="break-line"></div>
        <!-- 买入/卖出 -->
        <div class="panel-container p-rel flex flex-between">
          <div class="form-wrap">
            <div
              class="font-18 font-bit-bold"
              v-html="buyingLabel"
            ></div>
            <div class="break-line"></div>
            <div class="account flex flex-between">
              <span
                class="balance"
                v-html="advisalPrice"
              ></span>
              <router-link
                to='./property'
                v-text="$t('recharge')||'充值'"
              ></router-link>
            </div>
            <div class="input-group">
              <label v-text="$t('buyingValiation')||'买入估价'"></label>
              <el-input v-model="buyFormData.price">
                <span
                  class="unit"
                  slot="suffix"
                >CNY</span>
              </el-input>
            </div>
            <div class="input-group">
              <label v-text="$t('buyVol')||'买入量'"></label>
              <el-input
                :placeholder='minNum'
                v-model="buyFormData.number"
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
                disabled='disabled'
                :value="buyTotal"
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
              <span
                class="balance"
                v-html="myAvailableLabel"
              ></span>
              <router-link
                to='./property'
                v-text="$t('recharge')||'充值'"
              ></router-link>
            </div>
            <div class="input-group">
              <label v-text="$t('sellingValiation')||'卖出估价'"></label>
              <el-input v-model="sellFormData.price">
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
                v-model="sellFormData.number"
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
                disabled='disabled'
                :value="sellTotal"
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
        <!-- 挂单 -->
        <div class="panel-container">
          <div
            class="panel-header font-18 font-bit-bold"
            v-text="$t('inOrder')||'市场挂单'"
          ></div>
          <div class="break-line"></div>
          <el-table
            :fit='true'
            :max-height='428'
            :data='marketList'
          >
            <el-table-column
              width="120"
              :label='$t("type")||"类型"'
            >
              <span
                slot-scope="scope"
                v-text="scope.row.type=='0'?($t('buy')||'买入'):($t('sell')||'卖出')"
                :class="scope.row.type=='0'?'color-danger':'color-success'"
              >
              </span>
            </el-table-column>
            <el-table-column :label='($t("price")||"价格")+"(CNY)"'>
              <template slot-scope="scope">
                {{scope.row.price*1}}
              </template>
            </el-table-column>
            <el-table-column :label='numberLabel'>
              <template slot-scope="scope">
                {{scope.row.number*1}}
              </template>
            </el-table-column>
            <el-table-column
              prop='total'
              :label='($t("total")||"总计")+"(CNY)"'
            >
            </el-table-column>

            <el-table-column
              width='100'
              :label='$t("operation")||"操作"'
            >
              <template slot-scope="scope">
                <button
                  class="btn-inline btn-mini btn-radius"
                  :class='scope.row.type=="1"?"btn-danger":"btn-success"'
                  v-text="scope.row.type=='1'?$t('buy'):$t('sell')"
                  @click="tradeConfirmHandle(scope.row)"
                >
                </button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 我发布的订单 -->
        <div class="panel-container">
          <div
            class="panel-header font-18 font-bit-bold"
            v-text="$t('myOrder')"
          >
          </div>
          <template v-if="userData.isLogin">
            <div class="break-line"></div>
            <el-table
              :fit='true'
              :data='myOrderList'
            >
              <el-table-column
                width="150"
                prop='autoid'
                :label='$t("orderId")||"单号"'
              >
              </el-table-column>
              <el-table-column
                width='120'
                :label='$t("type")||"类型"'
              >
                <span
                  slot-scope="scope"
                  v-text="scope.row.type=='0'?($t('buy')||'买入'):($t('sell')||'卖出')"
                  :class="scope.row.type=='0'?'color-danger':'color-success'"
                >
                </span>
              </el-table-column>
              <el-table-column :label='($t("price")||"价格")+"(CNY)"'>
                <template slot-scope="scope">
                  {{scope.row.price|toFix()}}
                </template>
              </el-table-column>
              <el-table-column :label='numberLabel'>
                <template slot-scope="scope">
                  {{scope.row.number|toFix()}}
                </template>
              </el-table-column>
              <el-table-column
                prop='total'
                :label='amountLabel'
              >
              </el-table-column>
              <!-- <el-table-column width='150' prop='name'
                            :label='$t("theirName")||"对方姓名"'>
                          </el-table-column> -->
              <el-table-column
                width="200"
                prop='wdate'
                :label='$t("createdTime")||"建立时间"'
              >
              </el-table-column>
              <el-table-column
                width="100"
                :label='$t("operation")||"操作"'
              >
                <a
                  slot-scope="scope"
                  v-text='"撤单"'
                  class="color-danger"
                  @click="cancelMyc2cOrder(scope.row.autoid)"
                >
                </a>
              </el-table-column>
            </el-table>
          </template>
          <unlogin-tip></unlogin-tip>
        </div>
        <div class="panel-container">
          <div
            class="panel-header font-18 font-bit-bold"
            v-text="$t('myCtcOrder')||'我的CTC交易订单'"
          >
          </div>
          <template v-if="userData.isLogin">
            <div class="break-line"></div>
            <el-table :data='myC2COrderList'>
              <el-table-column
                width="150"
                prop='autoid'
                :label='$t("orderId")||"单号"'
              >
              </el-table-column>
              <el-table-column
                width='120'
                :label='$t("type")||"类型"'
              >
                <span
                  slot-scope="scope"
                  v-text="scope.row.type=='0'?($t('buy')||'买入'):($t('sell')||'卖出')"
                  :class="scope.row.type=='0'?'color-danger':'color-success'"
                >
                </span>
              </el-table-column>
              <el-table-column :label='($t("price")||"价格")+"(CNY)"'>
                <template slot-scope="scope">
                  {{scope.row.price|toFix()}}
                </template>
              </el-table-column>
              <el-table-column :label='numberLabel'>
                <template slot-scope="scope">
                  {{scope.row.number|toFix()}}
                </template>
              </el-table-column>
              <el-table-column
                prop='total'
                :label='amountLabel'
              >
              </el-table-column>
              <!-- <el-table-column width='150' prop='name'
                            :label='$t("theirName")||"对方姓名"'>
                          </el-table-column> -->
              <el-table-column
                width="200"
                prop='wdate'
                :label='$t("createdTime")||"建立时间"'
              >
              </el-table-column>
              <el-table-column
                width="100"
                :label='$t("operation")||"操作"'
              >
                <template slot-scope="scope">
                  <span
                    class="color-danger"
                    @click="confirmHandle(scope.row)"
                    v-if="scope.row.type==0&&scope.row.state==0"
                  >{{$t('label128')}}
                  </span>
                  <span
                    class="color-success"
                    v-if="scope.row.type==1&&scope.row.state==0"
                  >{{$t('label129')}}
                  </span>
                  <span
                    class="color-success"
                    v-if="scope.row.type==0&&scope.row.state==1"
                  >{{$t('label128')}}
                  </span>
                  <span
                    class="color-999"
                    v-if="scope.row.type<2&&scope.row.state==2"
                  >{{$t('completed')}}</span>
                  <span
                    class="color-danger"
                    v-if="scope.row.type==1&&scope.row.state==1"
                    @click="confirmHandle(scope.row)"
                  >{{$t('label131')}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <unlogin-tip></unlogin-tip>
        </div>
      </el-main>
    </el-container>
    <my-footer></my-footer>
    <!-- 卖出发布确认弹窗 -->
    <trade-confirm
      :show='dialogId==1?true:false'
      :title="$t('sellingConfirm')"
      :numLabel="$t('sellingNum')"
      :amountLabel="$t('sellingAmount')"
      :valuationLabel='$t("sellingValiation")'
      :tradeModeLabel='$t("tradeMethods")'
      :number='confirmData.number'
      :price='confirmData.price'
      @onSubmit='publicOrder(api.addsellc2c,confirmData)'
      @closeModel='onModelClose'
    >
    </trade-confirm>
    <!-- 买入发布确认 -->
    <trade-confirm
      :show='dialogId==0?true:false'
      :title="$t('buyingConfirm')"
      :numLabel="$t('buyingNum')"
      :amountLabel="$t('buyingAmount')"
      :valuationLabel='$t("buyingValiation")'
      :tradeModeLabel='$t("tradeMethods")'
      :number='confirmData.number'
      :price='confirmData.price'
      @onSubmit='publicOrder(api.addbuyc2c,confirmData)'
      @closeModel='onModelClose'
    >
    </trade-confirm>
    <!-- 订单匹配弹窗 -->
    <!-- <order-match
          :show='dialogId==2?true:false'
          :myData='orderMatchList'
          :operateLable='$t(operateLabeli18n)||operateLable'>
        </order-match> -->
    <!-- 挂单买入/卖出待确认弹窗 -->
    <order-confirm :show='dialogId==3?true:false'>
    </order-confirm>
    <!-- 挂单买入/卖出订单 -->
    <market-order
      :show='dialogId==4?true:false'
      :title='$t(marketOrderCfg.titlei18nkey)'
      :volumnLabel='$t(marketOrderCfg.volumnLabeli18nkey)'
      :volumn="marketOrderDetail.number*1"
      :price="marketOrderDetail.price*1"
      :amount="marketOrderDetail.total*1"
      @onSubmit='tradeFromMarket(marketOrderDetail.type,marketOrderDetail.autoid)'
      @closeModal='onModelClose'
      :coin='marketOrderDetail.coinid'
    >
    </market-order>
    <!-- 待收/付款 -->
    <order-paid
      :show='dialogId==5?true:false'
      :title="$t('orderDetail')||'订单详情'"
      :formData='orderDetail'
      @onSubmit='dealOrder(orderDetail.type,orderId)'
      @closeModal='onModelClose'
    >
    </order-paid>
  </div>
</template>
<script>
import TradeConfirm from "@/components/dialogContent/TradeConfirm";
import orderMatch from "@/components/dialogContent/orderMatching";
import orderConfirm from "@/components/dialogContent/OrderConfirm";
import marketOrder from "@/components/dialogContent/MarketOrder";
import orderPaid from "@/components/dialogContent/orderPaid";
export default {
  components: {
    TradeConfirm,
    orderMatch,
    orderConfirm,
    marketOrder,
    orderPaid
  },
  data() {
    return {
      dialogId: null,
      bindState: null,
      canTrade: false,
      userData: this.userModel,
      operateLable: "卖出",
      operateLabeli18n: "sell",
      coinid: "",
      coinInfo: "",
      myAvailable: 0,
      accountInfo: null,
      buyFormData: {
        price: "",
        number: "",
        total: ""
      },
      sellFormData: {
        price: "",
        number: "",
        total: ""
      },
      confirmData: {},
      //市场挂单弹窗配置
      marketOrderCfg: {
        titlei18nkey: "",
        volumnLabeli18nkey: "",
        title: "市挂单买入",
        volumnLabel: "买入量"
      },
      // 市场挂单
      marketList: null,
      //我发布的订单
      myOrderList: null,
      // 我的c2c交易订单
      myC2COrderList: [],
      // 侧栏列表
      currencyList: [],
      // 订单匹配列表
      orderMatchList: "",
      //订单详情信息
      orderDetail: {},
      //挂单详情
      marketOrderDetail: {},
      // 订单id
      orderId: ""
    };
  },
  mounted() {
    this.getc2corder();
    this.getState();
    this.getC2Ccoin()
      .then(res => {
        if (res) {
          this.currencyList = res;
          this.coinInfo = res[0];
          return Promise.resolve(res[0].coinid);
        }
      })
      .then(coin => {
        this.gettradorder(coin);
        this.getMyAccount(coin).then(res => {
          res && (this.myAvailable = res.usable);
        });
        return this.getc2callorder(coin).then(list => {
          this.marketList = list;
        });
      })
      .then(result => {
        if (result) {
          this.Util.sumCalc(result, "price", "number");
          this.marketList = result;
        }
      });
  },
  computed: {
    // 购买文字
    buyingLabel() {
      return `${this.$t("buy") || "买入"}&nbsp;${this.coinInfo.coinid || ""}`;
    },
    // 售卖文字
    sellingLabel() {
      return `${this.$t("sell") || "买入"}&nbsp;${this.coinInfo.coinid || ""}`;
    },
    // 数量项目
    numberLabel() {
      return `${this.$t("amount") || "数量"}(${this.coinInfo.coinid || ""})`;
    },
    //金额文字
    amountLabel() {
      return `${this.$t("money") || "金额"}(CNY)`;
    },
    // 可用
    myAvailableLabel() {
      return `${this.$t("avilable") || "可用"}&nbsp;${this.myAvailable *
        1}&nbsp;${this.coinInfo.coinid || ""}`;
    },
    //平台指导价
    advisalPrice() {
      // {{$t('avilable')||'可用'}}&nbsp;0.00000000{{coinInfo.coinid}}
      return `${this.$t("avisalPrice") || "指导价"}&nbsp;￥${this.coinInfo
        .cny || 0}`;
    },
    //买入总金额
    buyTotal() {
      return this.buyFormData.price * this.buyFormData.number;
    },
    //卖出总金额
    sellTotal() {
      return this.sellFormData.price * this.sellFormData.number;
    },
    //最少限制
    minNum() {
      return `${this.$t("minNum") || "最少"} ${this.coinInfo.minnum * 1}`;
    }
  },
  methods: {
    // 发布订单
    publicOrder(apiKey, param) {
      this.request(apiKey, {
        coin: this.coinInfo.coinid,
        price: param.price || "",
        number: param.number || "",
        showLoading: true
      }).then(res => {
        console.log(`${JSON.stringify(res)}`);
        if (res.code == "0") {
          this.onModelClose();
          this.successMsg(res.msg);
          this.getc2callorder(this.coinInfo.coinid).then(list => {
            this.marketList = list;
          });
          this.getc2corder();
        } else {
          this.errMsg(res.msg || "操作失败");
        }
      });
    },
    // 撤销我的c2c订单
    cancelMyc2cOrder(autoid) {
      this.request(this.api.clearc2c, {
        autoid: autoid,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "操作成功");
          this.delItemFromList(autoid, this.myOrderList);
          this.delItemFromList(autoid, this.marketList);
        } else {
          this.errMsg(res.msg || "操作失败");
        }
      });
    },
    // 删除列表某一项
    delItemFromList(id, listArr) {
      listArr.map((item, index) => {
        console.log(item);
        if (item.autoid == id) {
          listArr.splice(index, 1);
          return listArr;
        }
      });
    },
    // 发布买入
    buyHandle() {
      if (this.buyTotal != "NaN" && this.buyTotal > 0 && this.validation()) {
        this.confirmData = {
          number: this.buyFormData.number,
          price: this.buyFormData.price
        };
        this.dialogId = 0;
      } else {
        this.errMsg("label121" || "请输入有效价格");
      }
    },
    // 发布卖出
    sellHandle() {
      if (this.sellTotal != "NaN" && this.sellTotal > 0 && this.validation()) {
        this.confirmData = {
          number: this.sellFormData.number,
          price: this.sellFormData.price
        };
        this.dialogId = 1;
        // this.publicOrder(this.api.addsellc2c, param);
      } else {
        this.errMsg("label121" || "请输入有效价格");
      }
    },
    // 挂单买入/卖出弹窗
    tradeConfirmHandle(rowData) {
      if (!this.userData.isLogin) {
        this.errMsg("label120" || "请登录后操作");
        return false;
      }
      this.dialogId = 4;
      let type = rowData.type;
      this.marketOrderDetail = {
        type: rowData.type,
        autoid: rowData.autoid,
        coinid: rowData.coinid,
        number: rowData.number,
        price: rowData.price,
        total: rowData.total,
        limitAmount: 0
      };
      this.marketOrderCfg = {
        titlei18nkey: type == 0 ? "sellPendingOrder" : "buyPendingOrder",
        volumnLabeli18nkey: type == 0 ? "sellVol" : "buyVol"
      };
    },
    // 从市场买入/卖出c2c
    tradeFromMarket(type, autoid) {
      if (!type || !autoid) return false;
      this.request(type == 0 ? this.api.c2cselltrad : this.api.c2cbuytrad, {
        autoid: autoid,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.onModelClose();
          this.successMsg(res.msg || "操作成功");
        } else {
          this.errMsg(res.msg || "操作失败");
        }
      });
    },
    // 侧栏点击
    onListClick(data) {
      this.coinInfo = data;
      this.getc2corder();
      this.getc2callorder(data.coinid);
      this.gettradorder(data.coinid);
      this.getMyAccount(data.coinid).then(res => {
        res && (this.myAvailable = res.usable);
      });
    },
    // 获取c2c币种
    getC2Ccoin() {
      return this.request(this.api.getc2ccoin, {
        showLoading: 0
      }).then(res => {
        console.log(`c2c币种：${JSON.stringify(res)}`);
        if (res.data && res.data.list && res.data.length > 0) {
          return Promise.resolve(res.data.list);
        }
      });
    },
    // 获取市场挂单
    getc2callorder(coinid) {
      return this.request(this.api.getc2callorder, {
        coin: coinid
      }).then(res => {
        console.log(`市场挂单:${JSON.stringify(res)}`);
        if (res.code == "0") {
          let list = this.Util.sumCalc(res.data.list, "price", "number");
          return Promise.resolve(list);
        } else {
          return Promise.reject(res);
        }
      });
    },
    // 获取我的订单
    getc2corder() {
      return this.request(this.api.getc2corder).then(res => {
        console.log(`c2c我的订单：${JSON.stringify(res)}`);
        if (res.code == "0") {
          this.Util.sumCalc(res.data.list, "price", "number");
          this.myOrderList = res.data.list;
        }
      });
    },
    //获取我c2c交易订单
    gettradorder(coin) {
      return this.request(this.api.getmyc2ctrad, {
        coin: coin
      }).then(res => {
        console.log(`c2c交易订单：${JSON.stringify(res)}`);
        this.Util.sumCalc(res.data.list, "price", "number");
        this.myC2COrderList = res.data.list;
      });
    },
    //获取资产信息
    getMyAccount(coin) {
      return this.request(this.api.getaccount, {
        search: coin,
        showLoading: true
      }).then(res => {
        console.log(`我的资产：${JSON.stringify(res)}`);
        if (res.code == "0") {
          return Promise.resolve(res.data.list[0]);
        }
      });
    },
    // 操作校验
    validation() {
      if (!this.userData.isLogin) {
        this.errMsg("label120" || "请登录后操作");
        return false;
        // } else if (!this.canTrade) {
        //   this.$alert("为确保资金安全,请先进行安全认证！", "提示", {
        //     confirmButtonText: "去认证",
        //     type: "warning"
        //   }).then(() => {
        //     this.navigateTo("/account/security");
        //     return false;
        //   });
      } else {
        return true;
      }
    },
    //检测是否能够交易
    canTradeCheck(statesObj) {
      if (!this.Util.dataType(statesObj) == "object") return false;
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
    //获取的账户状态
    getState() {
      return this.request(this.api.saftyState).then(res => {
        console.log(`账号状态：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        if (res.data && res.data.list) {
          this.bindState = res.data.list[0];
        }
      });
    },
    //确认收付款弹窗
    confirmHandle(rowData) {
      this.dialogId = rowData.type == "0" ? 6 : 5;
      this.orderId = rowData.autoid;
      this.orderDetail = {
        type: rowData.type,
        owner: rowData.type == "0" ? rowData.sellname : rowData.buyname,
        bankCardNo:
          rowData.type == "0" ? rowData.sellbannkcard : rowData.buybannkcard,
        depositBank: rowData.type == "0" ? rowData.sellkhyh : rowData.buykhyh,
        bankBranches: rowData.type == "0" ? rowData.sellkhzh : rowData.buykhzh,
        transferAmount: rowData.zj * 1
      };
    },
    //弹窗关闭
    onModelClose() {
      this.dialogId = null;
    },
    // 处理订单
    dealOrder(type, id) {
      if (type && id) {
        let api = type == "0" ? this.api.setsendok : this.api.setrealyok;
        this.request(api, {
          autoid: id,
          showLoading: true
        }).then(res => {
          if (res.code == "0") {
            this.successMsg(res.msg);
            this.getc2corder();
            this.getc2callorder(this.coinInfo.coinid);
            this.gettradorder(this.coinInfo.coinid);
          } else {
            this.errMsg(res.msg);
          }
          this.onModelClose();
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$border: 1px solid #e5e5e5;
.break-line {
  @include breakLine;
}
span {
  &.color-danger {
    color: $color-danger;
  }
  &.color-success {
    color: $color-success;
  }
}
.vertical-line {
  height: 360px;
  width: 1px;
  background: $bd-color;
  transform: scaleX(0.5);
  bottom: 0;
}
span {
  &.status-0 {
    color: #ccc;
  }
  &.status-1 {
    color: $main-font-color;
  }
  &.status-2 {
    color: $color-success;
  }
  &.status-3 {
    color: $color-danger;
  }
}
$mr: 11px;
.el-container {
  border-bottom: $border;
  .panel-head {
    margin-bottom: 9px;
    .thumb-30 {
      margin-right: $mr;
    }
  }
  .market-condition {
    span {
      display: inline-block;
      margin-left: 20px;
    }
    em {
      padding-right: 13px;
    }
  }
  .panel-container {
    .panel-header {
      margin: 40px 0 12px 0;
    }
  }
  .form-wrap {
    width: 48.65%;
    margin-top: 30px;
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
}
</style>
