<template>
  <div class="content">
    <div
      class="title font-16 font-bold"
      v-text="$t('label194')"
    ></div>
    <div class="table-wrap">
      <el-table
        v-loading='showLoading'
        max-height='500'
        :data='commissionList'
      >
        <el-table-column
          :label='$t("currencyType")'
          prop='wdate'
          sortable
        ></el-table-column>
        <el-table-column
          :label='$t("currencyType")'
          prop='coin'
          sortable
        ></el-table-column>
        <el-table-column
          sortable
          :label="$t('amount')"
        >
          <template slot-scope="scope">{{scope.row.number*1}}</template>
        </el-table-column>
        <el-table-column
          :label='$t("label195")'
          prop='offer'
          sortable
        ></el-table-column>
        <el-table-column
          sortable
          :label="$t('label197')"
        >
          <template slot-scope="scope">{{scope.row.relation+$t('label196')}}</template>
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
      showLoading: false,
      commissionList: [
        {
          wdate: "2019-02-19",
          coin: "USTT",
          number: "0.0012",
          relation: "1",
          offer: "test002"
        },
        {
          wdate: "2019-02-18",
          coin: "ETH",
          number: "0.0011",
          relation: "13",
          offer: "test001"
        }
      ]
    };
  },
  mounted() {
    // this.request(this.api.proceeds).then(res => {
    //   this.showLoading = false;
    //   try {
    //     this.commissionList = res.data.list;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
  },
  methods: {}
};
</script>
