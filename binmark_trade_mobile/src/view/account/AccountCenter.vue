<template>
  <div class="container h-full">
    <div class="content van-hairline--top h-full">
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
    </div>
    <div class="btn-group">
      <button
        @click="logOut"
        class="btn-primary btn-large btn-block"
      >退出登录</button>
    </div>
  </div>
</template>
<script>
import { getUserInfo, Logout } from "../../vuexStore/storeService";
export default {
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
</style>