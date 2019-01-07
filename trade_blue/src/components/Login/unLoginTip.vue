<template>
  <div
    v-if='userData.isLogin==false'
    class="content font-16"
  >
    <span v-text="$t('label145')"></span>
    <router-link
      to='/user/login'
      v-text="$t('login')"
    ></router-link>
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
    color: $color-primary;
  }
}
</style>
