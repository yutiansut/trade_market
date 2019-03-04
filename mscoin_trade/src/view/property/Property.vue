<template>
  <div class="content">
    <div class="table-panel">
      <div class="panel-head flex flex-v-center flex-between">
        <span class="font-16 font-bit-bold">
          <em>{{$t('assetsEquivalent')||"资产折合"}}：</em>
          <em class="color-danger font-bold">{{total*1}}&nbsp;CNY<i class="color-999 font-12"></i></em>
        </span>
        <div class="nav-link">
          <router-link
            to="/property/property_record"
            class="color-danger"
            v-text="$t('financialRecord')||'财务记录'"
          >
          </router-link>
          <router-link
            to="/property/address_admin"
            class="color-danger"
            v-text="$t('addressAdmin')||'地址管理'"
          >
          </router-link>
        </div>
      </div>
      <el-table
        v-loading='showLoading'
        :data='myPropetyData'
        :fit='true'
        max-height='500'
        :header-cell-style='changeStyle'
      >
        <el-table-column :label="$t('currencyType')||'币种'">
          <div
            class="flex flex-v-center"
            slot-scope="scope"
          >
            <img
              v-if="scope.row.logo"
              class="currency-thumb thumb-20"
              :src="scope.row.logo"
              alt=""
            >
            <span v-text="scope.row.name"></span>
          </div>
        </el-table-column>
        <el-table-column :label="$t('avaliableBalance')||'可用余额'">
          <template slot-scope='scope'>
            {{scope.row.usable*1}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('marketMoney')||'挂单金额'">
          <span slot-scope="scope">
            {{scope.row.disable*1}}
          </span>
        </el-table-column>
        <el-table-column :label="$t('total')||'累计'">
          <template slot-scope='scope'>
            {{scope.row.allnumber*1}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('equivalentRmb')||'估算为人民币'">
          <template slot-scope='scope'>
            {{scope.row.total*1}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation')||'操作'">
          <div
            class="operation"
            slot-scope="scope"
          >
            <span
              @click="showDialog(2,scope.row)"
              v-if="scope.row.name=='RNC'"
              class="color-danger"
            >转积分</span>|
            <span
              @click="showDialog(0,scope.row)"
              class="color-danger"
              v-text="$t('recharge')||'充值'"
            ></span>|
            <span
              @click="showDialog(1,scope.row)"
              class="color-success"
              v-text="$t('withdrawCoin')||'提币'"
            ></span>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <!-- 提币弹窗 -->
    <dialog-box
      :showDialog='showWidthDrawDialog'
      :model='formData'
      :dialogTitle='$t("withdrawCoin")||"提币"'
      @onDialogClose='dialogClose(0)'
    >
      <div class="font-bold mt-15">
        {{$t('avaliableBalance')+':'||'可用余额：'}}
        <span
          class="color-danger"
          v-html="myBalance"
        ></span>
      </div>
      <div class="font-bold mt-15">
        {{$t('todayMaxiumnWithdraw')+':'||'当日提现上限：'}}<span v-html="outLimit"></span>
      </div>
      <div class="font-bold mt-15">
        {{$t('withdrawMax')+':'||'单次提币上限：'}}<span v-html="oneOutLimit"></span>
      </div>
      <el-form
        label-position='top'
        @submit.native.prevent
      >
        <el-form-item :label="coinInfo.name+($t('withdrawAddress')||'提现地址')">
          <el-select
            v-model="formData.address"
            @change="onSelectChange"
            :placeholder='$t("walletAddrPlaceholder")||"请选择您的钱包地址"'
          >
            <el-option
              v-for="item in usdtAddr"
              :key='item.autoid'
              :label='item.title'
              :value="item.address"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='$t("addressName")||"地址名称"'>
          <el-input
            v-model="addressName"
            :placeholder='$t("addressNamePlaceholder")||"例如 My Address#1, 选填"'
          >
          </el-input>
        </el-form-item>
        <el-form-item :label='$t("withdrawAmount")||"提现数额（币数）"'>
          <el-input
            v-model="formData.number"
            :placeholder='$t("withdrawAmountPlaceholder")||"最少60USDT，一次最多1000000 USDT"'
          ></el-input>
        </el-form-item>
        <div
          class="tips font-12 color-danger"
          v-html="commisionLabel"
        ></div>

        <el-form-item :label="$t('label163')">
          <el-radio-group v-model="veriType">
            <el-radio
              :disabled='bindCellphone?false:true'
              label="0"
            >{{$t('mobileCode')||'手机验证码'}}</el-radio>
            <el-radio
              label='1'
              :disabled='bindEmail?false:true'
            >
              {{$t('label161')||'邮箱验证码'}}
            </el-radio>
            <el-radio
              label='2'
              :disabled='bindGoogle?false:true'
            >
              {{$t('googleCode')||'谷歌验证码'}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="veriType!='2'"
          :label='veriType=="0"?$t("mobileCode"):$t("emailCode")'
        >
          <div class="mobile-code-wrap p-rel">
            <el-input
              v-model="formData.code"
              name='code'
              :placeholder='veriType=="0"?$t("mobileCodePlaceholder"):$t("emailCodePlaceholder")'
              :disabled="myCode?false:true"
            >
            </el-input>
            <div
              @click='sendCode'
              class="mobile-code abs-v-center color-danger"
            >{{$t(this.codeTexti18n)}}{{second}}
            </div>
          </div>
        </el-form-item>
        <el-form-item
          v-else
          :label='$t("googleCode")||"谷歌验证码"'
        >
          <el-input
            v-model="formData.code"
            :placeholder='$t("fillGoogleCode")||"请填写谷歌验证码"'
          ></el-input>
        </el-form-item>
        <!-- <el-form-item :label='$t("fundPwd")||"资金密码"'>
          <el-input
            type='password'
            v-model="formData.password"
            :placeholder='$t("fundPwdPlaceholder")||"请填写资金密码"'
          ></el-input>
        </el-form-item> -->
        <button
          @click="onSubmit"
          class="btn-block btn-danger btn-large btn-active"
          v-text="$t('submitWithdraw')||'提交提现申请'"
        >
        </button>
      </el-form>
    </dialog-box>
    <!-- 充币弹窗 -->
    <charge-box
      :showCharge='showChargeDialog'
      @closeModel='dialogClose(1)'
      :coin='coinInfo.name'
      :chargeAddress='chargeAddress'
    >
    </charge-box>
    <!-- 转激活分弹窗 -->
    <dialog-box
      :dialogTitle='$t("label201")||"转积分"'
      :showDialog='showTransferDialog'
      @onDialogClose='dialogClose(2)'
    >
      <el-form
        label-position='top'
        @submit.native.prevent
      >
        <el-form-item :label='$t("label204")'>
          <el-input
            disabled
            v-model="userInfo.member"
            autocomplete='off'
            :placeholder='$t("label202")'
          >
          </el-input>
        </el-form-item>
        <el-form-item :label='$t("label205")'>
          <el-input
            v-model="transferFormData.account"
            autocomplete='off'
            :placeholder='$t("label203")'
          >
          </el-input>
        </el-form-item>
        <el-form-item :label='$t("label206")'>
          <el-input
            v-model="transferFormData.number"
            autocomplete='off'
            :placeholder='$t("label207")'
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item :label='$t("fundPwd")||"资金密码"'>
          <el-input
            type='password'
            v-model="transferFormData.password"
            :placeholder='$t("fundPwdPlaceholder")||"请填写资金密码"'
          ></el-input>
        </el-form-item> -->
        <button
          style="margin-top: 30px;"
          @click="confirmTransfer"
          class="btn-block btn-large btn-danger btn-active"
        >确认转出</button>
      </el-form>
    </dialog-box>
  </div>
</template>
<script>
import chargeBox from "@/components/dialogContent/chargeBox";
import { checkTradePassword } from "../../service/TradeService.js";

export default {
  components: { chargeBox },
  data() {
    return {
      showChargeDialog: false,
      showWidthDrawDialog: false,
      showTransferDialog: false,
      usdtAddr: [
        {
          title: "添加地址",
          address: "null"
        }
      ],
      veriType: "0",
      addressName: "",
      formData: {
        address: "",
        number: "",
        password: "",
        code: ""
      },
      transferFormData: {
        account: "",
        number: "",
        password: "",
        code: ""
      },
      bindCellphone: false,
      bindEmail: false,
      bindGoogle: false,
      errorLabel: {
        address: "label173",
        number: "label174",
        password: "label175",
        code: "label172"
      },
      total: 0,
      codeTexti18n: "getMsgCode",
      second: "",
      myCode: false,
      canGetCode: true,
      bindState: {},
      // 充币地址
      chargeAddress: "",
      // 充币二维码
      qrCode: null,
      coinInfo: {},
      getCodeTimes: 0,
      timer: null,
      myAccount: "",
      showLoading: false,
      //我的地址
      myPropetyData: null,
      userInfo: {},
      defaultType: "0"
    };
  },
  computed: {
    commisionLabel() {
      return `${this.$t("commision") || "手续费"}：${this.coinInfo.outgas *
        100}%+${this.coinInfo.tradgas}`;
    },
    myBalance() {
      return `${this.myAccount.usable * 1 || "0"}&nbsp;${this.coinInfo.name}`;
    },
    outLimit() {
      return `${this.myAccount.dayoutheight * 1 || "0"}&nbsp;${this.coinInfo
        .name || ""}`;
    },
    oneOutLimit() {
      return `${this.myAccount.oneoutheight * 1 || "0"}&nbsp;${this.coinInfo
        .name || ""}`;
    }
  },
  mounted() {
    this.getAccount();
    this.$bus.on("userLoaded", data => {
      this.userInfo = data;
    });
    this.getState();
  },
  methods: {
    changeStyle({ columnIndex }) {
      if (columnIndex == 5) {
        return "text-align:right;";
      }
    },
    confirmTransfer() {
      if (!this.transferFormData.account || !this.transferFormData.number) {
        this.errMsg(this.$t("请填写完整信息"));
        return;
      }
      if (isNaN(this.transferFormData.number)) {
        this.errMsg("label208");
        return false;
      }
      if (!this.storage.get("tradePasswordChecked")) {
        this.$prompt("请输入交易密码", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /\S/,
          inputType: "password",
          inputErrorMessage: "交易密码不能为空"
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
      } else {
        this.request(this.api.exchange, {
          account: this.transferFormData.account,
          number: this.transferFormData.number
        }).then(res => {
          if (res.code == 0) {
            this.successMsg(res.msg);
            this.getAccount();
            this.dialogClose(2);
          } else {
            this.errMsg(res.msg);
          }
        });
      }
    },
    initData() {
      this.formData = {
        address: "",
        number: "",
        password: "",
        code: ""
      };
      this.transferFormData = {
        account: "",
        number: "",
        password: "",
        code: ""
      };
      this.getCodeTimes = 0;
      this.canGetCode = true;
      this.codeTexti18n = "getMsgCode";
      clearInterval(this.timer);
      this.veriType = this.defaultType;
      this.addressName = "";
    },
    getAccount() {
      this.showLoading = true;
      return this.request(this.api.getaccount, {
        search: null
      }).then(res => {
        console.log(`我的资产:${JSON.stringify(res)}`);
        this.showLoading = false;
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return;
        }
        if (res.data && res.data.list) {
          this.myPropetyData = res.data.list;
          this.total = res.data.total;
          this.coinInfo = res.data.list[0];
        }
      });
    },
    //获取绑定配置
    getState() {
      this.request(this.api.saftyState).then(res => {
        if (res.code == "0") {
          this.bindState = res.data.list[0];
          this.bindCellphone = this.bindState.tel ? true : false;
          this.bindEmail = this.bindState.emailstate;
          this.bindGoogle = this.bindState.googlestate;
          if (this.bindCellphone && !this.bindEmail) {
            this.defaultType = "0";
          } else if (this.bindEmail && !this.bindCellphone) {
            this.defaultType = "1";
          }
          this.veriType = this.defaultType;
        }
      });
    },
    getDayNumber(coin) {
      this.request(this.api.getdaynumber, {
        coin: coin,
        showLoading: true
      }).then(res => {
        if (res.code == "0" && res.data.list && res.data.list[0]) {
          this.showWidthDrawDialog = true;
          this.myAccount = res.data.list[0];
        } else {
          this.errMsg(res.code);
        }
      });
    },
    showDialog(i, data) {
      let coin = data.name;
      this.coinInfo = data;
      this.getState();
      switch (i) {
        case 0:
          this.getAddress(coin);
          break;
        case 1:
          if (
            this.bindState.bankstate == "0" ||
            this.bindState.idcardstate < "2" ||
            this.bindState.tradstate == "0"
          ) {
            this.$confirm(this.$t("label166"), this.$t("label140"), {
              showClose: false,
              type: "warning",
              closeOnClickModal: false
            })
              .then(() => {
                this.navigateTo("/account/security");
              })
              .catch(() => {
                console.log("关闭");
              });
            return false;
          }
          this.getMyAddressList(coin);
          this.getDayNumber(coin);
          break;
        case 2:
          this.showTransferDialog = true;
          break;
      }
    },
    onSelectChange(val) {
      if (val == "null") {
        this.navigateTo("/property/address_admin");
      }
    },
    getMyAddressList(coin) {
      this.request(this.api.getoutaddress, {
        search: coin
      }).then(res => {
        if (res.code == "0") {
          res.data.list[0] && (this.usdtAddr = res.data.list);
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    getAddress(coin) {
      this.request(this.api.getaddress, { coin: coin, showLoading: true }).then(
        res => {
          if (res.code == "0") {
            this.showChargeDialog = true;
            this.chargeAddress = res.data.address[0]
              ? res.data.address[0].address
              : "";
          } else {
            this.errMsg(res.msg);
          }
        }
      );
    },
    // 获取手机验证码
    sendCode() {
      if (!this.canGetCode) return false;
      this.countDown();
      let type = this.veriType == "0" ? "4" : "5";
      this.request(this.api.code, {
        type: type,
        account: this.storage.get("token"),
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.myCode = true;
          this.successMsg(res.msg || "发送成功");
        } else {
          this.errMsg(res.msg || "获取验证码失败");
        }
      });
    },
    // 倒计时函数
    countDown() {
      this.timer = this.Util.timerCounter({
        onStart: t => {
          this.canGetCode = false;
          this.getCodeTimes += 1;
          this.second = `${t}s`;
          this.codeTexti18n = "countDown";
        },
        onCounting: t => {
          this.second = `(${t}s)`;
          this.codeTexti18n = "countDown";
        },
        onComplete: () => {
          this.canGetCode = true;
          this.getCodeTimes > 0 && (this.codeTexti18n = "tryAgain");
        }
      });
    },
    isValEmpty() {
      let result = false;
      for (let key in this.formData) {
        if (this.formData[key] == "") {
          this.errMsg(this.errorLabel[key]);
          return;
        } else {
          result = true;
        }
      }
      return result;
    },
    // 关闭弹窗
    dialogClose(i) {
      this.veriType = this.defaultType;
      switch (i) {
        case 1:
          this.showChargeDialog = false;
          break;
        case 0:
          this.showWidthDrawDialog = false;
          this.initData();
          break;
        case 2:
          this.showTransferDialog = false;
          this.initData();
          break;
      }
    },
    // 提交充币
    onSubmit() {
      if (!this.isValEmpty()) {
        return false;
      }
      if (isNaN(this.formData.number)) {
        this.errMsg("label142" || "提现数额必须位数字");
        return false;
      }
      if (this.myAccount.oneoutheight * 1 < this.formData.number) {
        this.errMsg("label143" || "提现数额不得超过单次提币限额");
        return false;
      }
      this.request(this.api.outcoin, {
        ...this.formData,
        coin: this.coinInfo.name,
        type: this.veriType,
        addressName: this.addressName || "",
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "操作成功");
          this.dialogClose(0);
          this.getAccount();
          this.initData();
        } else {
          this.errMsg(res.msg || "操作失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mt-15 {
  margin-top: 15px;
}
.table-panel {
  border: $default-border;
  border-bottom: none;
  margin-top: 12px;
  .panel-head {
    height: 50px;
    padding: 0 15px;
    border-bottom: $default-border;
    background-color: #fcfcfc;
  }
  .operation {
    text-align: right;
    span {
      display: inline-block;
      margin: 0 6px;
      cursor: pointer;
    }
  }
  .currency-thumb {
    margin-right: 8px;
  }
  .nav-link {
    a {
      margin-left: 30px;
    }
  }
}
.el-form {
  margin-top: 20px;
  .el-form-item {
    margin-bottom: 0;
    margin-top: 15px;
  }
  .el-select {
    width: 100%;
  }
  .tips {
    margin-top: 5px;
    line-height: 1.5;
  }
  button {
    margin-top: 15px;
  }
}

.mobile-code {
  width: 120px;
  text-align: right;
  right: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &.color-danger {
    color: $color-danger;
  }
}
</style>
