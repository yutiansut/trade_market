<template>
    <div class='main wh-full'>
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <el-aside width="24%">
                <ce-aside-comp @onRowClick='getRowData'></ce-aside-comp>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
  methods: {
    getRowData(data) {
      this.navigateTo("/currency_trade", { data: JSON.stringify(data) });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  border-bottom: $default-border;
  min-height: calc(100% - 360px);
}
</style>
