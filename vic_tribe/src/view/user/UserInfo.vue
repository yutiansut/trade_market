<template>
  <div class="app-main wh-full">
    <my-header
      @onHeaderRtClick='editUserInfo'
      rightText='编辑'
    ></my-header>
    <div class="app-body h-full">
      <div class="portrait flex flex-between flex-v-center">
        <span class="font-16">头像</span>
        <div class="avatar flex flex-v-center">
          <img
            class="thumb-40"
            :src="userInfo.customerHead||portrait"
          >
          <van-icon
            size='18px'
            name='arrow'
          />
        </div>
      </div>
      <van-cell-group class="info">
        <van-cell
          v-if="!isEdit"
          title="手机号码"
          :value='userInfo.customerPhone'
          value-class='color-666 font-14'
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='手机号码'
          v-model="userInfo.customerPhone"
        ></van-field>
        <van-cell
          v-if="!isEdit"
          title="真实姓名"
          :value='userInfo.trueName'
          value-class='color-666 font-14'
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='真实姓名'
          v-model="userInfo.trueName"
        ></van-field>
        <van-cell
          v-if="!isEdit"
          :value='userInfo.customerCard'
          value-class='color-666 font-14'
          title="身份证号"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='身份证号'
          v-model="userInfo.customerCard"
        ></van-field>
        <van-cell
          v-if="!isEdit"
          value-class='color-666 font-14'
          :value='userInfo.customerName'
          title="用户昵称"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='用户昵称'
          v-model="userInfo.customerName"
        ></van-field>
        <van-cell
          v-if="!isEdit"
          value-class='color-666 font-14'
          :value='userInfo.customerAlipay'
          title="支付宝号"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='支付宝号'
          v-model="userInfo.customerAlipay"
        ></van-field>
        <van-cell
          v-if="!isEdit"
          value-class='color-666 font-14'
          :value='userInfo.customerWechat'
          title="微信号"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='微信号'
          v-model="userInfo.customerWechat"
        ></van-field>
        <van-cell
          v-if="!isEdit"
          :value='userInfo.bankName'
          value-class='color-666 font-14'
          title="开户银行"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='开户银行'
          v-model="userInfo.bankName"
        ></van-field>
        <van-cell
          v-if="!isEdit"
          :value='userInfo.bankCard'
          value-class='color-666 font-14'
          title="银行卡号"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='银行卡号'
          v-model="userInfo.bankCard"
        ></van-field>
      </van-cell-group>
      <div
        v-show="isEdit"
        class="btn-group flex"
      >
        <button
          @touchend='onCancel'
          class="btn-large btn-block btn-default btn-radius btn-active"
        >取消</button>
        <button
          @touchend='onConfirmEdit'
          class="btn-large btn-block btn-dark btn-radius btn-active"
        >保存编辑</button>
      </div>
    </div>
  </div>
</template>
<script>
import { selectCustomer } from "@/vuexStore/customerController.js";
import { isEmptyObject } from "@/assets/js/Utils.js";
export default {
  data() {
    return {
      portrait: require("@/assets/images/user/portrait.png"),
      userInfo: {},
      isEdit: 0
    };
  },
  mounted() {
    selectCustomer().then(res => {
      if (res) {
        this.userInfo = this.cloneObject(this.$store.state.userInfo);
      }
    });
  },
  methods: {
    editUserInfo() {
      this.isEdit = 1;
    },
    cloneObject(originObject) {
      if (isEmptyObject(originObject)) return;
      let newObject = Object.assign({}, originObject);
      Object.keys(newObject).forEach(key => {
        if (!newObject[key]) {
          newObject[key] = "未填写";
        }
      });
      return newObject;
    },
    onConfirmEdit() {},
    onCancel() {
      this.userInfo = this.cloneObject(this.$store.state.userInfo);
      this.isEdit = 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.portrait {
  padding: 1.25rem;
  margin-top: 1.25rem;
  background: #fff;
}
.avatar {
  margin-right: 0.25rem;
}
.btn-group {
  margin-top: 3rem;
  .btn-block {
    margin: 0 15px;
  }
}
.info {
  margin-top: 1.25rem;
}
</style>