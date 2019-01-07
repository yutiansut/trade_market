<template>
  <div class="wh-full">
    <my-header>
      <!-- 导航 -->
      <nav-bar slot="navBar"></nav-bar>
      <!-- 登录后的状态栏 -->
      <status-bar slot="statusBar">
        <bar-item
          slot="barItem"
          icon-class="icon-zichan"
          label='label16'
        ></bar-item>
        <bar-item
          icon-class="icon-dingdan"
          slot="barItem"
          label='label17'
        ></bar-item>
      </status-bar>
    </my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>
<style lang="scss">
.container {
  min-height: calc(100% - 450px);
}
</style>
