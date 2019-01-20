<template>
  <div class="main h-full">
    <!-- 侧栏滑块 -->
    <slide-pop @onClose="toggleSlideShow" :showPop="showPop">
      <user-aside slot="content"></user-aside>
    </slide-pop>
    <!-- header -->
    <app-header :iconLeft="assetConfig.imgs.user_head_portrait" @onHeadClick="toggleSlideShow">
      <div slot="title" class="coin font-16 abs-vh-center">USDT</div>
      <div
        @click.self="actionTrigger"
        slot="right"
        class="font-14 h-35 flex flex-v-center color-999"
      >选择币种</div>
    </app-header>
    <div class="content overflow-y">
      <van-tabs color="#fe0042" v-model="active">
        <!-- 买入 -->
        <van-tab title="买入">
          <div class="form">
            <div class="guide-price color-999 font-14">指导价：12321</div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input type="text" placeholder="价格">
              <div class="label">USDT</div>
            </div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input type="text" placeholder="数量">
              <div class="label">USDT</div>
            </div>
            <button class="btn-block btn-large riple btn-block btn-danger">买入</button>
          </div>
        </van-tab>
        <!-- 卖出 -->
        <van-tab title="卖出">
          <div class="form">
            <div class="guide-price color-999 font-14">指导价：12321</div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input type="text" placeholder="价格">
              <div class="label">USDT</div>
            </div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input type="text" placeholder="数量">
              <div class="label">USDT</div>
            </div>
            <button class="btn-block btn-large riple btn-block btn-success">卖出</button>
          </div>
        </van-tab>
        <!-- 我的订单 -->
        <van-tab title="我的订单">
          <div class="order-list">
            <dl class="order">
              <dt class="font-bold flex flex-between">
                <span class="font-16">你是XX</span>
                <span class="status color-danger">进行中</span>
              </dt>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">单号&nbsp;&nbsp;</span>
                  <span>116515651</span>
                </div>
                <div>
                  <span class="color-danger">买入&nbsp;&nbsp;</span>
                  <span class="color-999">类型</span>
                </div>
              </dd>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">价格&nbsp;&nbsp;</span>
                  <span>6385</span>
                </div>
                <div>
                  <span class="color-danger">2017/7/7&nbsp;&nbsp;</span>
                  <span class="color-999">时间</span>
                </div>
              </dd>
              <dd>
                <span class="color-999">数量&nbsp;&nbsp;</span>
                <span>6385</span>
              </dd>
              <dd class="total van-hairline--bottom">
                <span class="color-666">总计&nbsp;&nbsp;</span>
                <span>6385</span>
              </dd>
            </dl>
          </div>
        </van-tab>
        <!-- 历史订单 -->
        <van-tab title="历史订单">
          <div class="order-list">
            <dl class="order">
              <dt class="font-bold flex flex-between">
                <span class="font-16">你是YY</span>
                <span class="status color-666">已完成</span>
              </dt>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">单号&nbsp;&nbsp;</span>
                  <span>116515651</span>
                </div>
                <div>
                  <span class="color-danger">买入&nbsp;&nbsp;</span>
                  <span class="color-999">类型</span>
                </div>
              </dd>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">价格&nbsp;&nbsp;</span>
                  <span>6385</span>
                </div>
                <div>
                  <span class="color-danger">2017/7/7&nbsp;&nbsp;</span>
                  <span class="color-999">时间</span>
                </div>
              </dd>
              <dd>
                <span class="color-999">数量&nbsp;&nbsp;</span>
                <span>6385</span>
              </dd>
              <dd class="total van-hairline--bottom">
                <span class="color-666">总计&nbsp;&nbsp;</span>
                <span>6385</span>
              </dd>
            </dl>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 市场挂单 -->
      <div v-show="active<=1" class="market-list">
        <div class="font-14 color-999 font-bold">市场挂单（只显示在线商家）</div>
        <div class="list-item">
          <van-row class="item flex flex-v-center">
            <van-col span="10">
              <p class="dt font-16 font-bold">李先生</p>
              <p class="dd font-14">
                <span class="color-999">数量&nbsp;</span>
                <span>10&nbsp;&nbsp;KMT</span>
              </p>
              <p class="dd font-14">
                <span class="color-999">日期&nbsp;</span>
                <span>2017/8/8</span>
              </p>
            </van-col>
            <van-col span="8">
              <p class="dt font-18 font-bold">￥4498</p>
              <p class="dd font-14">
                <span class="color-999">价格&nbsp;</span>
                <span>10&nbsp;&nbsp;KMT</span>
              </p>
              <p class="dd font-14">
                <span class="color-999">总计&nbsp;</span>
                <span>2017/8/8</span>
              </p>
            </van-col>
            <van-col class="flex col-last" span="6">
              <button class="btn-rounded btn-danger riple thumb-40 font-14">买入</button>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <!-- 币种上拉菜单 -->
    <van-actionsheet v-model="showActionSheet" :actions="tradeCoins" @select="onSelect"/>
  </div>
</template>
<script>
import appHeader from "@/components/header/AppHeader";
import slidePop from "@/components/other/slidePop";
import userAside from "@/components/slideContent/UserAside";
import Mixin from "@/mixin/mixin";
export default {
  components: { appHeader, slidePop, userAside },
  mixins: [Mixin],
  data() {
    return {
      showActionSheet: false,
      tradeCoins: [
        {
          name: "USDT"
        },
        {
          name: "BTH"
        }
      ],
      tradecoinid: "",
      active: 2,
      price: "",
      number: ""
    };
  },
  methods: {
    actionTrigger() {
      this.showActionSheet = true;
    },
    onSelect(item) {
      this.showActionSheet = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.coin {
  color: #fff;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    flex: 1;
  }
  .form {
    padding: 1rem;
    background: #fff;
    button {
      margin-top: 2.5rem;
    }
  }
}
.market-list {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff;
}
.list-item {
  margin-top: 1.25rem;
  .item {
    padding: 1.5rem 1rem;
    background: #f6f6f6;
    border-radius: 3px;
    margin-top: 1.25rem;
    &:first-child {
      margin-top: 0;
    }
  }
  .dt {
    line-height: 21px;
    margin-bottom: 1rem;
  }
  .dd {
    margin-bottom: 0.5rem;
  }
  .btn-rounded {
    border-radius: 100%;
    color: #fff;
    line-height: 38px;
  }
  .col-last {
    justify-content: flex-end;
  }
}
.input-wrap {
  margin-top: 1rem;
  @include textVcenter(45px);
  input {
    flex: 1;
  }
}
.order-list {
  overflow: hidden;
  padding: 0 1rem;
  background: #fff;
  .order {
    dt {
      @include textVcenter(30px);
      margin-top: 1rem;
    }
    dd {
      margin-top: 2rem;
      font-size: 1.25rem;
    }
    .total {
      padding-bottom: 1.25rem;
    }
    .status {
      font-size: 1.25rem;
    }
  }
}
</style>
