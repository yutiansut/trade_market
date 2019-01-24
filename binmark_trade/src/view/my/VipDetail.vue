<template>
  <div class="content">
    <div
      class="title font-16 font-bold"
      v-text="$t('label181')"
    ></div>
    <div class="table-wrap">
      <div class="filter-bar flex flex-v-center">
        {{$t('label182')}}：<span class="color-danger font-bold">{{myVipInfo.discount*100+'%'}}</span>&nbsp;&nbsp;
        {{$t('label183')}}：<span class="color-danger font-bold">{{myVipInfo.upgrade*1}}</span>&nbsp;&nbsp;
        {{$t('label184')}}&nbsp;{{nextLevel}}&nbsp;{{$t('label185')}}：<span class="color-dander">{{upgradeAmount}}</span>
      </div>
      <el-table
        v-loading='showLoading'
        max-height='500'
        :data='orderDetailData'
      >
        <el-table-column
          :label='$t("label178")'
          prop='name'
        ></el-table-column>
        <el-table-column
          align='center'
          :label='$t("label182")'
        >
          <span slot-scope="data">
            {{data.row.discount*100+"%"}}
          </span>
        </el-table-column>
        <el-table-column
          align='right'
          :label='$t("label183")'
        ><span slot-scope="scope">
            {{scope.row.upgrade}}&nbsp;CNY</span>
        </el-table-column>
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
      orderDetailData: [],
      myVipInfo: {},
      showLoading: false
    };
  },
  computed: {
    nextLevel() {
      if (this.orderDetailData.length > 0) {
        let len = this.orderDetailData.length - 1;
        let last = this.orderDetailData[len].level;
        if (this.myVipInfo.level < last) {
          return `vip${this.myVipInfo.level * 1 + 1}`;
        }
      }
    },
    upgradeAmount() {
      if (this.orderDetailData.length > 0) {
        let len = this.orderDetailData.length - 1;
        let lastLevel = this.orderDetailData[len].level;
        if (this.myVipInfo.level < lastLevel) {
          let next = this.orderDetailData[this.myVipInfo.level * 1 + 1].upgrade;
          return `${next * 1 - this.myVipInfo.upgrade * 1} CNY`;
        }
      }
    }
  },
  mounted() {
    this.request(this.api.vipinfo).then(res => {
      try {
        this.orderDetailData = res.data.list;
        this.myVipInfo = res.data.info[0];
      } catch (err) {}
    });
  },
  methods: {
    searchCoin() {
      if (this.searchVal == "") {
        this.orderDetailData = this.orderDetailRawData;
        return false;
      }
      let result = [];
      this.orderDetailRawData.map(item => {
        if (
          item.coin &&
          item.coin.toLowerCase().indexOf(this.searchVal.toLowerCase()) != -1
        ) {
          result.push(item);
        }
      });
      this.orderDetailData = result;
    }
  }
};
</script>