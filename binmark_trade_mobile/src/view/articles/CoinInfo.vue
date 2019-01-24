<template>
  <div class="list-container van-hairline--top">
    <div
      v-for="(item,i) in Store.state.coinInfo"
      :key='i'
      class="list-item van-hairline--bottom"
    >
      <router-link :to='"/articles/coin_detail/"+i'>
        <van-row class="title flex">
          <van-col
            class="font-bold font-15 flex flex-v-center"
            span='20'
          >
            <img
              class="coin-logo thumb-30"
              :src="item.logo"
            >{{item.name}}
          </van-col>
          <van-col
            class="icon color-999 flex flex-v-center"
            span='4'
          >
            <van-icon
              size='1.4rem'
              name='arrow'
            />
          </van-col>
        </van-row>
        <div class="intro font-14 color-666">{{item.info}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { getCoinProfile } from "@/vuexStore/storeService.js";
export default {
  mounted() {
    getCoinProfile();
  }
};
</script>
<style lang="scss" scoped>
.list-container {
  padding-left: 1rem;
  .list-item {
    padding: 1.6rem 1rem 1.6rem 0;
    line-height: 1.5;
  }
  .icon {
    justify-content: flex-end;
  }
  .intro {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .coin-logo {
    margin-right: 1rem;
  }
  .title {
    padding-bottom: 1rem;
  }
}
</style>