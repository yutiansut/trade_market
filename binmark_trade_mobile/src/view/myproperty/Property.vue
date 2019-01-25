<template>
  <div class="content app-body overflow-y h-full">
    <!-- 侧栏滑块 -->
    <slide-pop @onClose="closeSlide" :showPop="showPop">
      <user-aside slot="content"></user-aside>
    </slide-pop>
    <app-header @onHeadClick="showSlide" :iconLeft="assetConfig.imgs.user_head_portrait">
      <div
        slot="title"
        class="header-title font-16 font-bold abs-vh-center"
        v-text="Store.state.headerTitle"
      ></div>
      <div
        @click="navigateTo('/property/record')"
        slot="right"
        class="font-14 riple hd-slot-right"
      >记录</div>
    </app-header>
    <div class="account">
      <div class="title font-16">我的账户</div>
      <div class="label font-14">总资产</div>
      <div class="account-balance font-20 font-bold">￥{{totalAmount}}&nbsp;</div>
    </div>
    <div class="account-list">
      <div
        v-for="(item,i) in Store.state.myProperty"
        :key="i"
        class="list-item van-hairline--bottom"
      >
        <router-link :to="'/property/property_detail/'+i">
          <div class="item-title flex flex-v-center flex-between">
            <div class="flex flex-v-center">
              <img :src="item.logo" class="coin-logo thumb-30">
              <span class="font-18 font-bold" v-text="item.name"></span>
            </div>
            <van-icon name="arrow"></van-icon>
          </div>
          <van-row>
            <van-col span="8">
              <div>可用</div>
              <div v-text="item.usable*1"></div>
            </van-col>
            <van-col span="8">
              <div>锁定</div>
              <div v-text="item.disable*1"></div>
            </van-col>
            <van-col span="8">
              <div>折合（CNY）</div>
              <div v-text="item.total*1"></div>
            </van-col>
          </van-row>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import appHeader from "@/components/header/AppHeader.vue";
import slidePop from "@/components/other/slidePop";
import userAside from "@/components/slideContent/UserAside";
import { asideMixin } from "@/mixin/mixin";
import { myProperty } from "@/vuexStore/storeService.js";
export default {
  components: { appHeader, slidePop, userAside },
  mixins: [asideMixin],
  data() {
    return {};
  },
  mounted() {
    myProperty();
  },
  computed: {
    totalAmount() {
      return this.Store.state.userInfo.amount || 0;
    }
  },
  methods: {
    showSlide() {
      this.showPop = true;
    },
    closeSlide() {
      this.showPop = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  background: #fff;
  box-sizing: border-box;
}
.header-title,
.hd-slot-right {
  color: #fff;
}
.hd-slot-right {
  height: 4.5rem;
  line-height: 4.5rem;
  padding: 0 1.25rem;
  margin-right: -1.25rem;
}
.coin-logo {
  margin-right: 1rem;
}
.account {
  border-radius: 3px;
  width: 93.3%;
  box-sizing: border-box;
  padding: 1rem;
  margin: 1.25rem auto 0 auto;
  background: linear-gradient(#444b58, #323742);
  > div {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title,
  .account-balance {
    color: #fff;
  }
  .label,
  .account-cny {
    color: #737a85;
  }
}
.account-list {
  width: 93.3%;
  margin: 0 auto;
  padding: 1rem;
  .list-item {
    padding: 1.25rem 0;
  }
  .item-title {
    margin-bottom: 2rem;
  }
  .van-col {
    div {
      font-size: 14px;
      &:first-child {
        color: #ccc;
        margin-bottom: 0.85rem;
      }
      &:last-child {
        font-weight: 600;
      }
    }
  }
}
</style>