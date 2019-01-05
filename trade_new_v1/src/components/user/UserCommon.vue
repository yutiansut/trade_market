<template>
  <el-row class="container box">
    <el-col
      :style="{backgroundImage:'url('+assetCfg.imgs.login_bg+')'}"
      span="12"
    ></el-col>
    <el-col
      class="box-cont"
      span="12"
    >
      <slot></slot>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.box {
  width: 800px;
  margin: 25px auto 30px auto;
  border-radius: 4px;
  height: 580px;
  .el-col {
    height: 100%;
    &:first-child {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
.box-cont {
  background-color: #fff;
}
</style>

