<template>
    <div class="content">
      <div class="title font-16 font-bold" v-text="$t('otcRecord')||'OTC记录'"></div>
      <div class="table-wrap">
        <el-table
          :header-cell-style="{'background-color':'#fcfcfc','font-weight':'bold'}"
          :data='orderDetailData'>
          <el-table-column prop='date' :label='$t("time")||"时间"'></el-table-column>
          <el-table-column prop='currency' :label='$t("currencyType")||"币种"'></el-table-column>
          <el-table-column :label='$t("type")||"交易类型"'>
            <span slot-scope="scope" v-text="scope.row.type=='买入'?$t('buy'):$t('sell')"></span>
          </el-table-column>
          <el-table-column prop='num' :label='$t("amount")||"数量"'></el-table-column>
          <el-table-column prop='unitPrice' :label='($t("unitPrice")||"单价")+"（CNY）"'></el-table-column>
          <el-table-column prop='totalPrice' :label='($t("totalPrice")||"总价")+"（CNY）"'></el-table-column>
          <el-table-column width='100' prop='state' :label='$t("status")||"状态"'></el-table-column>
        </el-table>
      </div>
    </div>
</template>
<style lang="scss" scoped>
.table-wrap {
  border: $default-border;
  border-bottom: none;
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
          currency: "USDT",
          type: "买入",
          num: "46516",
          unitPrice: "0.4849USDT",
          totalPrice: "48489.448 BOE",
          state: "2"
        }
      ]
    };
  }
};
</script>
