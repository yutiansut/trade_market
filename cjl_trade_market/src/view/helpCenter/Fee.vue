<template>
    <div class="fee">
        <div class="title font-18 font-bit-bold" v-text="$t('rate')||'费率标准'"></div>
        <div class="table-wrap">
            <el-table :data='formData'>
                <el-table-column
                  :label="$t('currencyType')||'币种'"
                  width='180'>
                  <div slot-scope="scope" class="flex flex-v-center">
                    <img class="thumb-30" :src="scope.row.thumb" alt="">
                    <span v-text="scope.row.currency"></span>
                  </div>
                </el-table-column>
                <el-table-column prop='tradeCommission'
                  :label='$t("commision")+"(24"+$t("hour")+")"||"交易手续费(24H)"'>
                </el-table-column>
                <el-table-column prop='widthDrawCommission'
                  :label='$t("withdrawCommision")||"提币手续费"'>
                </el-table-column>
                <el-table-column prop='minumWithDraw'
                  :label='$t("withdrawMin") ||"提币单笔最低"'>
                </el-table-column>
                <el-table-column prop='maxumWidthDraw'
                  :label='$t("withdrawMax") ||"提币单笔最高"'>
                </el-table-column>
                <el-table-column prop='dailyMaxumWidthDraw'
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
      formData: [
        {
          thumb: "",
          currency: "BTC/CEC",
          tradeCommission: "0.5 BTC",
          widthDrawCommission: "0.005",
          minumWithDraw: "0.1",
          maxumWidthDraw: "2",
          dailyMaxumWidthDraw: "800.00~30000.00"
        }
      ]
    };
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
