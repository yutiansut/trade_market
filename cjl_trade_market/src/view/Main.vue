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
                  v-for="(item,i) in mainCoinModel.maincoin"
                  :key="item.id"
                  :class="currentCoinId==i?'active':''"
                  @click="onTabChange($event,i,item.coinid)">
                  {{item.coinid}}&nbsp;{{$t('trade')}}
                  <span v-if='i<mainCoinModel.length-1' class="dot abs-v-center"></span>
                </li>
              </ul>
            </div>
            <el-table style="width:100%;font-size:14px;border-top:1px solid #eee;" 
              :data='tableData'
              :fit='true'
              v-loading='loading'
              stripe>
              <el-table-column
                width='200'
                :label="$t('currencyPair')||'货币对'">
                <div class="flex flex-v-center" slot-scope="scope">
                  <img class="thumb-30 m-right-10" :src="scope.row.logo" alt="">
                  <span>{{scope.row.coinid}}&nbsp;/&nbsp;<em class="color-999">{{scope.row.maincoinid}}</em></span>
                </div>
              </el-table-column>
              <el-table-column width='150' :label="$t('status')||'状态'">
                <span slot-scope="scope"
                  v-text="statusMap['s_'+scope.row.state]"
                  :class="'status_'+scope.row.state">
                </span>
              </el-table-column>
              <el-table-column :label="$t('price')||'价格'">
                <template slot-scope="scope">{{scope.row.prise*1}}</template>
              </el-table-column>
              <el-table-column :label="'24H '+$t('highestPrice')||'最高价'">
                <template slot-scope="scope">{{scope.row.height*1}}</template>
              </el-table-column>
              <el-table-column :label="'24H '+$t('lowestPrice')||'最低价'">
                <template slot-scope="scope">{{scope.row.low*1}}</template>
              </el-table-column>
              <el-table-column :label="'24H '+$t('volumn')||'成交量'">
                <template slot-scope="scope">{{scope.row.number*1}}</template>
              </el-table-column>
              <!-- <el-table-column :label="$t('priceTrends')+'（3'+$t('day')+'）'"></el-table-column> -->
              <el-table-column :label="($t('priceChange')||'涨跌')+'（'+($t('day')||'日')+'）'" width='120px;'>
                <template slot-scope="scope">
                  <div class="operate">
                    <span v-text="scope.row.rise*1"></span>
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
import mainCoinModel from "@/model/allCoinModel.js";
export default {
  components: { friendLink, AdvantageIntro },
  data() {
    return {
      logo: require("@/assets/images/home/pcew_logo.png"),
      currentTabId: 0,
      currentCoinId: "",
      loading: true,
      mainCoinModel: mainCoinModel,
      statusMap: {
        s_0: "交易中",
        s_1: "禁用"
      },
      grid: {
        show: false
      },
      tableData: null
    };
  },
  mounted() {
    if (mainCoinModel.coinid) {
      this.getTradCoin(mainCoinModel.coinid);
      return;
    }
    this.$bus.on("mainCoinLoad", coin => {
      this.getTradCoin(coin);
    });
  },
  methods: {
    onTabChange(e, index, coinid) {
      if (index == this.currentCoinId) return;
      this.loading = !this.loading;
      this.currentCoinId = index;
      this.getTradCoin(coinid);
    },
    // 获取所有币种列表
    getAllCoin() {
      this.request(this.api.allcoin).then(res => {
        console.log(`币种列表:${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.tableData = res.data.list);
      });
    },
    // 获取币种交易行情
    getTradCoin(coinid) {
      this.request(this.api.getTradCoin, {
        maincoin: coinid
      }).then(res => {
        console.log(`交易币种:${JSON.stringify(res)}`);
        this.loading = !this.loading;
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.tableData = res.data.list);
      });
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
span.status_0 {
  color: $color-success;
}
span.status_1 {
  color: #999;
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

