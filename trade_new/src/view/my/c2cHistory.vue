<template>
    <div class="content">
      <div class="title font-16 font-bold" v-text="$t('ctcRecord')||'CTC记录'"></div>
      <div class="table-wrap">
        <el-table
          v-loading='showLoading'
          :header-cell-style="{'background-color':'#fcfcfc','font-weight':'bold'}"
          :data='orderDetailData'>
          <el-table-column prop='orderId' :label='$t("orderId")||"单号"'></el-table-column>
          <el-table-column width='80' :label='$t("type")||"类型"'>
            <span slot-scope="scope" v-text="scope.row.type=='买入'?$t('buy'):$t('sell')"></span>
          </el-table-column>
          <el-table-column prop='currency' :label='$t("currencyType")||"币种"'></el-table-column>
          <el-table-column prop='num' width='100' :label='$t("amount")||"数量"'></el-table-column>
          <el-table-column prop='price' :label='($t("price")||"价格")+"（CNY）"'></el-table-column>
          <el-table-column prop='amount' :label='($t("money")||"金额")+"（CNY）"'></el-table-column>
          <el-table-column prop='createdTime' :label='$t("createdTime")||"建立时间"'></el-table-column>
          <el-table-column prop='paidDate' :label='$t("lastPayTime")||"最后打款时间"'></el-table-column>
          <el-table-column prop='confirmDate' :label='$t("lastConfirmTime")||"最后确认时间"'></el-table-column>
          <el-table-column width='100' :label='$t("operation")||"操作"'></el-table-column>
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
      orderDetailData: [],
      showLoading: true
    };
  },
  mounted() {
    this.getOrderRecord(this.api.getc2chistory);
  },
  methods: {
    getOrderRecord() {
      this.request(this.api.getc2corder).then(res => {
        this.showLoading = false;
        console.log(`c2c交易订单：${JSON.stringify(res)}`);
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        }
        this.orderDetailData = res.data.list;
      });
    }
  }
};
</script>
