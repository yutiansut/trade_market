<template>
  <div class="main w-full">
    <my-header
      class="header-white"
      :show-head-top='true'
      :headLogo='logo'
    >
      <div
        slot='top-slot'
        class="mr-25"
      >
        <span class="fl">[公告]</span>
        <ul class="swip">
          <transition-group name="el-fade-in">
            <li
              v-show="newIndex==index"
              v-for="(item,index) in newsList"
              :key='index'
            >
              <router-link
                :to='"/notice/detail/"+item.id'
                v-text="item.title"
              ></router-link>
            </li>
          </transition-group>
        </ul>
      </div>
    </my-header>
    <index-banner></index-banner>
    <notice-bar @onNewsLoad='onNewsLoad'></notice-bar>
    <div class="content">
      <div class="list-table">
        <div class="panel m-bottom-10">
          <el-input
            v-model="searchVal"
            @input="searchCoin"
            :placeholder='searchLabel'
            suffix-icon="el-icon-search"
          >
          </el-input>
          <ul class="tab-card">
            <li
              class="p-rel"
              v-for="(item,i) in mainCoinModel.maincoin"
              :key="item.id"
              :class="currentCoinId==item.coinid?'active':''"
              @click="onTabChange($event,i,item.coinid)"
            >
              {{item.coinid}}&nbsp;{{$t('trade')}}
              <!-- <span v-if='i<mainCoinModel.maincoin.length-1' class="dot abs-v-center"></span> -->
              <span class="dot abs-v-center"></span>
            </li>
            <li
              @click="getCustomList"
              :class="currentCoinId=='opt'?'active':''"
              v-show="mainCoinModel.maincoin"
            >{{$t('optMarket')}}
            </li>
          </ul>
        </div>
        <el-table
          style="width:100%;font-size:16px;border-top:1px solid #eee;"
          :data='tableData'
          v-loading='loading'
        >
          <el-table-column
            width='200'
            class-name='el-tab-col-1'
            :label="$t('currencyPair')||'货币对'"
          >
            <div
              class="flex flex-v-center"
              slot-scope="scope"
            >
              <img
                class="thumb-30 m-right-10"
                :src="scope.row.logo"
                alt=""
              >
              <span class="currency-pair">
                <em class="font-bold">{{scope.row.coinid}}&nbsp;</em>
                <em class="color-999">{{scope.row.maincoinid}}</em>
              </span>
            </div>
          </el-table-column>
          <el-table-column
            width='150'
            :label="$t('status')||'状态'"
          >
            <span
              slot-scope="scope"
              v-text="statusMap['s_'+scope.row.state]"
              :class="'status_'+scope.row.state"
            >
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
          <el-table-column
            :label="($t('priceChange')||'涨跌')+'（'+($t('day')||'日')+'）'"
            width='120px;'
          >
            <template slot-scope="scope">
              <span
                :class="scope.row.rise>0?'color-danger':'color-success'"
                v-text="scope.row.rise*1+'%'"
              >
              </span>
            </template>
          </el-table-column>
          <el-table-column width='150'>
            <div
              class="btn-container flex flex-between"
              slot-scope="scope"
            >
              <button
                v-text="$t('label132')"
                @click="goTrade('/currency_trade',scope.row)"
                class="trade-btn btn-small btn-danger btn-hover"
              >
              </button>
              <button
                v-text="$t('label133')"
                @click="goTrade('/kline_trade',scope.row)"
                class="trade-btn btn-small btn-success btn-hover"
              >
              </button>
            </div>
          </el-table-column>
          <el-table-column
            align='center'
            :label='$t("optMarket")'
            width='80'
          >
            <div
              @click="addMylist(scope.row,scope.$index)"
              :title="$t('label109')"
              class="option wh-full"
              slot-scope="scope"
            >
              <i
                class="icon-star font-18 color-danger"
                :class="scope.row.isMyLike?'el-icon-star-on':'el-icon-star-off'"
              >
              </i>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import indexBanner from "@/components/home/IndexBanner.vue";
