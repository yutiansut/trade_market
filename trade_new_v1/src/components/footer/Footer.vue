<template>
  <div class="footer">
    <div class="footer-content content-width">
      <el-row>
        <el-col
          class="span-lf"
          span="9"
        >
          <img
            class="logo"
            src=""
          >
          <p class="color-999 font-16">新数字资产</p>
          <div class="label">
            在Exchange上没有找到您想要的数字资产？可通过推
            荐或填写我们的上币申请表进行反馈
          </div>
          <button class="btn-large btn-primary">推荐或注册新数字资产</button>
          <p class="copy-right color-999">@2018 版权所有</p>
        </el-col>
        <el-col
          class="flex flex-between"
          span="15"
        >
          <dl class="footer-links">
            <dt class="color-primary font-16">EXCHANGE</dt>
            <dd>
              <router-link to=''>安全策略</router-link>
            </dd>
            <dd>
              <router-link to=''>用户协议</router-link>
            </dd>
            <dd>
              <router-link to=''>隐私政策</router-link>
            </dd>
            <dd>
              <router-link to=''>免责声明</router-link>
            </dd>
            <dd>
              <router-link to=''>风险提示</router-link>
            </dd>
            <dd>
              <router-link to=''>费率标准</router-link>
            </dd>
          </dl>
          <dl class="footer-links">
            <dt class="color-primary font-16">支持</dt>
            <dd>
              <router-link to=''>公告中心</router-link>
            </dd>
            <dd>
              <router-link to=''>客户服务</router-link>
            </dd>
            <dd>
              <router-link to=''>专业知识</router-link>
            </dd>
            <dd>
              <router-link to=''>帮助中心</router-link>
            </dd>
          </dl>
          <dl class="footer-links">
            <dt class="color-success font-16">移动应用</dt>
            <dd>
              <router-link to=''>客户端下载</router-link>
            </dd>
            <dd class="color-primary font-16">社交</dd>
            <dd>
              <router-link
                class="flex flex-v-center"
                to=''
              >
                <img
                  class="thumb-20"
                  :src="assetCfg.imgs.icon_facebook"
                  alt=""
                >
                <span>Facebook</span>
              </router-link>
            </dd>
            <dd>
              <router-link
                class="flex flex-v-center"
                to=''
              >
                <img
                  class="thumb-20"
                  :src="assetCfg.imgs.icon_twitter"
                  alt=""
                >
                <span>Twitter</span>
              </router-link>
            </dd>
            <dd>
              <router-link
                class="flex flex-v-center"
                to=''
              >
                <img
                  class="thumb-20"
                  :src="assetCfg.imgs.icon_email"
                  alt=""
                >
                <span>Email</span>
              </router-link>
            </dd>
            <dd>
              <router-link
                class="flex flex-v-center"
                to=''
              >
                <img
                  class="thumb-20"
                  :src="assetCfg.imgs.icon_telegram"
                  alt=""
                >
                <span>Telegram</span>
              </router-link>
            </dd>
          </dl>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-footer"
};
</script>
<style lang="scss" scoped>
.footer {
  padding: 50px 0 70px 0;
  background: #fff;
  .footer-content {
    margin: 0 auto;
  }
  .span-lf {
    padding-right: 120px;
  }
  .logo {
    display: inline-block;
    width: 120px;
    margin-bottom: 40px;
  }
  .label {
    line-height: 1.8;
    margin-top: 20px;
  }
  button {
    margin-top: 30px;
  }
  .copy-right {
    margin-top: 50px;
  }
  .footer-links {
    dt {
      margin-bottom: 30px;
      @include textVcenter(30px);
    }
    dd {
      margin-top: 22px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  img[class^="thumb"] {
    margin-right: 8px;
  }
}
</style>