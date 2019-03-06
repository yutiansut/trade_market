<template>
  <div class="wh-full app-main">
    <my-header></my-header>
    <div class="app-body overflow-y">
      <van-tabs
        color='#333'
        v-model="active"
        @change='onTabChange'
      >
        <van-tab title="定向交易">
          <form>
            <van-cell-group>
              <van-field
                v-model="targetPhone"
                label='对方账号'
                placeholder="请输入对方手机号"
              />
              <van-field
                v-model="moneyNum"
                label='转账数量'
                placeholder="请输入转账金额数量"
              />
              <van-field
                v-model="payPass"
                autocomplete='false'
                label='支付密码'
                placeholder="请输入支付密码"
                type='password'
              />
            </van-cell-group>
          </form>
          <p class="color-666 tips font-12">*新用户默认支付密码为：123456，请在账户设置中更改</p>
          <button
            :disabled='disabled'
            @click='onSubmit'
            class="btn-block btn-large btn-dark btn-active btn-radius"
          >确认转账</button>
        </van-tab>
        <van-tab title="已完成">
          <van-cell-group :border='false'>
            <template v-for="item in doneList">
              <van-cell
                :key='item.id'
                :title="'数量 '+item.moneyNum"
                :value="item.createTime|formatDate('yyyy-MM-dd hh:mm:ss')"
                is-link
              />
            </template>
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import {
  matchTransferAccount,
  selectConvertTrading,
  selectMyConvertTradeList
} from "@/vuexStore/tradeController.js";
export default {
  data() {
    return {
      targetPhone: "",
      payPass: "",
      moneyNum: "",
      pageNo: 1,
      pageSize: 10,
      doneList: []
    };
  },
  computed: {
    disabled() {
      if (!this.targetPhone || !this.payPass || !this.moneyNum) {
        return true;
      }
      return false;
    }
  },
  methods: {
    onSubmit() {
      matchTransferAccount(this.moneyNum, this.targetPhone, this.payPass).then(
        res => {
          if (res) {
            this.payPass = "";
          }
        }
      );
    },
    onTabChange(index) {
      if (index == 1) {
        selectMyConvertTradeList(this.pageNo, this.pageSize).then(res => {
          if (res) this.doneList = res.list;
        });
      }
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
}
button.btn-block {
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 2rem);
}
.van-cell-group {
  margin-top: 1rem;
}
</style>
