<template>
    <div class="content">
      <div class="title font-16 font-bold">账单明细</div>
      <div class="table-wrap">
        <div class="filter-bar flex flex-v-center">
            <el-input v-model="seachVal" suffix-icon='el-icon-search' size='small'></el-input>
            <button class="btn-inline btn-small btn-danger btn-active m-left-10">查询</button>
        </div>
        <el-table :data='orderDetailData'>
          <el-table-column width='200' type='index' label='序号'></el-table-column>
          <el-table-column prop='date' label='时间'></el-table-column>
          <el-table-column prop='type' label='类型'></el-table-column>
          <el-table-column prop='currency' label='币种'></el-table-column>
          <el-table-column prop='num' label='数量'></el-table-column>
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
