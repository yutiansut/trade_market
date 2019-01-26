<template>
  <div class="app-main wh-full">
    <!-- header -->
    <my-header />
    <div class="app-body overflow-y h-full">
      <div class="property-info van-hairline--bottom">
        <div class="font-20 font-bold flex flex-v-center">
          <img
            v-if="propertyInfo.logo"
            class="thumb-35 coin-logo"
            :src="propertyInfo.logo"
            alt=""
          >
          <span v-text="routeParamId"></span>
        </div>
        <van-row class="info-top">
          <van-col span="8">
            <div>可用</div>
            <div v-text="(propertyInfo.usable||0)*1"></div>
          </van-col>
          <van-col span="8">
            <div>锁定</div>
            <div v-text="(propertyInfo.disable||0)*1"></div>
          </van-col>
          <van-col
            class="txt-rt"
            span="8"
          >
            <div>折合（CNY）</div>
            <div v-text="(propertyInfo.total||0)*1"></div>
          </van-col>
        </van-row>
        <div class="property-val flex font-14 flex-between van-hairline--top">
          <span class="label">估值(USDT)</span>
          <span v-text="propertyInfo.usdt*1"></span>
        </div>
      </div>
      <div class="property-record">
        <div class="flex flex-between flex-v-center">
          <span class="font-16 font-bold">最近记录</span>
          <router-link
            class="more flex flex-v-center riple font-14"
            to="/property/record"
          >
            <img
              class="thumb-20"
              :src="assetConfig.imgs.user_icon_1_whole"
              alt
            >&nbsp;
            <span class="color-666">全部</span>
          </router-link>
        </div>
        <div class="record-list">
          <template v-for="(item,i) in recordList">
            <record-list
              v-if="recordList.length>0"
              :itemData="item"
              :logo='propertyInfo.logo'
              :key="i"
            />
          </template>
          <div
            class="font-14 color-666 txt-center"
            v-if="recordList.length==0"
          >暂无数据</div>
        </div>
      </div>
    </div>
    <div class="btn-box flex flex-between">
      <button
        @click="navigateTo('/property/recharge',{coin:propertyInfo.name})"
        class="btn-large riple btn-default btn-block"
      >
        <img
          class="icon"
          :src="assetConfig.imgs.user_assets_1"
        >
        <span>充值</span>
      </button>
      <button
        @click="navigateTo('/property/withdraw',{coin:propertyInfo.name})"
        class="btn-large riple btn-primary btn-block"
      >
        <img
          class="icon"
          :src="assetConfig.imgs.user_assets_2"
        >
        <span>提现</span>
      </button>
    </div>
  </div>
</template>
<script>
import recordList from "@/components/other/RecordList";
import { myProperty, getCoinRecharge } from "@/vuexStore/storeService.js";
export default {
  components: {
    recordList
  },
  data() {
    return {
      routeParamId: "",
      propertyInfo: {},
      recordList: []
    };
  },
  mounted() {
    myProperty();
    this.routeParamId = this.$route.params.id;
    getCoinRecharge(this.routeParamId).then(res => {
      res.info[0] && (this.propertyInfo = res.info[0]);
      this.recordList = res.record;
    });
  }
};
</script>
<style lang="scss" scoped>
$main-color: #ccc;
.property-info,
.property-record {
  padding: 1rem 1rem 1.25rem 1rem;
  background: #fff;
}
.coin-logo {
  margin-right: 1rem;
}
.property-info {
  overflow: hidden;
  .info-top {
    overflow: hidden;
    padding-bottom: 1.25rem;
  }
  .van-col {
    margin-top: 2rem;
    div {
      font-size: 14px;
      &:first-child {
        color: $main-color;
        margin-bottom: 0.85rem;
      }
      &:last-child {
        font-weight: 600;
      }
    }
  }
  .property-val {
    line-height: 40px;
    .label {
      flex: 1;
      color: $main-color;
    }
  }
}
.property-record {
  .more {
    padding: 0.25rem 0 0.25rem 0;
  }
}
.record-list {
  margin-top: 1rem;
}
.btn-box {
  box-shadow: 1px 1px 8px 5px #eee;
  padding: 1rem;
  background: #fff;
  button:first-child {
    margin-right: 1rem;
  }
  .icon {
    position: relative;
    top: 4px;
    right: 0.8rem;
    width: 1.5rem;
  }
}
</style>