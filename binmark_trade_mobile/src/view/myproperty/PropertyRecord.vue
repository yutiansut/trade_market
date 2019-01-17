<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body overflow-y h-full">
      <van-tabs>
        <van-tab title='充值'>
          <div class="record-list">
            <template v-for="(item,i) in rechargeList">
              <record-list
                :itemData='item'
                :key='i'
              />
            </template>
          </div>
        </van-tab>
        <van-tab title='提现'>
          <div class="record-list">
            <template v-for="(item,i) in withDrawList">
              <record-list
                :itemData='item'
                :key='i'
              />
            </template>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import recordList from "@/components/other/RecordList";
export default {
  components: {
    recordList
  },
  data() {
    return {
      rechargeList: [
        {
          coinid: "USDT",
          prise: "1.15651",
          address: "1ANJ79WBF6Ceuk6ffpd2L2L5or",
          status: "",
          writedate: "07-20 14:20"
        }
      ],
      withDrawList: [
        {
          coinid: "BTC",
          prise: "fafa",
          address: "jfieaiofieoauf",
          status: "",
          writedate: "07-20 14:20"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.record-list {
  padding: 1rem;
  background: #fff;
}
</style>