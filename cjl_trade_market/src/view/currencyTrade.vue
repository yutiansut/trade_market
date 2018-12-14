<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <!-- 左侧表格栏目 -->
            <el-aside width="24%">
              <ce-aside-comp
                @onAsideTabChange='onAsideTabChange'
                @onRowClick='getRowData'>
              </ce-aside-comp>
            </el-aside>
            <!-- 主要body -->
            <el-main v-loading='showLoading'>
              <!-- K线图头部 -->
              <div class="panel-head flex flex-v-center">
                <img class="currency-thumb thumb-30" src="" alt="">
                <div class="heading">{{tradecoin}}/{{maincoin}}</div>
                <div class="market-val flex flex-v-center">
                  <span class="font-16" >{{currentCoinInfo.prise|toFix()}}</span>
                  <span class="font-14 color-666">≈0.05 CNY </span>
                </div>
                <div class="market-condition font-12">
                  <span>
                    <em class="color-666" v-text="$t('increase')||'涨幅'"></em>
                    <i
                      :class="currentCoinInfo.rise*1>0?'color-danger':'color-success'"
                      v-text='currentCoinInfo.rise*1+"%"'>
                    </i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('high')||'高'"></em>
                    <i>{{currentCoinInfo.height|toFix()}}</i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('low')||'低'"></em>
                    <i>{{currentCoinInfo.low|toFix()}}</i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('dayVol')||'24H量'"></em>
                    <i>{{currentCoinInfo.number|toFix()}}&nbsp;{{tradecoin}}</i>
                  </span>
                </div>
              </div>
              <!-- K线图占位 -->
              <div id='kMap' class="k-map">
                <!-- <iframe id='iframe' :src="iframUrl" width="100%" height="100%" frameborder="0"></iframe> -->
              </div>
              <div class="panel-container flex flex-between">
                <div class="content-lf flex flex-between">
                  <!-- 买入 -->
                  <div class="form-wrap">
                    <div class="font-18 font-bit-bold" v-html="buyingLabel"></div>
                    <div class="break-line"></div>
                    <div class="account flex flex-between">
                      <span class="balance" v-html="availabelBalance"></span>
                      <router-link to='./property' v-text="$t('recharge')||'充值'"></router-link>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('buyingRate')||'买入价'"></label>
                      <el-input v-model="buyFormData.price">
                        <span class="unit" slot="suffix" v-text="maincoin"></span>
                      </el-input>
                      <em class="hint font-12">≈0.05</em>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('buyVol')||'买入量'"></label>
                      <el-input v-model="buyFormData.orderVol">
                        <span class="unit" slot="suffix" v-text="tradecoin"></span>
                      </el-input>
                    </div>
                    <div class="total flex flex-between">
                      <span v-text="totalLabel"></span>
                      <i v-text="buyTotal"></i>
                    </div>
                    <button
                      @click="buyHandle"
                      class="btn-block btn-large btn-danger btn-active"
                      v-html="buyingLabel">
                    </button>
                  </div>
                  <!-- 卖出 -->
                  <div class="form-wrap">
                    <div class="font-18 font-bit-bold" v-html="sellingLabel"></div>
                    <div class="break-line"></div>
                    <div class="account flex flex-between">
                      <span class="balance" v-html="availabelAmount"></span>
                      <router-link to='./property' v-text="$t('recharge')||'充值'"></router-link>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('sellingRate')||'卖出价'"></label>
                      <el-input v-model="sellFormData.price">
                        <span class="unit" slot="suffix" v-text="maincoin"></span>
                      </el-input>
                      <em class="hint font-12">≈0.05</em>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('sellVol')||'卖出量'"></label>
                      <el-input v-model="sellFormData.orderVol">
                        <span class="unit" slot="suffix" v-text="tradecoin"></span>
                      </el-input>
                    </div>
                    <div class="total flex flex-between">
                      <span v-text="totalLabel"></span>
                      <i v-text="sellTotal"></i>
                    </div>
                    <button @click="sellHandle"
                      class="btn-block btn-large btn-success btn-active"
                      v-html="sellingLabel">
                    </button>
                  </div>
                </div>
                <!-- 交易行情 -->
                <div class="trade-market">
                  <div class="flex flex-between flex-v-center">
                    <span class='font-18'>
                      <i v-html="latestPrice"></i>
                      <!-- <em class="font-12 color-666">≈ 0.05 CNY</em> -->
                    </span>
                    <!-- <router-link to=''>更多</router-link> -->
                  </div>
                  <div class="break-line"></div>
                  <div class="table">
                    <div class="thead">
                      <span v-text='$t("stalls")||"档位"'></span>
                      <span v-text='priceLabel'></span>
                      <span v-text='amountLabel'></span>
                      <span class="txt-rt" v-text='totalLabel'></span>
                    </div>
                    <!-- 卖出五档图 -->
                    <div class="tbody" v-if="latestSoldData&&latestSoldData[0]">
                      <template v-for="(item,index) in latestSoldData">
                        <div @click="onLatestClick(item)" class="row flex p-rel"
                          :key='index'>
                          <div :style='{width:(item.total/sellListTotal)*100+"%"}' class="progress p-abs"></div>
                          <span class="column color-success">
                            {{$t('sell')}}&nbsp;{{latestSoldData.length-index}}
                          </span>
                          <span style="width:25%;" class="column" v-text="item.price"></span>
                          <span class="column" v-text="item.number"></span>
                          <span class="column txt-rt" v-text="item.total"></span>
                        </div>
                      </template>
                    </div>
                    <div class="no-data" v-else v-text="$t('label108')"></div>
                  </div>
                  <div class="break-line m-top-10 m-bottom-10"></div>
                  <div class="table">
                    <!-- 买入五档图 -->
                    <div class="tbody" v-if="latestBuyData&&latestBuyData[0]">
                      <template v-for="(item,index) in latestBuyData">
                        <div @click="onLatestClick(item)" class="row flex flex-between p-rel" :key='index'>
                          <div :style='{width:(item.total/sellListTotal)*100+"%"}' class="progress p-abs"></div>
                          <span class="column color-danger" v-html="$t('buy')+'&nbsp;'+(index+1)">
                          </span>
                          <span class="column" v-text="item.price"></span>
                          <span class="column" v-text="item.number"></span>
                          <span class="column txt-rt" v-text="item.total"></span>
                        </div>
                      </template>
                    </div>
                    <div class="no-data" v-else v-text="$t('label108')"></div>
                  </div>
                </div>
              </div>
              <div class="panel-container flex flex-between">
                <!-- 左侧内容 -->
                <div class="content-lf">
                    <!-- 当前委托 -->
                    <div class="panel-title font-18 font-bit-bold"
                      v-text="$t('currEnstrument')||'当前委托'"></div>
                    <template v-if="userData.isLogin">
                      <el-table stripe 
                        :data='currentDeclareData'>
                        <el-table-column width="140"
                          :label='$t("date")||"日期"'
                          prop='writedate'>
                        </el-table-column>
                        <el-table-column width='100'
                          :label='$t("type")||"类型"'>
                          <span slot-scope="scope"
                            :class="scope.row.type=='0'?'color-danger':'color-success'"
                            v-text="scope.row.type=='0'?$t('buy'):$t('sell')" >
                          </span>
                        </el-table-column>
                        <el-table-column
                          :label='priceLabel'
                          prop='price'>
                        </el-table-column>
                        <el-table-column
                          :label='marketVolLabel'
                          prop='number'>
                        </el-table-column>
                        <el-table-column
                          :label='$t("volumn")||"成交量"'
                          prop='dealnumber'>
                        </el-table-column>
                        <el-table-column
                          :width="$i18n.locale==='zh-CN'?'60':'120'"
                          :label='$t("operation")||"操作"'>
                          <span class="handle color-danger"
                            @click='cancelOrder(scope.row.id)'
                            slot-scope="scope"
                            v-text="$t('withdrawed'||'撤单')">
                          </span>
                        </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                    <!-- 历史委托 -->
                    <div class="panel-title font-18 font-bit-bold" v-text="$t('oldEnstrument')||'历史委托'"></div>
                    <template v-if="userData.isLogin">
                      <el-table stripe
                        :data='historicalDeclareData'
                        max-height='500'>
                        <el-table-column width="140"
                          :label='$t("date")||"日期"' prop='writedate'>
                        </el-table-column>
                        <el-table-column width='100'
                          :label='$t("type")||"类型"'>
                          <span slot-scope="scope"
                            :class="scope.row.state=='0'?'color-danger':'color-success'"
                            v-text="scope.row.state=='0'?$t('buy'):$t('sell')" >
                          </span>
                        </el-table-column>
                        <el-table-column
                          :label='priceLabel'>
                          <template slot-scope="scope">
                            {{scope.row.price|toFix()}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          :label='marketVolLabel'>
                          <template slot-scope="scope">
                            {{scope.row.number|toFix()}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          :label='$t("volumn")||"成交量"'>
                          <template slot-scope="scope">
                            {{scope.row.dealnumber|toFix()}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          :width="$i18n.locale=='zh-CN'?'100':'120'"
                          :label='$t("operation")||"操作"'>
                          <span class="handle color-danger"
                            slot-scope="scope"
                            v-text="$t('completed'||'已完成')">
                          </span>
                        </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                </div>
                <!-- 右侧内容(成交) -->
                <div class="content-rt">
                  <div class="panel-title flex flex-between">
                    <span class="font-18 font-bit-bold" v-text="$t('tradeRecord')||'成交历史'"></span>
                    <!-- <router-link to=''>更多</router-link> -->
                  </div>
                  <template v-if="userData.isLogin">
                    <div class="break-line"></div>
                    <el-table style="font-weight:normal"
                      :data='historicalBuyData'
                      :cell-style='myCellStyle'
                      max-height='700'
                      stripe>
                      <el-table-column width='100' :label='$t("time")||"时间"'>
                        <span class="color-danger" slot-scope="scope" v-text="scope.row.writedate"></span>
                      </el-table-column>
                      <el-table-column width='150'
                        :label='priceLabel'>
                        <template slot-scope="scope">
                          {{scope.row.price|toFix()}}
                        </template>
                      </el-table-column>
                      <el-table-column width='120'
                        :label='amountLabel'>
                        <template slot-scope="scope">
                          {{scope.row.number|toFix()}}
                        </template>
                      </el-table-column>
                      <el-table-column :label='totalLabel'>
                        <div slot-scope="scope" v-text="scope.row.total"></div>
                      </el-table-column>
                    </el-table>
                  </template>
                  <unlogin-tip></unlogin-tip>
                </div>
              </div>
            </el-main>
        </el-container>
        <!-- 充币弹窗 -->
        <!-- <charge-box
          :showCharge='show'
          :chargeAddress='chargeAddress' 
          @closeModel='onClose'>
        </charge-box> -->
        <my-footer></my-footer>
    </div>
</template>
<script>
import mainCoinModel from "@/model/allCoinModel.js";
import { Loading } from "element-ui";
import { randomString } from "@/assets/js/common.js";
let webSocket = null;
window.onbeforeunload = () => {
  webSocket.close();
};
export default {
  data() {
    return {
      show: false,
      showLoading: false,
      userData: this.userModel,
      buyFormData: {
        price: 0,
        orderVol: 0
      },
      sellFormData: {
        price: 0,
        orderVol: 0
      },
      dataMaxLen: 5,
      currentId: 1,
      tableData: null,
      //最新买入
      latestBuyData: [],
      //最新卖出
      latestSoldData: [],
      //当日委托
      currentDeclareData: null,
      //历史委托
      historicalDeclareData: null,
      //成交历史
      historicalBuyData: null,
      maincoin: null,
      tradecoin: null,
      // 余额
      myBlance: 0,
      //当日可用
      myAvailable: "",
      // 当前币种
      currentCoinInfo: "",
      // 充币地址
      chargeAddress: "",
      // 充币二维码
      qrCode: null,
      bindState: null,
      // 是否能够交易
      canTrade: false,
      routeParam: null,
      isGetSocketMsg: false,
      iframUrl: "./static/kline.html?"
    };
  },
  mounted() {
    // if (JSON.stringify(this.$route.query) != "{}") {
    //   this.routeParam = JSON.parse(this.$route.query.data);
    // }
    this.$bus.on("tradeCoinLoad", coinData => {
      // if (this.routeParam) {
      //   this.loadData(this.routeParam);
      // } else {
      //   this.loadData(coinData);
      // };
      this.loadData(coinData);
    });
  },
  beforeRouteLeave(to, from, next) {
    if (webSocket) {
      webSocket.close();
      webSocket = null;
    }
    next();
  },
  methods: {
    // 更新买入/卖出socket
    updateLastestData(token, maincoin, tradecoin) {
      if ("WebSocket" in window) {
        this.updateListBySocket(token, maincoin, tradecoin);
      } else {
        const buyOrder = this.request(this.api.buyorder, params);
        // 卖出五档
        const sellOrder = this.request(this.api.sellorder, params);
        // 交易记录
        const allOrder = this.request(this.api.gettoporder, params);
        Promise.all([buyOrder, sellOrder, allOrder])
          .then(res => {
            this.showLoading = false;
            ajaxDone = true;
            let [buyOrder, sellOrder, allOrder] = [...res];
            this.latestBuyData = this.Util.sumCalc(
              buyOrder.data.list,
              "price",
              "number"
            );
            this.latestSoldData = this.Util.sumCalc(
              sellOrder.data.list,
              "price",
              "number"
            );
            this.historicalBuyData = this.Util.sumCalc(
              allOrder.data.list,
              "price",
              "number"
            );
          })
          .catch(err => {
            console.log(err);
          });
        this.updateListByAjax(maincoin, tradecoin);
      }
    },
    // 通过socket 刷新数据
    updateListBySocket(token, maincoin, tradecoin) {
      console.log("浏览器支持websocket");
      if (webSocket) {
        webSocket.send(`${token}_${maincoin}_${tradecoin}`);
        return false;
      }
      webSocket = new WebSocket(
        `${this.api.socketUrl}${token ||
          randomString(32)}/${maincoin}_${tradecoin}`
      );
      webSocket.onopen = () => {
        console.log("socket 已经连接，可以发送数据");
        webSocket.send(`${token}_${maincoin}_${tradecoin}`);
      };
      // 接收数据
      webSocket.onmessage = event => {
        let msg = JSON.parse(event.data);
        this.latestBuyData = this.Util.sumCalc(msg.buy, "price", "number");
        this.latestSoldData = this.Util.sumCalc(msg.sell, "price", "number");
        this.historicalBuyData = this.Util.sumCalc(msg.top, "price", "number");
      };
      webSocket.onerror = err => {
        console.log(err);
      };
      webSocket.onclose = () => {
        console.log("socket 连接关闭");
      };
    },
    // 通过轮询刷新数据
    updateListByAjax(maincoin, tradecoin) {
      let ajaxDone = true;
      let params = {
        maincoin: maincoin,
        tradcoin: tradecoin
      };
      setInterval(() => {
        if (ajaxDone) {
          // 买入五档
          const buyOrder = this.request(this.api.buyorder, params);
          // 卖出五档
          const sellOrder = this.request(this.api.sellorder, params);
          // 交易记录
          const allOrder = this.request(this.api.gettoporder, params);
          Promise.all([buyOrder, sellOrder, allOrder])
            .then(res => {
              this.showLoading = false;
              ajaxDone = true;
              let [buyOrder, sellOrder, allOrder] = [...res];
              this.latestBuyData = this.Util.sumCalc(
                buyOrder.data.list,
                "price",
                "number"
              );
              this.latestSoldData = this.Util.sumCalc(
                sellOrder.data.list,
                "price",
                "number"
              );
              this.historicalBuyData = this.Util.sumCalc(
                allOrder.data.list,
                "price",
                "number"
              );
            })
            .catch(err => {
              console.log(err);
            });
        }
        ajaxDone = false;
      }, 3000);
    },
    // 单列样式
    myCellStyle() {
      return "padding:6px 0 !important;border:none";
    },
    onLatestClick(data) {
      this.buyFormData.price = data.price * 1;
      this.sellFormData.price = data.price * 1;
    },
    onAsideTabChange() {
      this.routeParam = null;
    },
    loadData(data) {
      this.showLoading = true;
      this.currentCoinInfo = data;
      this.maincoin = data.maincoinid;
      this.tradecoin = data.coinid;
      this.Util.setCookie("maincoinname", data.maincoinid);
      this.Util.setCookie("tradcoinname", data.coinid);
      this.iframUrl = `${this.iframUrl}t=${new Date().getTime()}`;
      //获取可用;
      Promise.all([
        this.getAvailabel(this.maincoin),
        this.getAvailabel(this.tradecoin)
      ])
        .then(res => {
          console.log(`可用：${JSON.stringify(res)}`);
          this.myBlance = res[0].usable;
          this.myAvailable = res[1].usable;
        })
        .catch(err => {
          this.errMsg(err);
        });
      // 获取币种交易信息
      this.awaitResult(this.maincoin, this.tradecoin)
        .then(res => {
          let [entrustData, orderData] = [...res];
          if (entrustData) {
            this.currentDeclareData = this.Util.sumCalc(
              entrustData.data.list,
              "price",
              "number"
            );
          }
          orderData && (this.historicalDeclareData = orderData.data.list);
        })
        .catch(err => {
          console.log(err);
        });
      this.updateLastestData(
        this.storage.get("token"),
        this.maincoin,
        this.tradecoin
      );
    },

    //页面请求
    awaitResult(maincoin, tradecoin) {
      let params = {
        maincoin: maincoin,
        tradcoin: tradecoin
      };
      // 获取当前委托
      const entrustData = this.request(this.api.getentrust, params).then(
        res => {
          if (res.code == "0") {
            return Promise.resolve(res);
          } else {
            return Promise.reject(res.mg);
          }
        }
      );
      // 获取历史委托
      const orderData = this.request(this.api.gethistoryorder, params).then(
        res => {
          if (res.code == "0") {
            return Promise.resolve(res);
          } else {
            return Promise.reject(res.mg);
          }
        }
      );
      return Promise.all([entrustData, orderData]);
    },
    // 获取账户状态
    getState() {
      return this.request(this.api.saftyState).then(res => {
        console.log(`账号状态：${JSON.stringify(res)}`);
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        }
        if (res.data && res.data.list) {
          this.bindState = res.data.list[0];
          this.canTrade = this.canTradeCheck(this.bindState);
        }
      });
    },
    // 获取可用
    getAvailabel(coin) {
      return this.request(this.api.getdaynumber, {
        coin: coin
      }).then(res => {
        this.showLoading = false;
        if (res.code == "0") {
          return Promise.resolve(res.data.list[0]);
        } else {
          return Promise.reject(res.msg);
        }
      });
    },
    // 获取充值地址
    getchargeAddress(coin) {
      this.request(this.api.getaddress, { coin: coin }).then(res => {
        console.log(`充币地址${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        this.chargeAddress = res.data.address[0].address;
      });
    },
    // 交易操作
    tradeHandle(api, params) {
      return this.request(api, {
        maincoin: params.maincoin || "",
        tradcoin: params.tradecoin || "",
        prise: params.price || "",
        number: params.number || "",
        showLoading: true
      }).then(res => {
        console.log(`操作结果：${JSON.stringify(res)}`);
        if (res.code == "0") {
          this.successMsg(res.msg || "操作成功");
          this.request(this.api.getentrust, {
            maincoin: this.maincoin,
            tradcoin: this.tradecoin
          }).then(res => {
            if (res.code == "0") {
              this.currentDeclareData = res.data.list;
            }
          });
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    // 删除列表某一项
    delItemFromList(id, listArr) {
      listArr.map((item, index) => {
        if (item.id == id) {
          listArr.splice(index, 1);
          return listArr;
        }
      });
    },
    // 取消订单
    cancelOrder(id) {
      this.showLoading = true;
      this.request(this.api.clearentrust, { id: id }).then(res => {
        console.log(`操作结果：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        this.successMsg(res.msg);
        this.delItemFromList(id, this.currentDeclareData);
        this.showLoading = false;
      });
    },
    //校验
    valideForm(number, price) {
      if (isNaN(price) || !price) {
        this.errMsg("请输入有效价格");
        return false;
      }
      if (!number) {
        this.errMsg("买入量/卖出量不能为空");
        return false;
      }
      if (!this.Util.isInt(number)) {
        this.errMsg("买入量/卖出量必须是整数");
        return false;
      }
      return true;
    },
    buyHandle() {
      let price = this.buyFormData.price * 1;
      let num = this.buyFormData.orderVol * 1;
      if (!this.userData.isLogin) {
        this.errMsg("请登录后操作");
        // } else if (!this.canTrade) {
        //   this.$alert("为确保资金安全,请先进行安全认证！", "提示", {
        //     confirmButtonText: "去认证",
        //     type: "warning"
        //   }).then(() => {
        //     this.navigateTo("/account/security");
        //   });
      } else if (this.valideForm(num, price)) {
        this.tradeHandle(this.api.forbuy, {
          maincoin: this.maincoin,
          tradecoin: this.tradecoin,
          number: this.buyFormData.orderVol,
          price: this.buyFormData.price
        });
      }
    },
    sellHandle() {
      let price = this.sellFormData.price * 1;
      let num = this.sellFormData.orderVol * 1;
      if (!this.userData.isLogin) {
        this.errMsg("请登录后操作");
        // } else if (!this.canTrade) {
        //   this.$alert("为确保资金安全,请先进行安全认证！", "提示", {
        //     confirmButtonText: "去认证",
        //     type: "warning"
        //   }).then(() => {
        //     this.navigateTo("/account/security");
        //   });
      } else if (this.valideForm(num, price)) {
        this.tradeHandle(this.api.forsell, {
          maincoin: this.maincoin,
          tradecoin: this.tradecoin,
          number: this.sellFormData.orderVol,
          price: this.sellFormData.price
        });
      }
    },
    //表格列点击
    getRowData(data) {
      // if (mainCoinModel.tradecoinid == data.coinid) return false;
      mainCoinModel.tradecoinid = data.coinid;
      mainCoinModel.coinid = data.maincoinid;
      this.loadData(data);
    },
    // 是否能够交易
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
    // 打开弹窗
    showChargeBox() {
      if (this.bindState.bankstate == 0) {
        this.$confirm("您还没有绑定银行卡", "提示", {
          confirmButtonText: "去绑定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.navigateTo("/account/security");
        });
        return;
      } else if (
        this.chargeAddress == "" ||
        mainCoinModel.tradecoinid != this.tradecoin
      ) {
        this.getchargeAddress(this.tradecoin);
      }
      this.show = true;
    }
  },
  computed: {
    amountLabel() {
      return `${this.$t("amount") || "数量"}(${this.tradecoin})`;
    },
    buyingLabel() {
      return `${this.$t("buy") || "买入"}&nbsp;${this.tradecoin}`;
    },
    sellingLabel() {
      return `${this.$t("sell") || "卖出"}&nbsp;${this.tradecoin}`;
    },
    priceLabel() {
      return `${this.$t("price") || "价格"}(${this.maincoin})`;
    },
    totalLabel() {
      return `${this.$t("total") || "累计"}(${this.maincoin})`;
    },
    marketVolLabel() {
      return `${this.$t("marketVol") || "挂单量"}(${this.tradecoin})`;
    },
    //可用余额
    availabelBalance() {
      let num = this.myBlance * 1;
      return `${this.$t("avilable") || "可用"}&nbsp;${num || 0}&nbsp;${
        this.maincoin
      }`;
    },
    //可兑换额度
    availabelAmount() {
      return `${this.$t("canExchange") || "可兑换"}&nbsp;${this.myAvailable *
        1 || 0}&nbsp;${this.tradecoin}`;
    },
    // 最新价
    latestPrice() {
      // {{$t('latestPrice')||'最新价'}}&nbsp;0.0000011422&nbsp;BTC
      return `${this.$t("latestPrice") || "最新价"}&nbsp;${this.currentCoinInfo
        .prise * 1}`;
    },
    //总数
    buyTotal() {
      return this.Util.accMul(
        this.buyFormData.price,
        this.buyFormData.orderVol
      );
    },
    //总数
    sellTotal() {
      this.Util.accMul(this.sellFormData.price, this.sellFormData.orderVol);
    },
    //最新买入总计
    buyListTotal() {
      let total = 0;
      this.latestBuyData.map(item => {
        total += item.total * 1;
      });
      return total;
    },
    //最新卖出总计
    sellListTotal() {
      let total = 0;
      this.latestSoldData.map(item => {
        total += item.total * 1;
      });
      return total;
    }
  },
  watch: {
    buyFormData: {
      handler: function(val, oldVal) {
        this.buyBtnDisabled = false;
      },
      deep: true
    }
    // $route(to, from) {
    //   this.loadData(JSON.parse(to.query.data));
    // }
  }
};
</script>
<style lang="scss" scoped>
$mr: 11px;
.break-line {
  @include breakLine;
}
$border: 1px solid #e5e5e5;
.el-container {
  border-bottom: $border;
}

.trade-market {
  width: 34%;
  > div:first-child {
    margin-bottom: 12px;
  }
}
.vertical-line {
  height: 360px;
  width: 1px;
  background: $bd-color;
  transform: scaleX(0.5);
  bottom: 0;
}
.no-data {
  line-height: 60px;
  text-align: center;
  color: #999;
}
.table {
  .thead {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 0 8px;
    span {
      display: block;
      flex: 2;
      &:first-child {
        flex: 1;
      }
      &:last-child {
        flex: 1;
      }
    }
  }
  .tbody {
    max-height: 175px;
    overflow: auto;
    .column {
      position: relative;
      display: block;
      flex: 2;
      &:nth-child(2) {
        flex: 1;
      }
      &:last-child {
        flex: 1;
      }
    }
  }
  .row {
    height: 35px;
    line-height: 35px;
    padding: 0 8px;
    justify-content: space-between;
    &:hover {
      background: #f1f1f1 !important;
    }
    .progress {
      background: rgba(239, 253, 244, 1);
      opacity: 0.4;
      top: 0;
      right: 0;
      height: 100%;
    }
  }
}
.panel-head {
  @include textVcenter;
  border-bottom: 1px solid #fcfcfc;
  .heading {
    font-weight: 500;
    font-size: $font-large;
  }
  .currency-thumb {
    margin-right: $mr;
  }
  .market-val {
    margin-left: $mr;
    span:first-child {
      font-weight: 500;
      margin-right: $mr;
    }
  }
  .market-condition {
    font-size: 14px;
    span {
      padding-left: 23px;
    }
    i {
      padding-left: $mr;
    }
  }
}
.k-map {
  height: 414px;
  margin-bottom: 25px;
}
.form-wrap {
  width: 48%;
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
.panel-container {
  .panel-title {
    margin-top: 30px;
    margin-bottom: 12px;
  }
  .content-lf {
    width: 64%;
    .handle {
      cursor: pointer;
    }
  }
  .content-rt {
    width: 34%;
  }
}
</style>
