<template>
    <div class="content">
      <div class="title font-16 font-bold" v-text="$t('otcRecord')||'OTC记录'"></div>
      <div class="table-wrap">
        <el-table
          v-loading='showLoading'
          :header-cell-style="{'background-color':'#fcfcfc','font-weight':'bold'}"
          :data='orderDetailData'>
          <el-table-column prop='wdate' :label='$t("time")||"时间"'></el-table-column>
          <el-table-column prop='coinid' :label='$t("currencyType")||"币种"'></el-table-column>
          <el-table-column :label='$t("type")||"交易类型"'>
            <span slot-scope="scope"
              v-text="scope.row.type=='0'?$t('buy'):$t('sell')">
            </span>
          </el-table-column>
          <el-table-column prop='number' :label='$t("amount")||"数量"'></el-table-column>
          <el-table-column prop='price' :label='($t("unitPrice")||"单价")+"（CNY）"'></el-table-column>
          <el-table-column prop='zj' :label='($t("totalPrice")||"总价")+"（CNY）"'></el-table-column>
          <el-table-column width='100' :label='$t("status")||"状态"'>
            <template slot-scope="scope">
              <span :class="'status-'+scope.row.state">{{statusMap['status_'+scope.row.state].label}}</span>
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
span {
  &.status-0 {
    color: $color-success;
  }
  &.status-1 {
    color: #999;
  }
}
</style>
<script>
export default {
  data() {
    return {
      orderDetailData: null,
      showLoading: false,
      statusMap: {
        status_0: {
          i18nKey: "",
          label: "进行中"
        },
        status_1: {
          i18nKey: "",
          label: "已完成"
        }
      }
    };
  },
  mounted() {
    this.showLoading = true;
    this.getOrderRecord();
  },
  methods: {
    getOrderRecord() {
      this.request(this.api.getotcorder).then(res => {
        if (res.code == "0") {
          console.log(`otc币种记录：${JSON.stringify(res)}`);
          this.orderDetailData = res.data.list;
        }
        this.showLoading = false;
      });
    }
  }
};
</script>
