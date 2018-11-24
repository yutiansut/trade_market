<template>
    <div v-if='userData.isLogin==false' class="content font-16">
        <router-link to='/user/login'>登录</router-link>
        <span>后才可查看</span>
    </div>
</template>
<script>
export default {
  name: "unlogin-tip",
  data() {
    return {
      userData: this.userModel
    };
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  @include textVcenter(100px);
  background: #fcfcfc;
  text-align: center;
  > a {
    color: $color-danger;
  }
}
</style>
