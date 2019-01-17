<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <!-- 确认收/付款 -->
      <dl class="confirm-payment content">
        <dt>
          <span>陈XXX</span>
          <span>100000</span>
        </dt>
        <dd>
          <span class="color-999">银行卡号</span>
          <span>1000 **** **** 1234</span>
        </dd>
        <dd>
          <span class="color-999">开户银行</span>
          <span>上帝银行</span>
        </dd>
        <dd>
          <span class="color-999">开户支行</span>
          <span>上帝银行支行</span>
        </dd>
        <dd>
          <span class="color-999">备注</span>
          <span>144</span>
        </dd>
      </dl>
      <!-- 确认买入/卖出 -->
      <dl class="confirm-payment content">
        <dd>
          <span class="color-999">价格数量</span>
          <span>100</span>
        </dd>
        <dd>
          <span class="color-999">数量</span>
          <span>50</span>
        </dd>
        <dd>
          <span class="color-999">金额</span>
          <span>100</span>
        </dd>
        <dd>
          <span class="color-999">状态</span>
          <span>待确认</span>
        </dd>
      </dl>
    </div>
    <button
      class="confirm-btn btn-block riple btn-large btn-primary"
      v-text="btnText"
    ></button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnText: "确定",
      orderStatus: 0
    };
  }
};
</script>
<style lang="scss" scoped>
button.confirm-btn {
  box-sizing: border-box;
  margin: 0 auto 1rem auto;
  width: calc(100% - 2rem);
}
.content {
  margin-top: 1.25rem;
  padding: 1rem;
  background: #fff;
}
.confirm-payment {
  dt,
  dd {
    display: flex;
    justify-content: space-between;
  }
  dt {
    @include textVcenter(45px);
    font-size: 16px;
    font-weight: bold;
  }
  dd {
    @include textVcenter(35px);
    font-size: 14px;
  }
}
</style>