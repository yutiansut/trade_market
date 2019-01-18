<template>
  <div class="content">
    <div class="table-panel">
      <div
        class="panel-head font-16"
        v-text="$t('latest')||'最新'"
      ></div>
      <el-table
        :data='latestRecord'
        :header-cell-style='changeStyle'
        :fit='true'
      >
        <el-table-column :label="$t('time')||'时间'"></el-table-column>
        <el-table-column :label="$t('currencyType')||'币种'"></el-table-column>
        <el-table-column :label="$t('type')||'类型'"></el-table-column>
        <el-table-column :label="$t('amount')||'数量'"></el-table-column>
        <el-table-column :label="$t('status')||'状态'"></el-table-column>
        <el-table-column
          width='120'
          :label="$t('operation')||'操作'"
        >
          <span slot-scope="scope"></span>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-panel">
      <div class="panel-head font-16">
        <a
          @click="onTabClick(0,'getmyrecharge')"
          href="javascript:"
          :class="currentIndex==0?'active':''"
          v-text="$t('rechargeRecord')||'充币记录'"
        >
        </a>
        <a
          @click="onTabClick(1,'getmyput')"
          href="javascript:"
          :class="currentIndex==1?'active':''"
          v-text="$t('withdrawRecord')||'提币记录'"
        >
        </a>
      </div>
      <el-table
        v-loading='showLoading'
        :data='myRecord'
        :header-cell-style='changeStyle'
        :fit='true'
      >
        <el-table-column
          prop='wdate'
          :label="$t('time')||'时间'"
        ></el-table-column>
        <el-table-column
          align='center'
          prop='coin'
          :label="$t('currencyType')||'币种'"
        ></el-table-column>
        <el-table-column
          align='center'
          prop='number'
          :label="$t('amount')||'数量'"
        ></el-table-column>
        <el-table-column
          align='right'
          :label="$t('status')||'状态'"
        >
          <span
            slot-scope='scope'
            v-text="$t('completed')"
          ></span>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      latestRecord: null,
      myRecord: null,
      showLoading: false
    };
  },
  mounted() {
    this.routeModel.assetsRoutes = {
      i18nKey: "financialRecord",
      title: this.$route.meta.title || "",
      path: this.$route.path
    };
    //获取充币记录
    this.getRecord(this.api.getmyrecharge);
  },
  beforeRouteLeave(to, from, next) {
    this.routeModel.assetsRoutes = null;
    next();
  },
  methods: {
    changeStyle({ columnIndex }) {
      if (columnIndex == 5) return "text-align:right;";
    },
    onTabClick(i, apiUrl) {
      this.currentIndex = i;
      this.getRecord(this.api[apiUrl]);
    },
    getRecord(api, param) {
      this.showLoading = true;
      this.request(api, param || {}).then(res => {
        console.log(`记录:${JSON.stringify(res)}`);
        this.showLoading = false;
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        }
        res.data && res.data.list && (this.myRecord = res.data.list);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-panel {
  border: $default-border;
  border-bottom: none;
  margin-top: 20px;
  .panel-head {
    @include textVcenter;
    padding: 0 15px;
    border-bottom: $default-border;
    background-color: #fcfcfc;
    a {
      margin-left: 15px;
      &:first-child {
        margin-left: 0;
      }
      &.active {
        color: $color-danger;
      }
    }
  }
}
</style>
