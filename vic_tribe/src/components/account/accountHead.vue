<template>
  <div class="account-head flex flex-v-center flex-between">
    <img
      :src="logo"
      alt=""
    >
    <router-link
      :to='to'
      v-text="linkLabel"
    ></router-link>
  </div>
</template>
<script>
export default {
  props: {
    linkLabel: {
      default: "注册账号",
      type: String
    },
    to: {
      type: String,
      default: "/account/register"
    },
    logo: {
      type: String,
      default: require("@/assets/images/login/logo.png")
    }
  }
};
</script>

<style lang="scss" scoped>
.account-head {
  img {
    width: 10.6%;
  }
  a {
    color: #fff;
    font-size: 1.6rem;
  }
}
</style>

