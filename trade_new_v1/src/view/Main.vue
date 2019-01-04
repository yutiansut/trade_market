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
    <!-- 首页banner -->
    <main-banner></main-banner>
    <div class="panel clear-mt-fix bg-fff">
      <!-- 行情 -->
      <div class="content content-width">
        <div class="panel-hd h-40">
          <span class="font-30">推荐</span>
        </div>
        <el-row
          gutter="20"
          class="trend"
        >
          <el-col span='6'>
            <div>
              <div class="flex flex-between">
                <div class="flex flex-v-center">
                  <img
                    class="thumb-25"
                    src="http://www.binmark.io/images/logo/1546499563166btc.png"
                  >
                  <span>TRX</span>&nbsp;
                  <span class="color-999">/&nbsp;ETH</span>
                </div>
                <span class="color-success flex flex-v-center">
                  <i class="el-icon-sort-up"></i>&nbsp;
                  <em>0.89%</em>
                </span>
              </div>
              <div class="price">
                <span>0.00015099</span>
                <span class="color-999">≈&nbsp;￥0.0996</span>
              </div>
            </div>
          </el-col>
          <el-col span='6'>
            <div>
              <div class="flex flex-between">
                <div class="flex flex-v-center">
                  <img
                    class="thumb-25"
                    src="http://www.binmark.io/images/logo/1546499563166btc.png"
                  >
                  <span>TRX</span>&nbsp;
                  <span class="color-999">/&nbsp;ETH</span>
                </div>
                <span class="color-success flex flex-v-center">
                  <i class="el-icon-sort-up"></i>&nbsp;
                  <em>0.89%</em>
                </span>
              </div>
              <div class="price">
                <span>0.00015099</span>
                <span class="color-999">≈&nbsp;￥0.0996</span>
              </div>
            </div>
          </el-col>
          <el-col span='6'>
            <div>
              <div class="flex flex-between">
                <div class="flex flex-v-center">
                  <img
                    class="thumb-25"
                    src="http://www.binmark.io/images/logo/1546499563166btc.png"
                  >
                  <span>TRX</span>&nbsp;
                  <span class="color-999">/&nbsp;ETH</span>
                </div>
                <span class="color-success flex flex-v-center">
                  <i class="el-icon-sort-up"></i>&nbsp;
                  <em>0.89%</em>
                </span>
              </div>
              <div class="price">
                <span>0.00015099</span>
                <span class="color-999">≈&nbsp;￥0.0996</span>
              </div>
            </div>
          </el-col>
          <el-col span='6'>
            <div>
              <div class="flex flex-between">
                <div class="flex flex-v-center">
                  <img
                    class="thumb-25"
                    src="http://www.binmark.io/images/logo/1546499563166btc.png"
                  >
                  <span>TRX</span>&nbsp;
                  <span class="color-999">/&nbsp;ETH</span>
                </div>
                <span class="color-success flex flex-v-center">
                  <i class="el-icon-sort-up"></i>&nbsp;
                  <em>0.89%</em>
                </span>
              </div>
              <div class="price">
                <span>0.00015099</span>
                <span class="color-999">≈&nbsp;￥0.0996</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 币种列表 -->
      <div class="market content content-width">
        <div class="panel-hd flex h-40">
          <span class="font-30">市场</span>
          <ul class="tab-card font-bold">
            <li class="p-rel active font-16">
              <span>ETH交易</span>
              <span class="dot abs-v-center"></span>
              <i class="abs-h-center el-icon-caret-top"></i>
            </li>
            <li class="p-rel font-16">
              <span>BTC交易</span>
              <span class="dot abs-v-center"></span>
              <i class="abs-h-center el-icon-caret-top"></i>
            </li>
            <li class="p-rel font-16">
              <span>自选</span>
              <i class="abs-h-center el-icon-caret-top"></i>
            </li>
          </ul>
        </div>
        <el-table style="font-size:16px;">
          <el-table-column :label="$t('label18')">
            <div
              slot-scope="data"
              class="flex flex-v-center"
            >
              <img
                class="thumb-30 m-right-10"
                :src="data.row.logo"
                alt=""
              >
              <span class="currency-pair">
                <em class="font-bold"></em>
                <em class="color-999"></em>
              </span>
            </div>
          </el-table-column>
          <el-table-column :label="$t('label19')">
          </el-table-column>
          <el-table-column
            width="150"
            :label="$t('label20')"
          >
            <span
              slot-scope="data"
              :class="data.row.rise>0?'color-danger':'color-success'"
              v-text="data.row.rise*1+'%'"
            >
            </span>
          </el-table-column>
          <el-table-column :label="$t('label21')"></el-table-column>
          <el-table-column :label="$t('label22')"></el-table-column>
          <el-table-column :label="$t('label23')"></el-table-column>
          <el-table-column
            width="100"
            align='center'
            :label="$t('label24')"
          ></el-table-column>
        </el-table>
        <button
          class="btn-all btn-radius btn-large btn-round"
          v-text="$t('label25')"
        ></button>
      </div>
    </div>
    <!-- 平台优势 -->
    <div class="panel clear-mt-fix">
      <div class="content content-width">
        <div class="panel-title txt-center">
          <span>平台优势</span>
          <div class="border"></div>
        </div>
        <el-row class="why-us">
          <el-col
            class="flex flex-h-center"
            span='8'
          >
            <div class='adv-intro'>
              <div class="txt-center">
                <img
                  :src="assetCfg.imgs.adv_2"
                  alt=""
                >
              </div>
              <div class="slogan font-20 font-bold txt-center">安全第一</div>
              <div class="detail color-666 txt-center">Exchange旨在保护您的资产及信息安全银行级风控提供24小时全面防护请参阅我们的<router-link
                  class="color-primary"
                  to=''
                >安全策略</router-link>
              </div>
            </div>
          </el-col>
          <el-col
            class="flex flex-h-center"
            span='8'
          >
            <div class='adv-intro'>
              <div class="txt-center">
                <img
                  :src="assetCfg.imgs.adv_1"
                  alt=""
                >
              </div>
              <div class="slogan font-20 font-bold txt-center">快速提现</div>
              <div class="detail color-666 txt-center">交易更便捷，10分钟快速提币我们支持24小时的高额提币点击进入<router-link
                  class="color-primary"
                  to=''
                >我的资产</router-link>
              </div>
            </div>
          </el-col>
          <el-col
            class="flex flex-h-center"
            span='8'
          >
            <div class='adv-intro'>
              <div class="txt-center">
                <img
                  :src="assetCfg.imgs.adv_4"
                  alt=""
                >
              </div>
              <div class="slogan font-20 font-bold txt-center">用户体验</div>
              <div class="detail color-666 txt-center">我们为您提供7*24小时专的服务Exchange 让你更专注交易了解更多<router-link
                  class="color-primary"
                  to=''
                >专业知识</router-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 关于我们 -->
    <div
      :style="{backgroundImage:'url('+assetCfg.imgs.banner_1+')'}"
      class="about-us panel clear-mt-fix"
    >
      <div class="content content-width">
        <div class="panel-title">关于我们</div>
        <p class="intro font-16">Exchange（全球区块链数字资产交易中心）是安全、稳定、可信赖的区块链数字资产全功能交易平台总部GBC（全球区块链研究中心）致力于整合区块链行业资源，建立全球性的区块链行业交流及研究中心</p>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import mainBanner from "@/components/banner/MainBanner";
