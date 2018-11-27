<template>
    <div>
        <img :src="banner" alt="">
        <div class="main">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('home')||"首页"}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/help_center/faq' }">{{$t('faqCenter')||"问题中心"}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{$t(breadNavItem.i18nKey)||breadNavItem.label}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-container>
            <el-aside width="360px">
              <ul class="list">
                <li class="active">如何查询成交记录？</li>
                <li>如何查询成交记录？</li>
                <li>如何查询成交记录？</li>
                <li>如何查询成交记录？</li>
                <li>如何查询成交记录？</li>
                <li>如何查询成交记录？</li>
              </ul>
            </el-aside>
            <el-main>
              <h1>如何查询委托记录？</h1>
              <p>下单后需要有匹配的价格才能成交，未成交的挂单可以查询操作撤单或等待成交。</p>
              <p>一、网页版查询方式</p>
              <p>下单后需要有匹配的价格才能成交，未成交的挂单可以查询操作撤单或等待成交。一、网页版查询方式</p>
              <p>2、查询“我的挂单”，如果挂单一直没有成交，您可以点击撤单。</p>
              <div class="warn">
                注意：
                <p>1、挂单没有时间限制，价格匹配就会成交；</p>
                <p>2、下单后没有匹配的价格会在挂单状态，未成交的随时可以操作撤单，撤单无手续费；</p>
                <p>3、撤单后资金返回账户，可在账户余额或账单明细进行查询。</p>
              </div>
            </el-main>
          </el-container>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      banner: require("@/assets/images/help/bangzhu_banner.png"),
      qList: {},
      breadNavItem: {}
    };
  },
  mounted() {
    let q = Object.assign({}, this.$route.query);
    if (JSON.stringify(q) != "{}") {
      q.qList && (this.qList = q.qList);
      q.tabItem && (this.breadNavItem = q.tabItem);
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 77%;
  margin: 30px auto 0 auto;
  .el-container {
    margin-top: 27px;
  }
  .el-aside {
    border-right: none;
    padding: 0;
  }
  .list {
    li {
      @include textVcenter;
      padding-left: 10px;
      &:hover,
      &.active {
        background: $color-danger;
        color: #fff;
      }
    }
  }
  .el-main {
    h1 {
      margin-bottom: 25px;
    }
    padding: 0 0 0 40px;
    p {
      line-height: 1.8;
    }
  }
  .warn {
    margin-top: 25px;
    color: $color-danger;
  }
}
</style>


