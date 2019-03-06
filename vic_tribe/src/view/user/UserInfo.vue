<template>
  <div class="app-main wh-full">
    <my-header
      @onHeaderRtClick='editUserInfo'
      rightText='编辑'
    ></my-header>
    <div class="app-body h-full">
      <div class="portrait flex flex-between flex-v-center">
        <span class="font-16">{{isEdit?"上传头像":"头像"}}</span>
        <div class="avatar flex flex-v-center">
          <template v-if="isEdit">
            <van-uploader :after-read="onRead">
              <van-icon
                v-show='!tempFile'
                class="color-666 icon-camera"
                size='30px'
                name="photograph"
              />
              <img
                v-show='tempFile'
                class="thumb-40"
                :src="tempFile"
              >
            </van-uploader>
          </template>
          <template v-else>
            <img
              class="thumb-40"
              :src="userInfo.customerHead||portrait"
            >
            <van-icon
              size='18px'
              name='arrow'
            />
          </template>
        </div>
      </div>
      <van-cell-group class="info">
        <van-cell
          v-if="!isEdit"
          title="手机号码"
          :value='userInfo.customerPhone ||"未填写"'
          value-class='color-666 font-14'
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='手机号码'
          v-model="userInfo.customerPhone"
          placeholder='请输入手机号码'
        ></van-field>
        <van-cell
          v-if="!isEdit"
          title="真实姓名"
          :value='userInfo.trueName ||"未填写"'
          value-class='color-666 font-14'
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='真实姓名'
          v-model="userInfo.trueName"
          placeholder='请输入真实姓名'
        ></van-field>
        <van-cell
          v-if="!isEdit"
          :value='userInfo.customerCard ||"未填写"'
          value-class='color-666 font-14'
          title="身份证号"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='身份证号'
          v-model="userInfo.customerCard"
          placeholder='请输入身份证号'
        ></van-field>
        <van-cell
          v-if="!isEdit"
          value-class='color-666 font-14'
          :value='userInfo.customerName ||"未填写"'
          title="用户昵称"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='用户昵称'
          v-model="userInfo.customerName"
          placeholder='请输入用户昵称'
        ></van-field>
        <van-cell
          v-if="!isEdit"
          value-class='color-666 font-14'
          :value='userInfo.customerAlipay ||"未填写"'
          title="支付宝号"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='支付宝号'
          v-model="userInfo.customerAlipay"
          placeholder='请输入支付宝号'
        ></van-field>
        <van-cell
          v-if="!isEdit"
          value-class='color-666 font-14'
          :value='userInfo.customerWechat ||"未填写"'
          title="微信号"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='微信号'
          v-model="userInfo.customerWechat"
          placeholder='请输入微信号'
        ></van-field>
        <van-cell
          v-if="!isEdit"
          :value='userInfo.bankName ||"未填写"'
          value-class='color-666 font-14'
          title="开户银行"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='开户银行'
          v-model="userInfo.bankName"
          placeholder='请输入开户银行'
        ></van-field>
        <van-cell
          v-if="!isEdit"
          :value='userInfo.bankCard ||"未填写"'
          value-class='color-666 font-14'
          title="银行卡号"
        ></van-cell>
        <van-field
          v-else
          input-align='right'
          label='银行卡号'
          v-model="userInfo.bankCard"
          placeholder='请输入银行卡号'
        ></van-field>
      </van-cell-group>
      <div
        v-show="isEdit"
        class="btn-group flex"
      >
        <button
          @click='onCancel'
          class="btn-large btn-block btn-default btn-radius btn-active"
        >取消</button>
        <button
          @click='onConfirmEdit'
          class="btn-large btn-block btn-dark btn-radius btn-active"
        >保存编辑</button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  selectCustomer,
  modifyCustomerInfo
} from "@/vuexStore/customerController.js";
import {
  uploadImagesByBase64,
  modifyCustomerHead
} from "../../vuexStore/commonController.js";
import { isEmptyObject } from "@/assets/js/Utils.js";
import apiConfig from "@/config/apiConfig.js";
export default {
  data() {
    return {
      portrait: require("@/assets/images/user/portrait.png"),
      userInfo: {},
      isEdit: 0,
      infoEdited: 0,
      tempFile: null
    };
  },
  mounted() {
    selectCustomer().then(res => {
      this.userInfo = this.cloneObject(this.$store.state.userInfo);
    });
  },
  methods: {
    editUserInfo() {
      this.isEdit = 1;
    },
    cloneObject(originObject) {
      if (isEmptyObject(originObject)) return;
      let newObject = Object.assign({}, originObject);
      return newObject;
    },
    validate() {
      let code = 0,
        msg = "";
      if (!this.Validate.isPhone(this.userInfo.customerPhone)) {
        code = 1;
        msg = "手机号码格式不正确";
        return { code, msg };
      }
      if (!this.Validate.isIdCard(this.userInfo.customerCard)) {
        code = 1;
        msg = "身份证号码格式不正确";
        return { code, msg };
      }
      if (!this.Validate.isBankNo(this.userInfo.bankCard)) {
        code = 1;
        msg = "银行卡号格式不正确";
        return { code, msg };
      }
      return { code, msg };
    },
    onConfirmEdit() {
      let { code, msg } = this.validate();
      if (code != 0) {
        this.$toast(msg);
        return;
      }
      modifyCustomerInfo({
        trueName: this.userInfo.trueName,
        customerCard: this.userInfo.customerCard,
        bankName: this.userInfo.bankName,
        bankCard: this.userInfo.bankCard,
        customerName: this.userInfo.customerName,
        customerAlipay: this.userInfo.customerAlipay,
        customerWechat: this.userInfo.customerWechat
      }).then(res => {
        if (res) {
          this.isEdit = 0;
          selectCustomer().then(res => {
            this.userInfo = this.cloneObject(this.$store.state.userInfo);
          });
        }
      });
    },
    onCancel() {
      if (this.infoEdited) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否放弃对内容的修改?"
          })
          .then(() => {
            this.userInfo = this.cloneObject(this.$store.state.userInfo);
            this.isEdit = 0;
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.isEdit = 0;
      }
    },
    async uploadFile(base64ImageFile) {
      let result = await uploadImagesByBase64(base64ImageFile);
      try {
        await modifyCustomerHead(result.data[0]);
      } catch (error) {
        console.log(error);
      }
    },
    onRead(files) {
      let { file, content } = files;
      this.tempFile = content;
      this.uploadFile(content);
    }
  },
  watch: {
    userInfo: {
      handler() {
        if (this.isEdit) {
          this.infoEdited = 1;
        }
      },
      deep: true
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