import noticeBar from "@/components/home/NoticeBar.vue";
import mainCoinModel from "@/model/allCoinModel.js";
import {
  addCustomList,
  removeCustomList,
  matchCustomList
} from "@/assets/js/common.js";
export default {
  components: {
    indexBanner,
    noticeBar
  },
  data() {
    return {
      logo: require("@/assets/images/home/pcew_logo.png"),
      currentCoinId: "",
      loading: true,
      mainCoinModel: mainCoinModel,
      statusMap: {
        s_0: "禁用",
        s_1: "可用"
      },
      searchVal: "",
      tableData: [],
      rawData: [],
      newsList: [],
      newIndex: 0,
      timer: null
    };
  },
  computed: {
    searchLabel() {
      return `${this.$t("currencySearch")}(${this.currentCoinId})`;
    }
  },
  mounted() {
    if (mainCoinModel.coinid) {
      this.getTradCoin(mainCoinModel.coinid);
      this.currentCoinId = mainCoinModel.coinid;
      return;
    }
    this.$bus.on("mainCoinLoad", coin => {
      this.currentCoinId = coin;
      this.getTradCoin(coin);
    });
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
  methods: {
    onNewsLoad(data) {
      this.newsList = data;
      this.newSwip();
    },
    newSwip() {
      let i = 0;
      this.timer = setInterval(() => {
        let len = this.newsList.length;
        if (i > len - 1) {
          i = 0;
        }
        this.newIndex = i;
        i++;
      }, 3000);
    },
    // 添加自选
    addMylist(rowData, index) {
      let data = rowData;
      this.$set(this.tableData, index, data);
      data.isMyLike = !data.isMyLike;
      if (data.isMyLike) {
        addCustomList(data);
      } else {
        if (this.currentCoinId == "opt") {
          this.tableData = removeCustomList(data);
        } else {
          removeCustomList(data);
        }
      }
    },
    onTabChange(e, index, coinid) {
      if (coinid == this.currentCoinId) return;
      this.currentCoinId = coinid;
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
    // 获取我的自选
    getCustomList() {
      let customList = this.storage.get("customList");
      this.currentCoinId = "opt";
      if (customList) {
        this.tableData = customList;
      } else {
        this.tableData = [];
      }
    },
    // 获取币种交易行情
    getTradCoin(coinid) {
      this.loading = true;
      this.request(this.api.getTradCoin, {
        maincoin: coinid
      }).then(res => {
        console.log(`交易币种:${JSON.stringify(res)}`);
        this.loading = false;
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        if (res.data && res.data.list && res.data.list[0]) {
          this.tableData = matchCustomList(res.data.list);
          this.rawData = res.data.list.slice(0);
        }
      });
    },
    //搜索币种
    searchCoin() {
      if (this.searchVal == "") {
        this.tableData = this.rawData;
        return false;
      }
      let result = [];
      this.rawData.map(item => {
        if (
          item.coinid &&
          item.coinid.toLowerCase().indexOf(this.searchVal.toLowerCase()) != -1
        ) {
          result.push(item);
        }
      });
      this.tableData = result;
    },
    //跳转
    goTrade(api, data) {
      this.navigateTo(api, {
        maincoinid: data.maincoinid,
        coinid: data.coinid
      });
    }
  }
};
</script>
<style>
.el-tab-col-1 .cell {
  padding: 0;
}
</style>

<style lang="scss" scoped>
.dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background: #666;
  right: -40px;
}
.swip {
  display: inline-block;
  margin-left: 15px;
  color: #fff;
  overflow: hidden;
}
.trade-btn {
  margin-left: 6px;
  &:first-child {
    margin-left: 0;
  }
}
.btn-container {
  margin: 0 -10px;
  @media screen and (max-width: 1440px) {
    flex-direction: column;
    .trade-btn {
      margin-left: 0;
      margin-top: 6px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
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
  .option {
    text-align: center;
    cursor: pointer;
  }
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
      padding: 0 10px;
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
.currency-pair {
  cursor: pointer;
  em:hover {
    color: $color-danger;
  }
}
</style>

