<template>
  <div class="main wh-full">
    <my-header class="header-main">
      <login-bar></login-bar>
    </my-header>
    <el-container class="container">
      <user-aside></user-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
    <my-footer></my-footer>
  </div>
</template>
<script>
import userAside from "@/components/aside/UserAside";
export default {
  components: { userAside },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100% - 294px);
  padding: 30px 0;
  width: 77%;
  margin: 0 auto;
  .el-main {
    padding-top: 0;
  }
}
</style>

