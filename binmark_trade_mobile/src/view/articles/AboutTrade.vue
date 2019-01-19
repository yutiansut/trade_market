<template>
  <div class="questions">
    <van-tabs
      line-width="50"
      v-model="active"
    >
      <van-tab title="工单记录">
        <div class="list-container van-hairline--top">
          <div class="list-item van-hairline--bottom">
            <van-row>
              <van-col
                class="font-bold font-15"
                span='20'
              >TC交易会有风险吗？如何保证资金的安全？可不可以详细的给我说明一下？</van-col>
              <van-col
                class="type color-999 font-14 flex flex-v-center"
                span='4'
              >交易</van-col>
            </van-row>
            <div class="reply font-14">
              <div class="reply-content">回复：您好，可能是您页面长时间没有刷新，您刷新一下就可 以了！</div>
              <span class="color-danger riple">查看图片&gt;</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="常见问题">
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
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style lang="scss">
.questions {
  .van-hairline--top-bottom::after {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.list-container {
  padding-left: 1rem;
  .list-item {
    padding: 1.6rem 1rem 1.6rem 0;
    line-height: 1.6;
  }
  .reply {
    margin-top: 1.25rem;
    padding: 1rem 1.25rem;
    background: #f6f6f6;
    > span {
      display: inline-block;
      margin-top: 0.25rem;
    }
  }
  .icon,
  .type {
    justify-content: flex-end;
  }
  .title {
    padding-bottom: 1rem;
  }
}
</style>
