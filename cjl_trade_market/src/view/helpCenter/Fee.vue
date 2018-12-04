<template>
    <div class="fee">
        <div class="title font-18 font-bit-bold" v-text="$t('rate')||'费率标准'"></div>
        <div class="table-wrap">
            <el-table :data='formData'>
                <el-table-column
                  :label="$t('currencyType')||'币种'"
                  width='180'>
                  <div slot-scope="scope" class="flex flex-v-center">
                    <img class="thumb-30" :src="scope.row.logo" alt="">
                    <span>{{scope.row.maincoinid}}/{{scope.row.coinid}}</span>
                  </div>
                </el-table-column>
                <el-table-column prop='tradgas'
                  :label='$t("commision")+"(24"+$t("hour")+")"||"交易手续费(24H)"'>
                </el-table-column>
                <el-table-column prop='outgas'
                  :label='$t("withdrawCommision")||"提币手续费"'>
                </el-table-column>
                <el-table-column prop='oneoutlow'
                  :label='$t("withdrawMin") ||"提币单笔最低"'>
                </el-table-column>
                <el-table-column prop='oneoutheight'
                  :label='$t("withdrawMax") ||"提币单笔最高"'>
                </el-table-column>
                <el-table-column prop='dayoutheight'
                  :label='$t("dayWidthDrawMax") ||"单日提币最高"'>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      formData: null
    };
  },
  mounted() {
    // 币种费率
    this.getFee();
  },
  methods: {
    getFee() {
      this.request(this.api.gaslist).then(res => {
        console.log(`费率：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.formData = res.data.list);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fee {
  width: 77%;
  margin: 0 auto;
  padding: 30px 0 40px 0;
}
.el-table {
  color: $main-font-color;
}
.table-wrap {
  border: $default-border;
  border-bottom: none;
  margin-top: 25px;
  img {
    display: inline-block;
    margin-right: 5px;
  }
}
</style>
