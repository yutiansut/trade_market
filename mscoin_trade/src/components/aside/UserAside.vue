<template>
  <div class="user-aside-panel">
    <el-aside>
      <div class="user-info">
        <div
          class="info-title font-16"
          v-text="$t('label176')"
        ></div>
        <div
          v-loading='showLoading'
          class="info-content"
        >
          <dl>
            <dt class="font-16 color-danger font-bold">ID：{{userData.member}}</dt>
            <dd>
              <span class="font-bold">{{$t("label178")}}：{{userData.viplevel}}</span>&nbsp;&nbsp;
              <router-link
                class="vip-detail"
                to='/my/vip_detail'
              >{{$t('label186')}}</router-link>
            </dd>
            <dd class="font-bold color-danger">{{$t('label177')}}：￥{{userData.balance}}</dd>
            <dd>我的推荐码：{{userData.sharecode}}&nbsp;&nbsp;&nbsp;<em
                class="color-primary copy-btn"
                v-text="$t('copy')"
                v-clipboard:copy="userData.sharecode"
                v-clipboard:success='onSuccess'
              ></em></dd>
            <dd
              style="margin-top:5px;"
              class="flex"
            >
              <button class="btn-danger btn-mini">
                <router-link to='/property'>{{$t('recharge')}}</router-link>
              </button>
              <button
                style="margin-left:20px;"
                class="btn-success btn-mini"
              >
                <router-link to='/property'>{{$t('withdraw')}}</router-link>
              </button>
            </dd>
          </dl>
        </div>
        <el-menu
          @select="handleSelect"
          active-text-color='#ab1e24'
        >
          <el-submenu>
            <span slot="title">{{$t('label187')}}</span>
            <el-menu-item index='/my/order_detail'>{{$t('billDetail')}}</el-menu-item>
            <el-menu-item index='/my/entrustment'>{{$t('myEntrustment')}}</el-menu-item>
            <el-menu-item index='/my/deal_history'>{{$t('transRecord')}}</el-menu-item>
            <el-menu-item index='/my/otc_history'>{{$t('otcRecord')}}</el-menu-item>
            <el-menu-item index='/my/c2c_history'>{{$t('ctcRecord')}}</el-menu-item>
          </el-submenu>
          <el-menu-item index='/account/security'>{{$t('securityCenter')}}</el-menu-item>
          <el-menu-item index='/account/identify'>{{$t('identify')}}</el-menu-item>
          <el-menu-item index='/account/work_order'>{{$t('label111')}}</el-menu-item>
          <el-menu-item index='/my/commission'>{{$t('label194')}}</el-menu-item>
        </el-menu>
      </div>
    </el-aside>
  </div>
</template>
<script>
export default {
  name: "user-aside",
  data() {
    return {
      userData: "",
      showLoading: true
    };
  },
  mounted() {
    this.showLoading = true;
    this.$bus.on("userLoaded", data => {
      if (data) {
        this.userData = data;
      }
      this.showLoading = false;
    });
  },
  methods: {
    handleSelect(key) {
      this.navigateTo(key);
    },
    onSuccess() {
      this.successMsg("复制成功");
    }
  }
};
</script>
<style lang="scss" scoped>
.el-aside {
  border-right: none;
  padding: 0;
  height: 100%;
}
.user-info {
  border: $default-border;
  box-sizing: border-box;
  height: 100%;
  height: 100%;
}
.info-title {
  @include textVcenter(40px);
  background-color: #fcfcfc;
  padding: 0 15px;
}
.info-content {
  padding: 15px;
  border-top: $default-border;
  border-bottom: $default-border;
  dl {
    dd,
    dt {
      @include textVcenter(30px);
    }
  }
}
.copy-btn {
  cursor: pointer;
}
.vip-detail {
  color: blue;
}
</style>
