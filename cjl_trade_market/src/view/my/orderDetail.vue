<template>
    <div class="content">
      <div class="title font-16 font-bold" v-text="$t('billDetail')||'账单明细'"></div>
      <div class="table-wrap">
        <div class="filter-bar flex flex-v-center">
            <el-input v-model="searchVal" suffix-icon='el-icon-search' size='small'></el-input>
            <button
              @click="searchCoin"
              class="btn-inline btn-small btn-danger btn-active m-left-10"
              v-text="$t('inquire')||'查询'">
            </button>
        </div>
        <el-table
          v-loading='showLoading'
          max-height='500'
          :data='orderDetailData'>
          <el-table-column :label='$t("orderNum")||"序号"' width='200' type='index'></el-table-column>
          <el-table-column :label='$t("time")||"时间"' prop='wdate'></el-table-column>
          <el-table-column :label='$t("type")||"类型"'>
            <span slot-scope="scope" v-text="scope.row.type=='买入'?$t('buy'):$t('sell')"></span>
          </el-table-column>
          <el-table-column :label='$t("currencyType")||"币种"' prop='coin'></el-table-column>
          <el-table-column :label='$t("amount")||"数量"'>
            <template slot-scope="scope">
              {{scope.row.number*1}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<style lang="scss" scoped>
.table-wrap {
  border: $default-border;
  border-bottom: none;
  .filter-bar {
    padding: 0 15px;
    @include textVcenter;
    border-bottom: $default-border;
    background-color: #fcfcfc;
    .el-input {
      width: 300px;
    }
  }
}
.title {
  margin-bottom: 25px;
}
</style>
<script>
export default {
  data() {
    return {
      orderDetailRawData: [],
      orderDetailData: [],
      searchVal: "",
      showLoading: true
    };
  },
  mounted() {
    this.request(this.api.getbill).then(res => {
      this.showLoading = false;
      console.log(`订单详情:${JSON.stringify(res)}`);
      if (res && res.code != "0") {
        this.getDataFaild(res.msg);
        return false;
      }
      res.data && res.data.list && (this.orderDetailData = res.data.list);
      this.orderDetailRawData = this.orderDetailData.slice(0);
    });
  },
  methods: {
    searchCoin() {
      if (this.searchVal == "") {
        this.orderDetailData = this.orderDetailRawData;
        return false;
      }
      let result = [];
      this.orderDetailRawData.map(item => {
        if (
          item.coin &&
          item.coin.toLowerCase().indexOf(this.searchVal.toLowerCase()) != -1
        ) {
          result.push(item);
        }
      });
      this.orderDetailData = result;
    }
  }
};
</script>
