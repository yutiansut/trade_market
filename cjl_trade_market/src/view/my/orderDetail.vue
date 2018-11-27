<template>
    <div class="content">
      <div class="title font-16 font-bold" v-text="$t('billDetail')||'账单明细'"></div>
      <div class="table-wrap">
        <div class="filter-bar flex flex-v-center">
            <el-input v-model="seachVal" suffix-icon='el-icon-search' size='small'></el-input>
            <button class="btn-inline btn-small btn-danger btn-active m-left-10"
              v-text="$t('inquire')||'查询'">
            </button>
        </div>
        <el-table :data='orderDetailData'>
          <el-table-column :label='$t("orderNum")||"序号"' width='200' type='index'></el-table-column>
          <el-table-column :label='$t("time")||"时间"' prop='date'></el-table-column>
          <el-table-column :label='$t("type")||"类型"'>
            <span slot-scope="scope" v-text="scope.row.type=='买入'?$t('buy'):$t('sell')"></span>
          </el-table-column>
          <el-table-column :label='$t("currencyType")||"币种"' prop='currency'></el-table-column>
          <el-table-column :label='$t("amount")||"数量"' prop='num'></el-table-column>
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
      orderDetailData: [
        {
          date: "2018-8-8",
          type: "买入",
          currency: "BOE/BOE",
          price: "0.4849USDT",
          num: "2"
        }
      ],
      seachVal: ""
    };
  }
};
</script>
