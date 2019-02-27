<template>
  <div class="app-body">
    <van-tabs
      v-model="type"
      color='#333'
    >
      <van-tab title="余额账单">
        <div class="table-body">
          <van-row
            v-for="(item,i) in balanceList"
            class="flex flex-v-center"
            :key='i'
          >
            <van-col span='12'>
              <div
                class="label font-14"
                v-text="item.profitRemark"
              ></div>
              <small class="color-666 font-14">{{item.createTime|formatDate('yyyy-M-d h:m:s')}}</small>
            </van-col>
            <van-col
              span='12'
              :class="item.profitStatus==1?'color-success':'color-danger'"
              class="font-18 txt-rt"
              v-text="item.profitStatus==1?'+'+item.profitNum:'-'+item.profitNum"
            ></van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="VIC账单">
        <div class="table-body">
          <van-row
            v-for="(item,i) in vicList"
            class="flex flex-v-center"
            :key='i'
          >
            <van-col span='12'>
              <div
                class="label font-14"
                v-text="item.profitRemark"
              ></div>
              <small class="color-666 font-14">{{item.createTime|formatDate('yyyy-M-d h:m:s')}}</small>
            </van-col>
            <van-col
              span='12'
              class="font-18 txt-rt"
              :class="item.profitStatus==1?'color-success':'color-danger'"
              v-text="item.profitStatus==1?'+'+item.profitNum:'-'+item.profitNum"
            ></van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="积分账单">
        <div class="table-body">
          <van-row
            v-for="(item,i) in vicList"
            class="flex flex-v-center"
            :key='i'
          >
            <van-col span='12'>
              <div
                class="label font-14"
                v-text="item.profitRemark"
              ></div>
              <small class="color-666 font-14">{{item.createTime|formatDate('yyyy-M-d h:m:s')}}</small>
            </van-col>
            <van-col
              span='12'
              class="font-18 txt-rt"
              :class="item.profitStatus==1?'color-success':'color-danger'"
              v-text="item.profitStatus==1?'+'+item.profitNum:'-'+item.profitNum"
            ></van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { selectCustomerProfit } from "../../vuexStore/tradeController.js";
export default {
  data() {
    return {
      type: 0,
      pageNo: 1,
      pageSize: 10,
      balanceList: [],
      vicList: [],
      creditList: []
    };
  },
  computed: {
    recordType() {
      return this.type + 1;
    }
  },
  mounted() {
    selectCustomerProfit(this.recordType, this.pageNo, this.pageSize).then(
      res => {
        this.balanceList = res.list;
      }
    );
  },
  watch: {
    type(newVal, oldVal) {
      selectCustomerProfit(this.recordType, this.pageNo, this.pageSize).then(
        res => {
          switch (this.recordType) {
            case 1:
              this.balanceList = res.list;
              break;
            case 2:
              this.vicList = res.list;
              break;
            case 3:
              this.creditList = res.list;
              break;
          }
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.table-body {
  margin-top: 0.9rem;
  background: #fff;
  .van-row {
    padding: 0.8rem 1.25rem;
    border-bottom: 0.075rem solid #eee;
  }
  .label {
    margin-bottom: 0.45rem;
  }
}
</style>