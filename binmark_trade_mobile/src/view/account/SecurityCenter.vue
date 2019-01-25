<template>
  <div class="container h-full">
    <van-cell-group>
      <van-cell
        size="large"
        title="登录密码"
        is-link
        value-class="color-danger"
        value="修改"
        to='/account/changepwd'
      />
      <van-cell
        size="large"
        title="交易密码"
        is-link
        value-class="color-danger"
        :value='bindstate.tradstate==1?"修改":"绑定"'
        to='/account/changetradepwd'
      />
      <van-cell
        size="large"
        title="手机绑定"
        is-link
        :value-class="bindstate.tel?'color-success':'color-danger'"
        :value="bindstate.tel?'更换手机号':'绑定'"
        to
      />
      <van-cell
        size="large"
        title="邮箱绑定"
        is-link
        :value-class="bindstate.emailstate==1?'color-success':'color-danger'"
        :value="bindstate.emailstate?'更换邮箱':'绑定'"
        to='/account/bindemail'
      />
      <van-cell
        size="large"
        title="银行卡绑定"
        is-link
        :value-class="bindstate.bankstate==1?'color-999':'color-danger'"
        :value="bindstate.bankstate==1?'已绑定':'绑定'"
        :to="bindstate.bankstate==0&&'/account/bindbank'"
      />
      <van-cell
        size="large"
        title="谷歌绑定"
        is-link
        :value-class="bindstate.googlestate==1?'color-999':'color-danger'"
        :value="bindstate.googlestate==1?'已绑定':'绑定'"
        :to="bindstate.googlestate==0&&'/account/google_auth'"
      />
      <van-cell
        size="large"
        title="身份认证"
        is-link
        :value-class="bindstate.idcardstate==2?'color-999':'color-danger'"
        :value="bindstate.idcardstate==2?'已认证':1?'审核中':'去认证'"
        :to="bindstate.idcardstate<2&&'/account/identify'"
      />
      <van-cell
        size="large"
        title="安全日志"
        is-link
        to="/account/account_log"
      />
      <van-cell
        size="large"
        title="登录日志"
        is-link
        to="/account/login_logs"
      />
    </van-cell-group>
  </div>
</template>
<script>
import { getsafe } from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      bindstate: {}
    };
  },
  mounted() {
    getsafe().then(res => {
      this.bindstate = res;
    });
  }
};
</script>
<style lang="scss" scoped>
</style>