<template>
    <div class="content">
      <div class="title font-16 font-bold" v-text="$t('myList')||'我的挂单'"></div>
      <div class="table-wrap">
        <el-table
          :header-cell-style="{'background-color':'#fcfcfc','font-weight':'bold'}"
          :data='myEnstrumentData'>
          <el-table-column prop='date' :label='$t("date")||"下单日期"'></el-table-column>
          <el-table-column :label='$t("type")||"类型"'>
            <span slot-scope="scope" v-text="scope.row.type=='买入'?$t('buy'):$t('sell')"></span>
          </el-table-column>
          <el-table-column prop='tradePair' :label='$t("tradePair")||"交易对"'></el-table-column>
          <el-table-column prop='price' :label='$t("tradePrice")||"交易价"'></el-table-column>
          <el-table-column prop='volumn' :label='$t("marketVol")+"("+$t("locked")+")"||"挂单量（锁定）"'></el-table-column>
          <el-table-column width='150' prop='total' :label='$t("total")||"总计"'></el-table-column>
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
      myEnstrumentData: null
    };
  },
  mounted() {
    this.request(this.api.getmyentru).then(res => {
      console.log(`我的委托:${JSON.stringify(res)}`);
      if (res && res.code != "0") return this.getDataFaild(res.msg);
      res.data && res.data.list && (this.myEnstrumentData = res.data.list);
    });
  }
};
</script>