<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <div class="portrait flex flex-between flex-v-center">
        <span class="font-16">头像</span>
        <div class="avatar flex flex-v-center">
          <img
            class="thumb-40"
            :src="portrait"
          >
          <van-icon
            size='18px'
            name='arrow'
          />
        </div>
      </div>
      <van-cell-group class="info">
        <van-cell
          is-link
          size='large'
          title="电话号码"
          value='13246789'
          value-class='color-666 font-14'
        ></van-cell>
        <van-cell
          is-link
          size='large'
          title="真实姓名"
          value='测试员'
          value-class='color-666 font-14'
        ></van-cell>
        <van-cell
          is-link
          size='large'
          value='未设置'
          value-class='color-666 font-14'
          title="身份证号"
        ></van-cell>
        <van-cell
          is-link
          size='large'
          value-class='color-666 font-14'
          value='晟昌科技'
          title="用户昵称"
        ></van-cell>
        <van-cell
          is-link
          size='large'
          value-class='color-666 font-14'
          value='1345498'
          title="支付宝号"
        ></van-cell>
        <van-cell
          is-link
          size='large'
          value-class='color-666 font-14'
          title="开户银行"
        ></van-cell>
        <van-cell
          is-link
          size='large'
          value-class='color-666 font-14'
          title="银行卡号"
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      portrait: require("../../assets/images/user/portrait.png")
    };
  }
};
</script>
<style lang="scss" scoped>
.portrait {
  padding: 1.25rem;
  margin-top: 1.25rem;
  background: #fff;
}
.avatar {
  margin-right: 0.25rem;
}
.info {
  margin-top: 1.25rem;
}
</style>