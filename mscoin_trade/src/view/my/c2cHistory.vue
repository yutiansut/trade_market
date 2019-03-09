<template>
  <div class="content">
    <div
      class="title font-16 font-bold"
      v-text="$t('ctcRecord')||'CTC记录'"
    ></div>
    <div class="table-wrap">
      <el-table
        v-loading='showLoading'
        :header-cell-style="{'background-color':'#fcfcfc','font-weight':'bold'}"
        :data='orderDetailData'
      >
        <el-table-column
          sortable
          width='100'
          prop='tradmember'
          :label='$t("seller")'
        ></el-table-column>
        <el-table-column
          sortable
          width='100'
          prop='member'
          :label='$t("buyer")'
        ></el-table-column>
        <el-table-column
          sortable
          width='80'
          :label='$t("type")||"类型"'
        >
          <span
            slot-scope="scope"
            v-text="scope.row.type=='买入'?$t('buy'):$t('sell')"
          ></span>
        </el-table-column>
        <el-table-column
          sortable
          prop='coinid'
          width='80'
          :label='$t("currencyType")||"币种"'
        ></el-table-column>
        <el-table-column
          width='100'
          sortable
          :label='$t("amount")||"数量"'
        >
          <template slot-scope="scope">
            {{scope.row.number |toFix(3)}}
          </template>
        </el-table-column>
        <el-table-column
          width='150'
          sortable
          :label='($t("price")||"价格")+"（CNY）"'
        >
          <template slot-scope="scope">
            {{scope.row.price|toFix(3)}}
          </template>
        </el-table-column>
        <el-table-column
          width='150'
          sortable
          :label='($t("money")||"金额")+"（CNY）"'
        >
          <template slot-scope="scope">
            {{scope.row.zj|toFix(3)}}
          </template>
        </el-table-column>
        <el-table-column
          prop='wdate'
          sortable
          :label='$t("createdTime")||"建立时间"'
        ></el-table-column>
        <el-table-column
          prop='sdate'
          sortable
          :label='$t("lastPayTime")||"最后打款时间"'
        ></el-table-column>

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
      this.request(this.api.getc2chistory).then(res => {
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
