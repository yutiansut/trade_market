<template>
  <div class="wh-full app-main">
    <my-header
      @onHeaderRtClick="navigateTo('/record/bill_record')"
      right-text="转换记录"
    ></my-header>
    <div class="app-body overflow-y">
      <van-tabs v-model="tabIndex">
        <van-tab title="兑换积分">
          <form
            action=""
            @submit.prevent
          >
            <van-cell-group>
              <van-field
                label='可用余额'
                disabled='disabled'
                :value="$store.state.accountInfo.useMoney||0"
              />
              <van-field
                label='余额数量'
                disabled='disabled'
                :value="$store.state.accountInfo.useCoin||0"
              />
              <van-field
                v-model="moneyNum"
                label='兑换数量'
                placeholder="请输入兑换数量"
              />
              <van-field
                v-model="payPass"
                autocomplete='false'
                label='支付密码'
                placeholder="请输入支付密码"
                type='password'
              />
            </van-cell-group>
            <p class="color-666 tips font-12">*新用户默认支付密码为：123456，请在账户设置中更改</p>
            <div class="btn-wrap">
              <button
                :disabled='disabled'
                @click='onSubmit'
                class="btn-block btn-large btn-dark btn-active btn-radius"
              >确定转换
              </button>
            </div>
          </form>
        </van-tab>
        <van-tab title="兑换VIC">
          <form
            action=""
            @submit.prevent
          >
            <van-cell-group>
              <van-field
                label='可用余额'
                disabled='disabled'
                :value="$store.state.accountInfo.useMoney||0"
              />
              <van-field
                label='余额数量'
                disabled='disabled'
                :value="$store.state.accountInfo.useCoin||0"
              />
              <van-field
                v-model="moneyNum"
                label='兑换数量'
                placeholder="请输入兑换数量"
              />
              <van-field
                v-model="payPass"
                autocomplete='false'
                label='支付密码'
                placeholder="请输入支付密码"
                type='password'
              />
            </van-cell-group>
            <p class="color-666 tips font-12">*新用户默认支付密码为：123456，请在账户设置中更改</p>
            <div class="btn-wrap">
              <button
                :disabled='disabled'
                @click='onSubmit'
                class="btn-block btn-large btn-dark btn-active btn-radius"
              >确定转换
              </button>
            </div>
          </form>
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>
<script>
import { doMoneyConvert } from "@/vuexStore/tradeController.js";
import { selectAccount } from "@/vuexStore/customerController.js";
export default {
  data() {
    return {
      tabIndex: 0,
      moneyNum: "",
      payPass: ""
    };
  },
  mounted() {
    selectAccount();
  },
  computed: {
    disabled() {
      if (!this.moneyNum || !this.payPass) {
        return true;
      }
      return false;
    }
  },
  methods: {
    async onSubmit() {
      let convertRes = await doMoneyConvert(
        this.moneyNum,
        this.payPass,
        this.tabIndex + 1
      );
      if (convertRes) {
        selectAccount();
        this.moneyNum = "";
        this.payPass = "";
      }
    }
  },
  watch: {
    tabIndex(newVal, oldVal) {
      this.moneyNum = "";
      this.payPass = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.tips {
  margin-top: 1.5rem;
  padding: 0 1rem;
}
form {
  margin-top: 1rem;
  .btn-wrap {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: calc(100% - 2rem);
  }
}
</style>