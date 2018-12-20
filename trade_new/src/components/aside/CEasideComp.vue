<template>
    <div class="side">
        <!-- tab选项卡 -->
        <div class="tab-wrap p-rel">
          <el-tabs v-model="currentId" type="card" @tab-click="onTabChange">
            <el-tab-pane 
              v-for="(item,i) in mainCoinModel.maincoin"
              :key="i"
              :label="item.coinid+' '+$t('trade')"
              :name="item.coinid">
            </el-tab-pane>
            <el-tab-pane v-show="mainCoinModel.maincoin"
              :label="$t('optMarket')"
              name='opt'>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-input suffix-icon="el-icon-search"></el-input>
        <el-table style="font-size:14px;"
          :data='tableData'
          v-loading='showLoading'
          @row-click='onTableRowClick'
          stripe>
          <el-table-column :label='$t("coin")||"币种"' width='100px'>
              <template slot-scope="scope">
              <div class="operate">
                  <img class="thumb-20 m-right-10" :src="scope.row.logo" alt="">
                  <span>{{scope.row.coinid}}</span>
              </div>
              </template>
          </el-table-column>
          <el-table-column :label='$t("latestPrice")||"最新价"' >
            <template slot-scope="scope">
              {{scope.row.prise*1}}
            </template>
          </el-table-column>
          <el-table-column
            :label='$t("increase")||"涨幅"'
            width='100'>
            <template slot-scope="scope">
              <span :class="scope.row.rise*1>0?'color-danger':'color-success'" v-text="scope.row.rise*1+'%'"></span>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            :label='$t("optional")||"自选"'
            width='80'>
              <template slot-scope="scope">
              <div
                @click.stop="addMylist(scope.row,scope.$index)"
                class="operate flex flex-h-center">
                <i class="font-18 flex-center"
                  :class="scope.row.isMyLike?'el-icon-star-on':'el-icon-star-off'">
                </i>
              </div>
              </template>
          </el-table-column>
      </el-table>
    </div>
</template>
<script>
import mainCoinModel from "@/model/allCoinModel.js";
import {
  addCustomList,
  removeCustomList,
  matchCustomList
} from "@/assets/js/common.js";
export default {
  name: "ce-aside-comp",
  data() {
    return {
      mainCoinModel: mainCoinModel,
      currentId: 0,
      tableData: null,
      showLoading: true
    };
  },
  mounted() {
    if (mainCoinModel.coinid) {
      if (this.$route.query.maincoinid) {
        mainCoinModel.coinid = this.$route.query.maincoinid;
      }
      this.getTradCoin(mainCoinModel.coinid);
      this.currentId = mainCoinModel.coinid;
      return;
    }
    this.$bus.on("mainCoinLoad", coinid => {
      this.currentId = coinid;
      this.getTradCoin(coinid);
    });
  },
  destroyed() {
    this.$bus.off("tradeCoinLoad");
  },
  methods: {
    onTabChange() {
      if (this.currentId == "opt") {
        let customList = this.storage.get("customList");
        this.tableData =
          (customList && customList.length) > 0 ? customList : [];
        if (!customList[0]) return false;
        this.passCoinInfo(customList);
      } else {
        this.getTradCoin(this.currentId);
      }
      // this.$emit("onAsideTabChange");
    },
    // 向父组件传递币种信息
    passCoinInfo(listArr, maincoinid, tradecoind) {
      if (!listArr) return false;
      let data = listArr[0];
      if (maincoinid && tradecoind) {
        listArr.map(item => {
          if (!item.maincoinid || !item.coinid) return;
          if (item.maincoinid == maincoinid && item.coinid == tradecoind) {
            data = item;
          }
        });
      }
      this.$bus.emit("tradeCoinLoad", data);
    },
    // // 获取自选
    // getCustomList() {
    //   let customList = this.storage.get("customList");
    //   this.currentId = "opt";
    //   customList && customList.length > 0 && (this.tableData = customList);
    // },
    // 添加自选
    addMylist(rowData, index) {
      let data = rowData;
      this.$set(this.tableData, index, data);
      data.isMyLike = !data.isMyLike;
      if (data.isMyLike) {
        addCustomList(data);
      } else {
        if (this.currentId == "opt") {
          this.tableData = removeCustomList(data);
        } else {
          removeCustomList(data);
        }
      }
    },
    // 获取币种交易行情
    getTradCoin(coinid) {
      this.showLoading = true;
      this.request(this.api.getTradCoin, {
        maincoin: coinid
      }).then(res => {
        this.showLoading = false;
        console.log(`交易币种:${JSON.stringify(res)}`);
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        }
        mainCoinModel.coinid = coinid;
        if (res.data && res.data.list) {
          this.tableData = matchCustomList(res.data.list);
          if (res.data.list[0]) {
            this.passCoinInfo(
              res.data.list,
              this.$route.query.maincoinid,
              this.$route.query.coinid
            );
          }
        }
      });
    },
    //表格列点击
    onTableRowClick(rowData) {
      this.$emit("onRowClick", rowData);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input {
  margin-top: 10px;
}
.operate {
  cursor: pointer;
  display: flex;
}
.active {
  color: $color-danger;
}
.tab-wrap {
  height: 40px;
  border-bottom: $default-border;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  ul {
    @include textVcenter;
    position: absolute;
    white-space: nowrap;
    display: flex;
    top: 1px;
    li {
      padding: 0 25px;
      box-sizing: border-box;
      text-align: center;
      font-size: $font-normal;
      border: 1px solid transparent;
      border-bottom-color: $bd-color;
      font-weight: 500;
      &:first-child {
        border-left-color: transparent;
      }
      &:hover {
        cursor: pointer;
      }
      &.active {
        border-color: $bd-color;
        border-bottom-color: #fff;
      }
    }
  }
}
</style>

