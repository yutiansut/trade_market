<template>
  <div class="list-container van-hairline--top">
    <div class="list-item van-hairline--bottom">
      <router-link to=''>
        <van-row class="title flex">
          <van-col
            class="font-bold font-15"
            span='20'
          >如何修改/取消谷歌验证码？</van-col>
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
        <div class="font-14 color-666">打开安全设置--谷歌验证器绑定，点击“取消或重置谷歌验证 ”通过资金密码和绑定手机的短信验证码可以重置谷歌验证；如果原...</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.list-container {
  padding-left: 1rem;
  .list-item {
    padding: 1.6rem 1rem 1.6rem 0;
    line-height: 1.6;
  }
  .icon {
    justify-content: flex-end;
  }
  .title {
    padding-bottom: 1rem;
  }
}
</style>