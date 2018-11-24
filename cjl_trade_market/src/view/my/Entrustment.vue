<template>
    <div class="content">
      <div class="title font-16 font-bold">我的挂单</div>
      <div class="table-wrap">
        <el-table
          :header-cell-style="{'background-color':'#fcfcfc','font-weight':'bold'}"
          :data='orderDetailData'>
          <el-table-column prop='date' label='下单日期'></el-table-column>
          <el-table-column prop='type' label='类型'></el-table-column>
          <el-table-column prop='tradePair' label='交易对'></el-table-column>
          <el-table-column prop='price' label='交易价'></el-table-column>
          <el-table-column prop='volumn' label='挂单量（锁定）'></el-table-column>
          <el-table-column prop='total' label='总计'></el-table-column>
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
          type: "买入",
          tradePair: "BOE/BOE",
          price: "0.4849USDT",
          volumn: "48489.448 BOE",
          total: "2"
        }
      ]
    };
  }
};
</script>
