<template>
    <div class="content">
      <div class="title font-16 font-bold" v-text="$t('transRecord')||'交易记录'"></div>      
      <div class="table-wrap">
        <el-table
          max-height='500'
          :header-cell-style="{'background-color':'#fcfcfc','font-weight':'bold'}"
          :data='orderRecordData'>
          <el-table-column prop='writedate' :label='$t("date")||"日期"'></el-table-column>
          <el-table-column :label='$t("type")||"交易类型"'>
            <template slot-scope="scope">
              {{scope.row.type=='0'?$t('buy'):$t('sell')}}
            </template>
          </el-table-column>
          <el-table-column :label='$t("tradePair")||"交易对"'>
            <template slot-scope="scope">
              {{scope.row.tradcoin+'/'+scope.row.maincoin}}
            </template>
          </el-table-column>
          <el-table-column prop='price' :label='$t("finalPrice")||"成交价"'></el-table-column>
          <el-table-column prop='number' :label='$t("volumn"||"成交量")'></el-table-column>
          <el-table-column :label='$t("total")||"总计"'>
            <template slot-scope="scope">
              {{scope.row.price*scope.row.number}}
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
}
.title {
  margin-bottom: 25px;
}
</style>
<script>
export default {
  data() {
    return {
      orderRecordData: null
    };
  },
  mounted() {
    this.request(this.api.getmyrecord).then(res => {
      console.log(`成交记录:${JSON.stringify(res)}`);
      if (res && res.code != "0") return this.getDataFaild(res.msg);
      res.data && res.data.list && (this.orderRecordData = res.data.list);
    });
  }
};
</script>
