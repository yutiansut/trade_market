<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <div class="panel">
        <div class="panel-head font-14 font-bold">
          订单详情<div class="van-hairline--bottom"></div>
        </div>
        <div class="panel-body">
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >单号</van-col>
            <van-col
              class="txt-rt van-ellipsis"
              span='16'
            >{{orderDetail.id}}</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >单价</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >{{orderDetail.tradePrice}}</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >数量</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >{{orderDetail.moneyNum}}</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >总价</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >{{orderDetail.tradePrice*orderDetail.moneyNum}}</van-col>
          </van-row>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head font-14 font-bold">卖方</div>
        <div class="panel-body">
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >真实姓名</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >{{orderDetail.mallRealName}}</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >手机号码</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >{{orderDetail.mallCustomerPhone|encryptPhone()}}</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >支付宝账号</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >{{orderDetail.mallCustomerAlipay}}</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >开户银行</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >{{orderDetail.mallBankName}}</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >银行卡号</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >{{orderDetail.mallBankCard}}</van-col>
          </van-row>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head font-14 font-bold">买方</div>
        <van-row class="font-14">
          <van-col
            class="color-666"
            span='8'
          >真实姓名</van-col>
          <van-col
            class="txt-rt"
            span='16'
          >{{orderDetail.buyRealName}}</van-col>
        </van-row>
        <van-row class="font-14">
          <van-col
            class="color-666"
            span='8'
          >手机号码</van-col>
          <van-col
            class="txt-rt"
            span='16'
          >{{orderDetail.buyCustomerPhone|encryptPhone()}}</van-col>
        </van-row>
      </div>
      <div
        v-if="orderDetail.applyStatus==2&&orderDetail.tradeStatus==2&&orderDetail.flagMerchant==0"
        class="panel"
      >
        <div class="panel-head font-14 font-bold">
          上传凭证<div class="van-hairline--bottom"></div>
        </div>
        <div class="panel-body upload-zone flex">
          <div
            v-for="(item,i) in imgPreview"
            :key='i'
            :style="{backgroundImage:'url('+item+')'}"
            class="upload-file p-rel"
          >
            <input
              @change="onChangeAgain(i,$event)"
              type="file"
            >
          </div>
          <div class="upload-file p-rel">
            <van-icon
              class="p-abs abs-vh-center color-999"
              size='24px'
              name='add-o'
            />
            <input
              @change="onChange($event)"
              type="file"
            >
          </div>
        </div>
        <button
          @touchend='onSubmit'
          class="btn btn-dark btn-large btn-block btn-radius"
        >上传交易凭证</button>
      </div>
      <div
        v-if="orderDetail.voucherImg&&orderDetail.voucherImg.length>0"
        class="panel"
      >
        <div class="panel-head font-15 font-bold">凭证</div>
        <div class="img-list">
          <div class="img-container p-rel">
            <img
              class="p-abs abs-v-center"
              :src="item"
              alt="凭证"
            />
          </div>
        </div>
        <button
          v-if="orderDetail.applyStatus==2&&orderDetail.tradeStatus==3&&orderDetail.flagMerchant==1"
          @touchend='confirmPay'
          class="btn btn-dark btn-large btn-block btn-radius"
        >确认收款</button>
      </div>
    </div>
  </div>
</template>
<script>
import { getItemById, getFileObjectUrl } from "@/assets/js/Utils.js";
import {
  selectMyCoinTrading,
  confirmMyCoinTrade
} from "@/vuexStore/tradeController.js";
import apiConfig from "@/config/apiConfig.js";
import axios from "axios";
export default {
  data() {
    return {
      files: [],
      imgPreview: [],
      orderDetail: {}
    };
  },
  mounted() {
    let { page, pageSize, id } = this.$route.query;
    selectMyCoinTrading(page, pageSize).then(res => {
      if (res) {
        this.orderDetail = getItemById(id, res);
        console.log(this.orderDetail);
      }
    });
  },
  methods: {
    onChange(e) {
      let val = e.srcElement.files[0];
      if (val) {
        this.files.push(val);
        let imgUrl = getFileObjectUrl(val);
        this.imgPreview.push(imgUrl);
      }
    },
    confirmPay() {
      confirmMyCoinTrade(this.$route.query.id);
    },
    uploadFiles(files, id) {
      let options = {
        headers: {
          "Content-Type": "MultipartFile/form-data"
        },
        method: "post"
      };
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file) formData.append("files", file);
      }
      formData.append("token", this.storage.get("token"));
      formData.append("id", this.$route.query.id);
      options.data = formData;
      options.url = `${this.api.baseURL}${apiConfig.uploadImages.url}`;
      axios(options).then(res => {
        console.log(res);
      });
    },
    onChangeAgain(i, e) {
      if (i == undefined) return;
      let val = e.srcElement.files[0];
      if (val) {
        this.files.splice(i, 1, val);
        let imgUrl = getFileObjectUrl(val);
        this.imgPreview.splice(i, 1, imgUrl);
      }
    },
    onSubmit() {
      if (this.files.length == 0) {
        this.$toast("请上传凭证");
        return;
      }
      this.uploadFiles(this.files);
    }
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.panel {
  margin-top: $gap;
  overflow: hidden;
  background: #fff;
  .panel-head {
    @include textVcenter(45px);
    padding-left: $gap;
  }
  .van-row {
    padding: 10px 15px;

    line-height: 24px;
  }

  .btn {
    width: calc(100% - 2rem);
    margin: 20px auto 15px auto;
  }
}
.img-list {
  overflow: hidden;
  .img-container {
    width: calc(50% - 5px);
    padding-top: calc(50% - 5px);
    float: left;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
  img {
    width: 100%;
  }
}
.upload-zone {
  padding-top: $gap;
  flex-wrap: wrap;
}
.upload-file {
  margin-left: $gap;
  margin-bottom: $gap;
  width: 12rem;
  height: 12rem;
  overflow: hidden;
  background-color: #eee;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center center;

  input {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>