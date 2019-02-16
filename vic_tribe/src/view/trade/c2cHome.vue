<template>
  <div class="app-body overflow-y">
    <van-tabs
      sticky
      v-model="active"
      line-width='40'
      color='#333'
    >
      <van-tab title="买入">
        <div class="text-bar font-14 color-666">CNYD折合&nbsp;1&nbsp;CNY</div>
        <form @submit.prevent>
          <van-cell-group>
            <van-field
              placeholder='请输入数量'
              label='数量'
            >
              <span slot="button">USDT</span>
            </van-field>
            <van-field
              placeholder='请输入金额'
              label='金额'
            >
              <span slot="button">CNY</span>
            </van-field>
          </van-cell-group>
          <div class="btn-wrap">
            <button class="btn-block btn-active btn-large btn-danger btn-radius">买入</button>
          </div>
        </form>
      </van-tab>
      <van-tab title="卖出">
        <div class="text-bar font-14 color-666">CNYD折合&nbsp;1&nbsp;CNY</div>
        <form @submit.prevent>
          <van-cell-group>
            <van-field
              placeholder='请输入数量'
              label='数量'
            >
              <span slot="button">USDT</span>
            </van-field>
            <van-field
              placeholder='请输入金额'
              label='金额'
            >
              <span slot="button">CNY</span>
            </van-field>
          </van-cell-group>
          <div class="btn-wrap">
            <button class="btn-block btn-active btn-large btn-success btn-radius">卖出</button>
          </div>
        </form>
      </van-tab>
      <van-tab title="我的订单">
        <div class="list-container mt">
          <div class="list-item">
            <div class="list-header h-45 van-hairline--bottom font-16">
              <span>李XX</span>
              <span class="amount">1689489&nbsp;CNY</span>
            </div>
            <div class="list-body font-14">
              <div class="row flex flex-between">
                <div class="col">单号：164849</div>
                <div class="col color-666">类型：<span class="color-danger">买入</span></div>
              </div>
              <div class="row flex flex-between">
                <div class="col">价格：64.64&nbsp;CNY</div>
                <div class="col color-666">时间：2018-7-7</div>
              </div>
              <div class="row flex flex-between">
                <div class="col">限额：64.64-2000</div>
              </div>
            </div>
            <div class="van-hairline--top"></div>
            <div class="list-footer van-hairline--top h-45">
              <span class="status status-1">进行中</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="历史订单">
        <div class="list-container mt">
          <div class="list-item">
            <div class="list-header h-45 van-hairline--bottom font-16">
              <span>李XX</span>
              <span class="amount">1689489&nbsp;CNY</span>
            </div>
            <div class="list-body font-14">
              <div class="row flex flex-between">
                <div class="col">单号：164849</div>
                <div class="col color-666">类型：<span class="color-danger">买入</span></div>
              </div>
              <div class="row flex flex-between">
                <div class="col">价格：64.64&nbsp;CNY</div>
                <div class="col color-666">时间：2018-7-7</div>
              </div>
              <div class="row flex flex-between">
                <div class="col">限额：64.64-2000</div>
              </div>
            </div>
            <div class="van-hairline--top"></div>
            <div class="list-footer van-hairline--top h-45">
              <span class="status status-0">已完成</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 市场挂单 -->
    <div
      v-show="active<=1"
      class="market-order"
    >
      <div class="text-bar font-14 color-666">
        <span class="font-bold">市场挂单</span>（只显示在线商家）
      </div>
      <div class="list-container">
        <div class="list-item">
          <div class="list-header h-45 van-hairline--bottom font-16">
            <span>李XX</span>
            <span class="amount">1689489&nbsp;CNY</span>
          </div>
          <div class="list-body font-14">
            <div class="row flex flex-between">
              <div class="col">价格：64.64&nbsp;CNY</div>
              <div class="col color-666">在线：1分钟</div>
            </div>
            <div class="row flex flex-between">
              <div class="col">数量：64.64</div>
              <div class="col color-666">成交：1145</div>
            </div>
            <div class="row flex flex-between">
              <div class="col">限额：64.64-2000</div>
              <div class="col color-666">用时：1分钟</div>
            </div>
          </div>
          <div class="van-hairline--top"></div>
          <div class="list-footer h-45">
            <button class="btn-small color-danger btn-radius">买入</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 2
    };
  }
};
</script>

<style lang="scss" scoped>
$gap: 15px;
.mt {
  margin-top: 1rem;
}
.text-bar {
  @include textVcenter(40px);
  padding: 0 $gap;
}
.btn-wrap {
  margin-top: $gap;
  padding: 0 $gap;
}
.list-item {
  padding: 0 $gap;
  margin-top: $gap;
  &:first-child {
    margin-top: 0;
  }
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
  .list-footer {
    justify-content: flex-end;
    button {
      border: 1px solid $color-danger;
    }
  }
  .status {
    height: 30px;
    line-height: 28px;
    width: 80px;
    font-size: 14px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
  }
  .status-0 {
    border-color: #eee;
    color: #999;
  }
  .status-1 {
    border-color: $color-danger;
    color: $color-danger;
  }
  .status-1 {
    border-color: $color-success;
    color: $color-success;
  }
}
</style>