export default {
  components: { mainBanner },
  data() {
    return {
      activeIndex: "ETH"
    };
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.bg-fff {
  background-color: #fff;
}
.panel {
  .content {
    margin-top: 60px;
  }
  .panel-hd {
    line-height: 40px;
  }
}
.panel-title {
  font-size: 34px;
  .border {
    width: 36px;
    margin: 23px auto 0 auto;
    border-bottom: 3px solid $color-primary;
  }
}
.trend {
  margin-top: 30px;
  .el-col {
    border-radius: 1px;
    > div {
      box-sizing: border-box;
      padding: 16px 16px 4px 16px;
      box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05);
      height: 120px;
    }
    img[class^="thumb"] {
      margin-right: 8px;
    }
  }
  .price {
    margin-top: 13px;
    margin-bottom: 22px;
  }
}
.tab-card {
  margin-left: 40px;
  .dot {
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background: #666;
    right: -40px;
  }
  overflow: hidden;
  li {
    margin: 0 44px;
    padding: 0 10px;
    display: inline-block;
    color: #999;
    cursor: pointer;
    i {
      bottom: -4px;
      visibility: hidden;
    }
    &.active {
      color: $color-primary;
      border-bottom: 1px solid $color-primary;
      i {
        visibility: visible;
      }
    }
    &:first-child {
      margin-left: 0;
    }
  }
}
.el-table {
  margin-top: 30px;
}
.currency-pair {
  cursor: pointer;
  em:hover {
    color: $color-danger;
  }
}
.market {
  padding-bottom: 60px;
}
.btn-all {
  border: 1px solid $color-primary;
  color: $color-primary;
  display: block;
  margin: 30px auto 0 auto;
}
.why-us {
  margin-bottom: 35px;
  margin-top: 60px;
}
.adv-intro {
  width: 260px;
  display: flex;
  flex-direction: column;
  img {
    width: auto;
  }
  .detail {
    line-height: 1.8;
    margin-top: 22px;
  }
}
.about-us {
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
  color: #fff;
  .intro {
    width: 740px;
    line-height: 2;
    text-align: justify;
    margin-top: 29px;
  }
}
</style>

