<template>
  <div class="wh-full container">
    <div
      :style="{backgroundImage:'url('+topBg+')'}"
      class="user"
    >
      <div class="header-title p-rel txt-center h-45 font-16">
        <van-icon
          class="p-abs abs-v-center"
          size='1.8rem'
          name="arrow-left"
        />
        <span>{{$store.state.headerTitle}}</span>
      </div>
      <div class="user-info flex">
        <div class="avatar thumb-60 thumb-rounded">
          <img
            :src="portrait"
            alt=""
          >
        </div>
        <div class="info">
          <span class="font-14">昵称：我的昵称</span>
          <span class="font-12">ID：456456</span>
          <span class="font-12">团队：5</span>
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
      <div class="tbody font-14">
        <van-row>
          <van-col
            class="color-666"
            span='5'
          >科技</van-col>
          <van-col
            class="color-666"
            span='9'
          >13245678997</van-col>
          <van-col
            class="color-666"
            span='5'
          >团队5</van-col>
          <van-col
            class="color-666 txt-rt"
            span='5'
          >2018/8/8</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topBg: require("../../assets/images/user/bj_wdqy.png"),
      portrait: require("../../assets/images/user/portrait.png")
    };
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