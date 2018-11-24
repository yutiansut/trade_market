<template>
    <div class="content">
      <div class="title font-16 font-bold">成交记录</div>
      <div class="table-wrap">
        <el-table
          :header-cell-style="{'background-color':'#fcfcfc','font-weight':'bold'}"
          :data='orderDetailData'>
          <el-table-column prop='date' label='时间'></el-table-column>
          <el-table-column prop='currency' label='币种'></el-table-column>
          <el-table-column prop='type' label='交易类型'></el-table-column>
          <el-table-column prop='num' label='数量'></el-table-column>
          <el-table-column prop='unitPrice' label='单价（CNY）'></el-table-column>
          <el-table-column prop='totalPrice' label='总价（CNY）'></el-table-column>
          <el-table-column width='100' prop='state' label='状态'></el-table-column>
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
          currency: "USDt",
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
