<template>
  <div class="container h-full">
    <!-- <div class="content van-hairline--top h-full">
      <div class="flex flex-between flex-v-center">
        <img
          class="thumb-40 thumb-round"
          :src="assetConfig.imgs.user_head_portrait"
        >
        <span
          class="font-15"
          v-text="Store.state.userInfo.tel||Store.state.userInfo.email"
        ></span>
      </div>
    </div> -->
    <!-- <div class="btn-group">
      <button
        @click="logOut"
        class="btn-primary btn-large btn-block"
      >退出登录</button>
    </div> -->
    
      <!-- <img
          class="thumb-40 thumb-round"          
          :src="assetConfig.imgs.user_head_portrait"
        > -->
    <van-cell-group>
      <div class='con-img'> 
        头像
        <img
          class="thumb-40 thumb-round"          
          :src="assetConfig.imgs.user_head_portrait"
        >
        </div>
      <van-cell title="姓名" :value="Store.state.userInfo.username || '未填写'" />
      <van-cell title="手机号码" :value="Store.state.userInfo.tel || '未填写'" />
       <van-cell title="电子邮箱" :value="Store.state.userInfo.email || '未填写'" />
        <van-cell title="开户银行" :value="Store.state.userInfo.khzh || '未填写'" />
        <van-cell title="开户支行" :value="Store.state.userInfo.khzh || '未填写'" />
        <van-cell title="银行卡号" :value="Store.state.userInfo.bankcard || '未填写'" />
    </van-cell-group>
    <div class='amend' @click="navigateTo('/account')">修改</div>
  </div> 
</template>
<script>
import { getUserInfo, Logout } from "../../vuexStore/storeService";
// import {}
export default {
  data() {
    return {
     msg:'123'
    };
  },
  mounted() {
    getUserInfo();
  },
  methods: {
    logOut() {
      Logout().then(res => {
        this.storage.set("isLogin", false);
        this.navigateTo("/userentry/login");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding: 1rem 1rem 0 1rem;
}
.btn-group {
  padding: 0 1rem 1rem;
}
.con-img{
  padding: 10px 15px;line-height: 30px;font-size: 14px;border-bottom:1px solid #f5f5f5;
  position: relative;
}
.con-img img{position: absolute;right: 15px;top:5px;}
.amend{
  position: fixed;bottom: 0;width: 100%;height: 40px;line-height: 40px;
  text-align: center;background-color: $color-primary;color:white;
  font-size: 16px;
}
</style>