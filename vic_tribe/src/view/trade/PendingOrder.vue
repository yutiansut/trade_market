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
              class="txt-rt"
              span='16'
            >1216161</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >单价</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >￥1216161</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >数量</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >1216161</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >总价</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >￥1216161</van-col>
          </van-row>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head font-14 font-bold">
          卖方<div class="van-hairline--bottom"></div>
        </div>
        <div class="panel-body">
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >真实姓名</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >李先生</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >手机号码</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >1381314678</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >支付宝账号</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >1234564896</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >开户银行</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >工商银行</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >银行卡号</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >2022164544554</van-col>
          </van-row>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head font-14 font-bold">
          上传凭证<div class="van-hairline--bottom"></div>
        </div>
        <div class="panel-body upload-zone flex">
          <div
            :style="{backgroundImage:'url('+item+')'}"
            v-for="(item,i) in files"
            :key='i'
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
        <button class="btn btn-dark btn-large btn-block btn-radius">上传凭证</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      files: []
    };
  },
  methods: {
    onChange(e) {
      let val = e.srcElement.value;
      if (val) this.files.push(val);
    },
    onChangeAgain(i, e) {
      if (i == undefined) return;
      this.files.splice(i, 1, e.srcElement.value);
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
.upload-zone {
  padding-top: $gap;
}
.upload-file {
  margin-left: $gap;
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