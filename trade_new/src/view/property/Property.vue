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
        <el-table-column
          prop="islock"
          :label="$t('marketMoney')||'挂单金额'"
        ></el-table-column>
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
        <el-table-column
          :width='$i18n.locale=="zh-CN"?"120":"230"'
          :label="$t('operation')||'操作'"
        >
          <div
            class="operation"
            slot-scope="scope"
          >
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
        <div class="tips font-12 color-999">
          <template v-if="$i18n.locale=='zh-CN'">USDT提现地址支持比特币BTC和以太坊ETH ERC20格式</template>
          <template v-if="$i18n.locale=='en-US'">USDT address supports BTC formated address and ETH ERC200 formated address</template>
        </div>
        <el-form-item :label='$t("addressName")||"地址名称"'>
          <el-input
            v-model="addressName"
            :placeholder='$t("addressNamePlaceholder")||"例如 My Address#1, 选填"'
          >
          </el-input>
        </el-form-item>
        <div class="tips font-12 color-999">
          <template v-if="$i18n.locale=='zh-CN'">提现成功后，系统会记住您的提现地址，以便下次使用，填写“地址名称”可便于您分辨钱包地址</template>
          <template v-if="$i18n.locale=='en-US'">After the withdrawal is done, the system will save your withdrawal address for the next time,
            fill in 'address name' will help you distinguish wallet addresses better.
          </template>
        </div>
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
        <el-form-item :label='$t("fundPwd")||"资金密码"'>
          <el-input
            type='password'
            v-model="formData.password"
            :placeholder='$t("fundPwdPlaceholder")||"请填写资金密码"'
          ></el-input>
        </el-form-item>
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
          </el-radio-group>
        </el-form-item>
        <el-form-item :label='veriType=="0"?$t("mobileCode"):$t("emailCode")'>
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
          <!-- <el-input v-model="formData.mobileCode" :placeholder='$t("mobileCodePlaceholder")||"请填写短信验证码"'></el-input> -->
        </el-form-item>
        <el-form-item :label='$t("googleCode")||"谷歌验证码"'>
          <el-input
            v-model="formData.google"
            :placeholder='$t("fillGoogleCode")||"请填写谷歌验证码"'
          ></el-input>
        </el-form-item>
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
      :chargeAddress='chargeAddress'
    >
    </charge-box>
  </div>
</template>
<script>
import chargeBox from "@/components/dialogContent/chargeBox";
export default {
  components: { chargeBox },
  data() {
    return {
      showChargeDialog: false,
      showWidthDrawDialog: false,
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
        code: "",
        google: ""
      },
      bindCellphone: false,
      bindEmail: false,
      errorLabel: {
        address: "地址不能为空",
        number: "数量不能为空",
        password: "密码不能为空",
        code: "手机验证码不能为空",
        google: "谷歌验证码不能为空"
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
      myPropetyData: null
    };
  },
  computed: {
    commisionLabel() {
      return `${this.$t("commision") || "手续费"}：${this.coinInfo.outgas *
        1}%`;
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
    this.getState();
  },
  methods: {
    changeStyle({ columnIndex }) {
      if (columnIndex == 5) {
        return "text-align:right;";
      }
    },
    getAccount() {
      this.showLoading = true;
      return this.request(this.api.getaccount, {
        search: null
      }).then(res => {
        console.log(`我的资产:${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.code);
        if (res.data && res.data.list) {
          this.myPropetyData = res.data.list;
          this.total = res.data.total;
          this.coinInfo = res.data.list[0];
          this.showLoading = false;
        }
      });
    },
    //获取绑定配饰
    getState() {
      this.request(this.api.saftyState).then(res => {
        if (res.code == "0") {
          this.bindState = res.data.list[0];
          this.bindCellphone = this.bindState.tel ? true : false;
          this.bindEmail = this.bindState.emailstate;
          if (this.bindCellphone && !this.bindEmail) {
            this.veriType = "0";
          } else if (this.bindEmail && !this.bindCellphone) {
            this.veriType = "0";
          }
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
      switch (i) {
        case 0:
          this.getAddress(coin);
          break;
        case 1:
          if (
            this.bindState.bankstate == "0" ||
            this.bindState.idcardstate < "2" ||
            this.bindState.googlestate == "0" ||
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
    dialogClose(i) {
      switch (i) {
        case 1:
          this.showChargeDialog = false;
          break;
        case 0:
          this.showWidthDrawDialog = false;
          this.canGetCode = true;
          this.second = "";
          this.codeTexti18n = "getMsgCode";
          for (let key in this.formData) {
            this.formData[key] == "";
          }
          this.timer && clearInterval(this.timer);
          break;
      }
    },
    // 提交表单
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
