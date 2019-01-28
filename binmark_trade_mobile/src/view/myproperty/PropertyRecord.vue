<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body overflow-y h-full">
      <van-tabs v-model="active">
        <van-tab title="充值">
          <div class="record-list">
            <template v-for="(item,i) in rechargeList">
              <record-list
                :type="active"
                :itemData="item"
                :key="i"
              />
            </template>
            <template v-if="rechargeList.length==0">
              <div class="font-14 color-999 txt-center">暂无记录</div>
            </template>
          </div>
        </van-tab>
        <van-tab title="提现">
          <div class="record-list">
            <template v-for="(item,i) in withDrawList">
              <record-list
                :type="active"
                :itemData="item"
                :key="i"
              />
            </template>
            <template v-if="withDrawList.length==0">
              <div class="font-14 color-999 txt-center">暂无记录</div>
            </template>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import recordList from "@/components/other/RecordList";
import { getmyput, getmyrecharge } from "@/vuexStore/storeService.js";
export default {
  components: {
    recordList
  },
  data() {
    return {
      active: 0,
      rechargeList: [],
      withDrawList: []
    };
  },
  async mounted() {
    this.rechargeList = await getmyput();
    this.withDrawList = await getmyrecharge();
  }
};
</script>
<style lang="scss" scoped>
.record-list {
  padding: 1rem;
  background: #fff;
}
</style>