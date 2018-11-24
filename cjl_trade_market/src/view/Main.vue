<template>
    <div class="main wh-full">
        <my-header class="header-white" 
          :show-head-top='true'
          :headLogo='logo'>
        </my-header>
        <index-banner></index-banner>
        <notice-bar></notice-bar>
        <div class="content">
          <div class="list-table">
            <div class="panel m-bottom-10">
              <el-input suffix-icon="el-icon-search"></el-input>
              <ul class="tab-card">
                <li class="p-rel"
                  @click="onTabChange($event,item.id)"
                  v-for="(item,i) in tabItem"
                  :key="item.id"
                  :class="currentTabId==item.id?'active':''"
                  v-text="$t(item.i18nKey)||item.label">
                  <span v-if='i<3' class="dot abs-v-center"></span>
                </li>
              </ul>
            </div>
            <el-table style="width:100%;font-size:14px;border-top:1px solid #eee;" 
              :data='tableData'
              :cell-style='cellStyle'
              :fit='true'
              stripe>
              <el-table-column :label="$t('currencyPair')||'货币对'">
                <div class="flex flex-v-center" slot-scope="scope">
                  <img class="thumb-30 m-right-10" src="" alt="">
                  <span v-text="scope.row.currency"></span>
                </div>
              </el-table-column>
              <el-table-column width='150' :label="$t('status')||'状态'" prop='status'></el-table-column>
              <el-table-column :label="$t('price')||'价格'" prop='prize'></el-table-column>
              <el-table-column :label="'24H '+$t('highestPrice')||'最高价'" prop='maxVal'></el-table-column>
              <el-table-column :label="'24H '+$t('lowestPrice')||'最低价'" prop='miniumVal'></el-table-column>
              <el-table-column :label="'24H '+$t('volumn')||'成交量'" prop='volume'></el-table-column>
              <el-table-column :label="$t('priceTrends')+'（3'+$t('day')+'）'"></el-table-column>
              <el-table-column :label="$t('priceChange')+'（'+$t('day')+'）'" width='120px;'>
                <template slot-scope="scope">
                  <div class="operate">
                    <span v-text="scope.row.trend"></span>
                    <i class="el-icon-star-off"></i>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <advantage-intro></advantage-intro>
          <friend-link></friend-link>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
import friendLink from "@/components/home/FriendLink";
import AdvantageIntro from "@/components/home/AdvantageIntro";
export default {
  components: { friendLink, AdvantageIntro },
  data() {
    return {
      logo: require("@/assets/images/home/pcew_logo.png"),
      currentTabId: 1,
      tabItem: [
        {
          i18nKey: "btcMarket",
          label: "BTC交易区",
          id: 1
        },
        {
          i18nKey: "ethMarket",
          label: "ETH交易区",
          id: 2
        },
        {
          i18nKey: "usdtMarket",
          label: "USDT交易区",
          id: 3
        },
        {
          i18nKey: "optMarket",
          label: "自选区",
          id: 4
        }
      ],
      grid: {
        show: false
      },
      settings: {
        area: true
      },
      tableData: [
        {
          currency: " CNYT / BTC",
          status: "交易中",
          prize: "0.0000000886",
          maxVal: "0.000005482",
          miniumVal: "0.0000000905",
          volume: "15478220",
          trend: "+6%"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    cellStyle(row) {
      if (row.columnIndex == 1) {
        return "color:#4FA56D;";
      }
    },
    onTabChange(e, id) {
      return (this.currentTabId = id);
    }
  }
};
</script>
<style lang="scss" scoped>
.dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background: #666;
  right: -40px;
}
.content {
  width: $content-width;
  @include hCenter;
  .list-table {
    margin-top: 40px;
    .status {
      color: red !important;
    }
    .operate {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        cursor: pointer;
      }
    }
  }
  .tab-card {
    overflow: hidden;
    margin-right: 200px;
    li {
      @include textVcenter(40px);
      margin: 0 44px;
      display: inline-block;
      color: #666;
      font-size: $font-large;
      cursor: pointer;
      &.active {
        color: #be272e;
        border-bottom: 1px solid #be272e;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .el-input {
    width: 200px;
    float: right;
  }
}
</style>

