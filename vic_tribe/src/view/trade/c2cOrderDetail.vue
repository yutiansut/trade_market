<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <!-- 订单信息 -->
      <div class="order-inifo">
        <div class="item flex flex-between font-15 van-hairline--bottom">
          <div class="color-666">价格</div>
          <div class="item-rt">100</div>
        </div>
        <div class="item flex flex-between font-15 van-hairline--bottom">
          <div class="color-666">数量</div>
          <div class="item-rt">100</div>
        </div>
        <div class="item flex flex-between font-15 van-hairline--bottom">
          <div class="color-666">金额</div>
          <div class="item-rt">100</div>
        </div>
        <div class="item flex flex-between font-15">
          <div class="color-666">状态</div>
          <div class="item-rt status-0">待确认</div>
        </div>
      </div>
      <!-- 买方/卖方账号信息 -->
      <div class="account-info">
        <div class="list-item">
          <div class="list-header h-45 van-hairline--bottom font-15">
            <span>买家</span>
            <span class="amount">李XX</span>
          </div>
          <div class="list-body font-14">
            <div class="row flex flex-between">
              <div class="col color-666">银行卡号</div>
              <div class="col ">123126***1524646</div>
            </div>
            <div class="row flex flex-between">
              <div class="col color-666">开户银行</div>
              <div class="col">招商银行7</div>
            </div>
            <div class="row flex flex-between">
              <div class="col color-666">开户支行</div>
              <div class="col">武汉支行</div>
            </div>
          </div>
          <div class="van-hairline--top"></div>
          <div class="list-footer font-14 van-hairline--top h-45 flex-between">
            <div class="col color-666">备注</div>
            <div class="col">12346</div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <button
          class="btn-block btn-large btn-dark btn-radius"
          v-text="btnText"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnText: "我已付款"
    };
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.btn-wrap {
  padding: 0 $gap;
  margin-top: 30px;
}
.order-inifo {
  background: #fff;
  padding-left: $gap;
  margin-top: 1rem;
  .item {
    @include textVcenter(45px);
  }
  .item-rt {
    margin-right: $gap;
  }
  .status-0 {
    color: $color-danger;
  }
  .status-1 {
    color: $color-success;
  }
  .status-2 {
    color: #666;
  }
}
.account-info {
  margin-top: 1rem;
}
.list-item {
  padding: 0 $gap;
  background: #fff;
  .list-footer,
  .list-header {
    display: flex;
    align-items: center;
  }
  .list-header {
    justify-content: space-between;
  }

  .list-body {
    .row {
      @include textVcenter(35px);
    }
  }
}
</style>