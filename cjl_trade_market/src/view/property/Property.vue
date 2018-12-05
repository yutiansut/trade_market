<template>
    <div class="content">
        <div class="table-panel">
            <div class="panel-head flex flex-v-center flex-between">
                <span class="font-16 font-bit-bold">
                    <em>{{$t('assetsEquivalent')||"资产折合"}}：</em>
                    <em>0.0000202 BTC <i class="color-999 font-12">≈ 0 CNY</i></em>
                </span>
                <div class="nav-link">
                    <router-link
                      to="/property/property_record" class="color-danger"
                      v-text="$t('financialRecord')||'财务记录'">
                    </router-link>
                    <router-link
                      to="/property/address_admin"
                      class="color-danger"
                      v-text="$t('addressAdmin')||'地址管理'">
                    </router-link>
                </div>
            </div>
            <el-table :data='myPropetyData' :header-cell-style='changeStyle'>
                <el-table-column :label="$t('currencyType')||'币种'">
                    <div class="flex flex-v-center" slot-scope="scope">
                        <img class="currency-thumb thumb-20" src="" alt="">
                        <span v-text="scope.row.name"></span>
                    </div>
                </el-table-column>
                <el-table-column prop="usable" :label="$t('avaliableBalance')||'可用余额'"></el-table-column>
                <el-table-column prop="amount" :label="$t('marketMoney')||'挂单金额'"></el-table-column>
                <el-table-column prop="allnumber" :label="$t('total')||'总计'"></el-table-column>
                <el-table-column prop="usdt" :label="$t('equivalentRmb')||'估算为人民币'"></el-table-column>
                <el-table-column width='150' :label="$t('operation')||'操作'">
                    <div class="operation"  slot-scope="scope">
                        <span @click="showDialog(0)" class="color-danger" v-text="$t('rechargeCoin')||'充币'"></span>
                        <span @click="showDialog(1)" class="color-success" v-text="$t('withdrawCoin')||'提币'"></span>
                        <span v-text="$t('transaction')||'交易'"></span>
                    </div>
                </el-table-column>
            </el-table>
        </div>
        <!-- 提币弹窗 -->
        <dialog-box 
          :showDialog='showWidthDrawDialog'
          :model='formData'
          :dialogTitle='$t("withdrawCoin")||"提币"'
          @onDialogClose='dialogClose(0)'>
          <div class="font-bold mt-15">
            {{$t('avaliableBalance')+':'||'可用余额：'}}
            <span class="color-danger">0 USDT</span>
          </div>
          <div class="font-bold mt-15">
            {{$t('todayMaxiumnWithdraw')+':'||'当日提现上限：'}}<span>10000/10000 USDT</span>
          </div>
          <el-form label-position='top' @submit.native.prevent>
            <el-form-item :label="'USDT'+($t('withdrawAddress')||'提现地址')">
              <el-select v-model="formData.cid" :placeholder='$t("walletAddrPlaceholder")||"请输入您的钱包地址"'>
                <el-option v-for="item in formData.usdtAddr" 
                  :key='item.value' :label='item.label' :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="tips font-12 color-999">
              <template v-if="$i18n.locale=='zh-CN'">USDT提现地址支持比特币BTC和以太坊ETH ERC20格式</template>
              <template v-if="$i18n.locale=='en-US'">USDT address supports BTC formated address and ETH ERC200 formated address</template>
            </div>
            <el-form-item :label='$t("addressName")||"地址名称"'>
              <el-input v-model="formData.addressName" :placeholder='$t("addressNamePlaceholder")||"例如 My Address#1, 选填"'></el-input>
            </el-form-item>
            <div class="tips font-12 color-999">
              <template v-if="$i18n.locale=='zh-CN'">提现成功后，系统会记住您的提现地址，以便下次使用，填写“地址名称”可便于您分辨钱包地址</template>
              <template v-if="$i18n.locale=='en-US'">After the withdrawal is done, the system will save your withdrawal address for the next time,
                fill in 'address name' will help you distinguish wallet addresses better.
              </template>
            </div>
            <el-form-item :label='$t("withdrawAmount")||"提现数额（币数）"'>
              <el-input v-model="formData.widthDrawAmount" :placeholder='$t("withdrawAmountPlaceholder")||"最少60USDT，一次最多1000000 USDT"'></el-input>
            </el-form-item>
            <div class="tips font-12">{{$t('commision')||"手续费"}}：0% + 10 USDT （{{$t('btcAddress')||"BTC格式地址"}}），10 USDT（{{$t('ethAddress')||"ETH格式地址"}}）</div>
            <el-form-item :label='$t("fundPwd")||"资金密码"'>
              <el-input type='password' v-model="formData.propertyPass" :placeholder='$t("fundPwdPlaceholder")||"请填写资金密码"'></el-input>
            </el-form-item>
            <el-form-item :label='$t("mobileCode")||"短信验证码"'>
              <el-input v-model="formData.mobileCode" :placeholder='$t("mobileCodePlaceholder")||"请填写短信验证码"'></el-input>
            </el-form-item>
            <el-form-item :label='$t("googleCode")||"谷歌验证码"'>
              <el-input v-model="formData.googleCode" :placeholder='$t("fillGoogleCode")||"请填写谷歌验证码"'></el-input>
            </el-form-item>
            <button class="btn-block btn-danger btn-large btn-active" v-text="$t('submitWithdraw')||'提交提现申请'"></button>
          </el-form>
        </dialog-box>
        <!-- 充币弹窗 -->
        <charge-box
          :showCharge='showChargeDialog'
          @closeModel='dialogClose(1)'>
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
      formData: {
        cid: "",
        usdtAddr: [
          {
            label: "jfejfoaejegeioajgea",
            value: "jigajoijgoeajgoieajg"
          },
          {
            label: "geagea",
            value: "aagegea"
          }
        ],
        addressName: "",
        widthDrawAmount: null,
        propertyPass: null,
        mobileCode: null,
        googleCode: null
      },
      // 充币地址
      chareAddress: "ajigeojagoejageaigjoew",
      // 充币二维码
      qrCode: null,
      myPropetyData: null
    };
  },
  mounted() {
    this.request(this.api.getaccount, { search: null }).then(res => {
      console.log(`我的资产:${JSON.stringify(res)}`);
      if (res && res.code != "0") return this.getDataFaild(res.msg);
      res.data && res.data.list && (this.myPropetyData = res.data.list);
    });
  },
  methods: {
    changeStyle({ columnIndex }) {
      if (columnIndex == 5) {
        return "text-align:right;";
      }
    },
    showDialog(i) {
      switch (i) {
        case 0:
          this.showChargeDialog = true;
          break;
        case 1:
          this.showWidthDrawDialog = true;
          break;
      }
    },
    dialogClose(i) {
      switch (i) {
        case 1:
          this.showChargeDialog = false;
          break;
        case 0:
          this.showWidthDrawDialog = false;
          break;
      }
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
      margin-left: 12px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
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
</style>
