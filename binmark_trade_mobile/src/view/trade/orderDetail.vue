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
      <!-- 上传凭证 -->
      <!-- v-if='orderDetail.type == 0' -->
      <dl v-if="orderDetail.type==0&&orderDetail.state==0" class="confirm-payment content">
        <van-uploader :after-read="onRead" style="display:block">
          <p class="color-999 up-big">上传凭证</p>
        </van-uploader>
      </dl>
      <div v-if="upImgUrl||orderDetail.photo">
        <img :src="upImgUrl" alt width="50%" class="img-suo">
      </div>
      <!-- 申诉功能 -->
      <dl v-if="orderDetail.state==1" class="confirm-payment content appeal" @click="appeal">申诉功能</dl>
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
import axios from "axios";
import {
  getMyc2cTrade,
  confirmPayment,
  confirmReceivePayment
} from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      orderStatus: 0,
      orderDetail: {},
      upImgUrl: ""
    };
  },
  mounted() {
    this.getOrerDetail();
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
      } else if (this.orderDetail.state == 5) {
        return "申诉中";
      } else if (this.orderDetail.state == 2) {
        return "已完成";
      }
    }
  },
  methods: {
    getOrerDetail() {
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
    handleOrder() {
      if (this.orderDetail.type == 0 && this.orderDetail.state == 0) {
        if (this.upImgUrl == "") return this.$toast("请先上传凭证");
        confirmPayment(this.orderDetail.autoid).then(res => {
          if (res) {
            this.orderDetail.state = 1;
          }
        });
      } else if (this.orderDetail.type == 1 && this.orderDetail.state == 1) {
        confirmReceivePayment(this.orderDetail.autoid).then(res => {
          if (res) {
            this.navigateTo("/trade/c2c_trade");
            this.orderDetail.state = 2;
          }
        });
      }
    },
    //上传凭证
    onRead(file) {
      let formData = new FormData();
      let options = {
        headers: {
          "Content-Type": "MultipartFile/form-data"
        },
        method: "post"
      };
      formData.append("imgurl", file.file);
      options.url = `${this.api.baseURL}/${this.api.img.url}`;
      options.data = formData;
      axios(options).then(res => {
        console.log(res);
        this.upImgUrl = res.data.data.isFlag;
      });
    },
    // 申诉功能
    appeal() {
      let params = { id: this.orderDetail.autoid };
      this.request(this.api.appeal, params).then(res => {
        if (res) this.orderDetail.state = 5;
      });
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
.content .up-big {
  text-align: center;
  font-size: 16px;
}
.img-suo {
  margin: 1rem auto;
}
.appeal {
  text-align: center;
  font-size: 16px;
}
</style>