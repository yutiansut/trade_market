<template>
    <div class="side">
        <!-- tab选项卡 -->
        <div class="tab-wrap p-rel">
          <ul>
            <li @click="onTabChange(item.coinid,i)" v-for="(item,i) in mainCoinModel.maincoin" 
              :key="i"
              :class='currentId==i?"active":""'>
              {{item.coinid}}&nbsp;{{$t('trade')}}
          </li>
        </ul>
        </div>
        <el-input suffix-icon="el-icon-search"></el-input>
        <el-table style="font-size:14px;"
          :data='tableData'
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
          <el-table-column
            :label='$t("latestPrice")||"最新价"' 
            prop='prise'>
          </el-table-column>
          <el-table-column 
            :label='$t("increase")||"涨幅"'
            width='100'>
            <template slot-scope="scope">
              <span :class="scope.row.rise*1>0?'color-danger':'color-success'" v-text="scope.row.rise"></span>
            </template>
          </el-table-column>
          <el-table-column
            :label='$t("optional")||"自选"'
            width='80'>
              <template slot-scope="scope">
              <div class="operate">
                  <span v-text="scope.row.trend"></span>
                  <i class="el-icon-star-off"></i>
              </div>
              </template>
          </el-table-column>
      </el-table>
    </div>
</template>
<script>
import mainCoinModel from "@/model/allCoinModel.js";
export default {
  name: "ce-aside-comp",
  data() {
    return {
      mainCoinModel: mainCoinModel,
      currentId: 0,
      tableData: null
    };
  },
  mounted() {
    if (mainCoinModel.coinid) {
      this.getTradCoin(mainCoinModel.coinid);
      return;
    }
    this.$bus.on("mainCoinLoad", coinid => {
      this.getTradCoin(coinid);
    });
  },
  destroyed() {
    this.$bus.off("tradeCoinLoad");
  },
  methods: {
    onTabChange(coinid, index) {
      if (index == this.currentId) return;
      this.currentId = index;
      this.getTradCoin(coinid);
    },
    // 获取币种交易行情
    getTradCoin(coinid) {
      this.request(this.api.getTradCoin, { maincoin: coinid }).then(res => {
        console.log(`交易币种:${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.tableData = res.data.list);
        mainCoinModel.tradecoinid = res.data.list[0].coinid;
        this.$bus.emit("tradeCoinLoad", {
          maincoin: res.data.list[0].maincoinid,
          tradecoin: res.data.list[0].coinid,
          currentSubCoin: res.data.list[0]
        });
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

