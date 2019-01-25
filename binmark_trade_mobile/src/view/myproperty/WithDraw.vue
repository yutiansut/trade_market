<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full overflow-y">
      <div class="content h-full overflow-y van-hairline--top">
        <div class="form-group font-bold">
          <div class="label color-666 font-14">可用余额</div>
          <div class="form-input font-15 van-hairline--bottom">
            <span class="value">{{dayNumber.usable*1}} {{coin}}</span>
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">提现地址</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input
              @focus="showAddress"
              v-model="address"
              class="h-35"
              type="text"
              placeholder="请选择提现地址"
            >
            <van-button class="color-info" size="small">添加新地址</van-button>
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">地址名称</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input
              v-model="addressname"
              class="h-35"
              type="text"
              placeholder="地址名称：例如 My Address选填"
            >
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">提现金额</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input v-model.number="number" class="h-35" type="text" placeholder="请输入提现金额">
            <span class="color-666">{{coin}}</span>
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">手续费（{{dayNumber.outgas*100+'%'}}）</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input disabled :value="commission" class="h-35" type="text">
            <span class="color-666">{{coin}}</span>
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14 flex flex-between flex-v-center">
            <span v-text="type==0?'手机验证码':'邮箱验证码'"></span>
            <van-button
              @click="changeType"
              size="small"
              class="color-info btn-verify font-12"
            >{{type==0?'邮箱验证':'手机验证'}}</van-button>
          </div>
          <div class="form-input font-15 van-hairline--bottom">
            <input
              v-model="code"
              class="h-35"
              type="text"
              :placeholder="type==0?'请输入手机验证码':'请输入邮箱验证码'"
            >
            <span @click="sendCode" class="color-info riple font-14" v-text="codeText"></span>
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">谷歌验证码</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input v-model="google" class="h-35" type="text" placeholder="请输入google验证码">
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">交易密码</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input v-model="password" class="h-35" type="password" placeholder="请输入交易密码">
          </div>
        </div>
        <div
          class="font-13 tips color-danger"
        >*单笔最少&nbsp;{{minAmount}}&nbsp;{{coin}}，单笔最多&nbsp;{{maxAmount}}&nbsp;{{coin}}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="font-18 color-666 flex flex-between">
        <span>实际到账</span>
        <span>{{realAmount}} {{coin}}</span>
      </div>
      <button :disabled="disabled" @click="onSubmit" class="btn-large btn-block btn-primary">确定</button>
    </div>
    <van-actionsheet v-model="show" cancel-text="取消" :actions="addressList" @select="onSelect"/>
  </div>
</template>
<script>
import {
  getAddress,
  getDayNumber,
  sendCode,
  outCoin
} from "@/vuexStore/storeService.js";
import { verCodeMixin } from "@/mixin/mixin";
import { Switch } from "vant";
export default {
  components: { Switch },
  mixins: [verCodeMixin],
  data() {
    return {
      show: false,
      addressList: [],
      dayNumber: {},
      coin: "",
      number: "",
      address: "",
      addressname: "",
      password: "",
      google: "",
      type: 0
    };
  },
  computed: {
    disabled() {
      if (
        !this.coin ||
        !this.number ||
        !this.address ||
        !this.commission ||
        !this.password ||
        !this.google ||
        !this.code
      ) {
        return true;
      } else {
        return false;
      }
    },
    commission() {
      if (this.dayNumber.outgas && this.number) {
        return this.number * this.dayNumber.outgas;
      } else {
        return 0;
      }
    },
    realAmount() {
      if (this.number && this.commission) {
        return this.number - this.commission;
      } else {
        return 0;
      }
    },
    minAmount() {
      if (this.dayNumber.oneoutlow) {
        return this.dayNumber.oneoutlow * 1;
      } else {
        return 0;
      }
    },
    maxAmount() {
      if (this.dayNumber.oneoutheight) {
        return this.dayNumber.oneoutheight * 1;
      } else {
        return 0;
      }
    }
  },
  async mounted() {
    let { coin } = this.$route.query;
    this.coin = coin;
    this.addressList = await getAddress(coin);
    this.dayNumber = await getDayNumber(coin);
    if (this.addressList.length == 0) {
      this.addressList.splice(0, 1, { name: "无可选地址" });
    }
  },
  methods: {
    validate() {},
    onSelect(item) {
      this.show = false;
    },
    showAddress() {
      this.show = true;
    },
    changeType() {
      this.type = this.type == 0 ? 1 : 0;
    },
    sendCode() {
      this.timeCountDown();
      sendCode();
    },
    onSubmit() {
      outCoin({
        coin: this.coin,
        address: this.address,
        addressname: this.addressname,
        number: this.number,
        code: this.code,
        password: this.password,
        google: this.google,
        type: this.type
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.content {
  background: #fff;
  padding-bottom: 3rem;
}

.tips {
  padding: 0 $gap;
  margin-top: 1.25rem;
}

.bottom {
  background: #fff;
  padding: $gap;
  button {
    margin-top: 1.25rem;
  }
}
.btn-verify {
  margin-right: $gap;
}
input[disabled] {
  background: transparent;
}
</style>