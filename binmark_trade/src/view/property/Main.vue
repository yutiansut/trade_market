<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <div class="container">
            <div class="bread-nav flex flex-v-center">
                <router-link to='/property' v-text="$t('myAssets')||'我的资产'"></router-link>
                <router-link v-if="routeData.assetsRoutes"
                  :to=' routeData.assetsRoutes.path||""'
                  v-text="$t(routeData.assetsRoutes.i18nKey)"
                  class="current">
                </router-link>
            </div>
            <router-view></router-view>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      routeData: this.routeModel
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: $content-width;
  margin: 30px auto 40px auto;
  min-height: calc(100% - 294px);
}
.bread-nav {
  font-size: $font-normal;
  font-weight: bold;
  a::before {
    position: relative;
    top: 2px;
    display: inline-block;
    margin: 0 5px;
    content: "/";
    color: #333 !important;
    font-size: 20px;
  }
  a:first-child::before {
    content: "";
    margin: 0;
  }
  a.current {
    color: $color-danger;
  }
}
</style>
