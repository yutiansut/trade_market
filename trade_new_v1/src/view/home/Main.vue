<template>
  <div class="main wh-full">
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
    <transition name="el-fade-in">
      <router-view></router-view>
    </transition>
    <my-footer></my-footer>
  </div>
</template>