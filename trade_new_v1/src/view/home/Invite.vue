<template>
  <div class="invite">
    <div
      :style="{backgroundImage:'url('+assetCfg.imgs.invite_banner+')'}"
      class="banner"
    ></div>
    <div class="content clear-mt-fix">
      <div class="content-head">
        <el-row class="flex flex-v-center">
          <el-col
            class="font-30"
            span="16"
          >邀请好友</el-col>
          <el-col
            class="font-16 font-bold"
            span="4"
          >已邀请好友</el-col>
          <el-col
            class="font-16 txt-rt font-bold"
            span="4"
          >佣金总估值</el-col>
        </el-row>
        <el-row class="flex flex-v-center">
          <el-col
            span="16"
            class="font-16"
          >邀请好友，返佣奖励享不停</el-col>
          <el-col
            span="4"
            class="color-primary font-20 font-bold"
          >0</el-col>
          <el-col
            span="4"
            class="color-primary txt-rt font-20 font-bold"
          >0 BTC</el-col>
        </el-row>
      </div>
      <div class="content-body flex flex-between">
        <div class="qr-code txt-center">
          <vue-qr
            text='text'
            size='140'
            margin='5'
          ></vue-qr>
          <span class="color-999">我的邀请码</span>
        </div>
        <div class="form">
          <div class="form-group flex flex-between">
            <form-input
              width='570'
              label-class='color-666'
              label="邀请码"
              :disabled='true'
            ></form-input>
            <button class="btn-large color-primary">复制</button>
          </div>
          <div class="form-group flex flex-between">
            <form-input
              width='570'
              label-class='color-666'
              label="邀请链接"
              :disabled='true'
            ></form-input>
            <button class="btn-large color-primary">复制</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueQr from "vue-qr";
export default {
  components: {
    VueQr
  }
};
</script>
<style lang="scss" scoped>
.banner {
  height: 400px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content {
  width: 900px;
  box-sizing: border-box;
  margin: 20px auto 60px auto;
  background: #fff;
  padding: 0 30px;
  border: $default-border;
}
.content-head {
  padding-top: 40px;
  padding-bottom: 40px;
  .el-row:first-child {
    margin-bottom: 20px;
  }
  border-bottom: $default-border;
}
.content-body {
  margin-top: 30px;
  padding-bottom: 55px;
  .qr-code {
    span {
      display: inline-block;
      padding-top: 10px;
    }
  }
  .form {
    flex: 1;
    margin-left: 20px;
  }
  .form-group {
    margin-top: 25px;
  }
  button {
    border-color: $color-primary;
  }
}
</style>
