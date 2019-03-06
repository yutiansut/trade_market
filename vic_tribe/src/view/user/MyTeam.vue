<template>
  <div class="wh-full container">
    <div
      :style="{backgroundImage:'url('+assetConfig.topBg+')'}"
      class="user"
    >
      <div class="header-title p-rel txt-center h-45 font-16">
        <van-icon
          class="p-abs abs-v-center"
          size='1.8rem'
          name="arrow-left"
          @click='goBack'
        />
        <span>{{$store.state.headerTitle}}</span>
      </div>
      <div class="user-info flex">
        <div class="avatar thumb-60 thumb-rounded">
          <img
            :src="assetConfig.portrait"
            alt=""
          >
        </div>
        <div class="info">
          <span class="font-14">昵称：{{$store.state.userInfo.customerName}}</span>
          <span class="font-12">ID：{{$store.state.userInfo.customerNumber}}</span>
          <span class="font-12">团队：{{$store.state.userInfo.teamNum}}</span>
        </div>
      </div>
    </div>
    <div class="table">
      <van-row class="thead font-15 h-50">
        <van-col span='5'>昵称</van-col>
        <van-col span='9'>电话号码</van-col>
        <van-col span='5'>团队</van-col>
        <van-col
          class="txt-rt"
          span='5'
        >注册时间</van-col>
      </van-row>
      <div
        v-if="friendList.length>0"
        class="tbody font-14"
      >
        <van-row
          v-for="(item,i) in friendList"
          :key='i'
        >
          <van-col
            class="color-666"
            span='5'
          >{{item.customerName}}</van-col>
          <van-col
            class="color-666"
            span='9'
          >{{item.customerPhone}}</van-col>
          <van-col
            class="color-666"
            span='5'
          >团队{{item.teamNum}}</van-col>
          <van-col
            class="color-666 txt-rt"
            span='5'
          >{{item.registerTime}}</van-col>
        </van-row>
      </div>
      <div
        v-else
        class="no-data"
      >暂无数据</div>
    </div>
  </div>
</template>
<script>
import {
  selectCustomer,
  selectFriends
} from "../../vuexStore/customerController.js";

export default {
  data() {
    const assetConfig = {
      topBg: require("@/assets/images/user/bj_wdqy.png"),
      portrait: require("@/assets/images/user/portrait.png")
    };
    return {
      assetConfig: assetConfig,
      friendList: [],
      pageNo: 0,
      pageSize: 10,
      pageCount: 0
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      selectCustomer();
      let friendsResult = await selectFriends(this.pageNo, this.pageSize);
      if (friendsResult) {
        this.pageNo = friendsResult.pageNo;
        this.pageCount = friendsResult.pageCount;
        this.friendList = friendsResult.list;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
.user {
  height: 28.86%;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
}
.header-title {
  line-height: 45px;
  .van-icon {
    left: 0;
    height: 100%;
    line-height: 45px;
    padding: 0 1rem;
  }
}
.user-info {
  margin-top: 10%;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 2rem;
  }
}
.avatar {
  margin-left: 2.5rem;
  img {
    width: 100%;
  }
}
.table {
  flex: 1;
  overflow: hidden;
  .van-row {
    border-bottom: 0.1rem solid #eee;
    padding: 0 0.5rem;
  }
  .van-col {
    padding: 0 0.5rem;
  }
  .thead,
  .tbody {
    background: #fff;
  }
  .tbody {
    max-height: calc(100% - 50px);
    overflow: auto;
    .van-row {
      @include textVcenter();
    }
  }
  .thead {
    line-height: 50px;
  }
}
</style>