<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <!-- 确认收/付款 -->
      <dl class="confirm-payment content">
        <dt>
          <span v-text="orderDetail.type==0?'卖方':'买方'"></span>
        </dt>
        <dd>
          <span class="color-999">真实姓名</span>
          <span v-text="orderDetail.type==0?orderDetail.sellname:orderDetail.buyname"></span>
        </dd>
        <dd>
          <span class="color-999">银行卡号</span>
          <span v-text="orderDetail.type==0?orderDetail.sellbannkcard:orderDetail.buybannkcard"></span>
        </dd>
        <dd>
          <span class="color-999">开户银行</span>
          <span v-text="orderDetail.type==0?orderDetail.sellkhyh:orderDetail.buykhyh"></span>
        </dd>
        <dd>
          <span class="color-999">开户支行</span>
          <span v-text="orderDetail.type==0?orderDetail.sellkhzh:orderDetail.buykhzh"></span>
        </dd>
      </dl>
      <!-- 确认买入/卖出 -->
      <dl class="confirm-payment content">
        <dd>
          <span class="color-999">单号</span>
          <span v-text="orderDetail.autoid"></span>
        </dd>
        <dd>
          <span class="color-999">价格</span>
          <span v-text="orderDetail.price*1"></span>
        </dd>
        <dd>
          <span class="color-999">数量</span>
          <span v-text="orderDetail.number*1"></span>
        </dd>
        <dd>
          <span class="color-999">金额</span>
          <span v-text="orderDetail.zj*1"></span>
        </dd>
      </dl>
    </div>
    <button
      @click="handleOrder"
      :disabled="(orderDetail.type != orderDetail.state)"
      class="confirm-btn btn-block riple btn-large btn-primary"
      v-text="btnText"
    ></button>
  </div>
</template>
<script>
import {
  getMyc2cTrade,
  confirmPayment,
  confirmReceivePayment
} from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      orderStatus: 0,
      orderDetail: {}
    };
  },
  mounted() {
    let { id, type } = this.$route.query;
    if (!id) return false;
    getMyc2cTrade().then(res => {
      if (res && res.length > 0) {
        let item = null;
        for (let i = 0; i < res.length; i++) {
          if (res[i].autoid == id && res[i].type == type) {
            item = res[i];
            this.orderDetail = item;
          }
        }
      }
    });
  },
  computed: {
    btnText() {
      if (this.orderDetail.type == 0 && this.orderDetail.state == 0) {
        return "我已付款";
      } else if (this.orderDetail.type == 1 && this.orderDetail.state == 0) {
        return "待对方打款";
      } else if (this.orderDetail.type == 0 && this.orderDetail.state == 1) {
        return "待对方收款";
      } else if (this.orderDetail.type == 1 && this.orderDetail.state == 1) {
        return "确认收款";
      } else {
        return "已完成";
      }
    }
  },
  methods: {
    handleOrder() {
      if (this.orderDetail.type == 0 && this.orderDetail.state == 0) {
        confirmPayment(this.orderDetail.autoid).then(res => {
          if (res) {
            this.orderDetail.state = 1;
          }
        });
      } else if (this.orderDetail.type == 1 && this.orderDetail.state == 1) {
        confirmReceivePayment(this.orderDetail.autoid).then(res => {
          if (res) {
            this.navigateTo("/trade/c2c_trade");
          }
        });
      }
    }
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
    @include textVcenter(40px);
    font-size: 16px;
    font-weight: bold;
  }
  dd {
    @include textVcenter(35px);
    font-size: 14px;
  }
}
</style>