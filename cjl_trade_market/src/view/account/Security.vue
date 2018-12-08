<template>
    <div class="content">
        <div class="title font-16 font-bold" v-text="$t('accountSecurity')||'账户安全'"></div>
        <!-- 认证 -->
        <div class="table-wrap bd-bottom">
            <div class="header" v-text="$t('security')||'安全认证'"></div>
            <ul class="safe-auth">
              <!-- 修改密码 -->
              <li>
                <span>
                  <i class="el-icon-success color-success"></i>
                  <em>&nbsp;&nbsp;&nbsp;{{$t('loginPwd')||"登录密码"}}</em>
                </span>
                <span
                  v-text="$t('loginPwdDesp')||'用于登录时的密码'"
                  class="txt-center color-999">
                </span>
                <span class="txt-rt">
                  <a @click="bindHandle('loginPassword')"
                    class="color-danger"
                    href="javascript:"
                    v-text="$t('change')||'修改'">
                  </a>
                </span>
              </li>
              <!-- 绑定资金密码 -->
              <li>
                <span>
                  <i :class="bindState.tradstate !='0'?'el-icon-success color-success':'el-icon-warning color-danger'"></i>                  
                  <em>&nbsp;&nbsp;&nbsp;{{$t('fundPwd')||"资金密码"}}</em>
                </span>
                <span
                  v-text="$t('fundPwdDesp')||'交易时密码，请谨慎保管'"
                  class="txt-center color-999">
                </span>
                <span class="txt-rt">
                  <a
                    v-if="bindState.tradstate=='0'" 
                    @click="bindHandle('financialPassword')"
                    class="color-danger"
                    href="javascript:"
                    v-text="$t('bind')||'绑定'">
                  </a>
                  <em v-else class="color-999">已绑定</em>
                </span>
              </li>
              <!-- 手机账户 -->
              <li>
                <span>
                  <i class="el-icon-success color-success"></i>
                  <em>&nbsp;&nbsp;&nbsp;{{$t('mobileAccount')||"手机账户"}}</em>
                </span>
                <span
                  v-text="$t('mobileAccountDesp')||'登录时唯一账号'"
                  class="txt-center color-999">
                </span>
                <span class="txt-rt">
                  <a 
                    v-if="!bindState.tel"
                    class="color-danger"
                    href="javascript:"
                    v-text="$t('bind')||'绑定'">
                  </a>
                  <em v-else v-text="bindState.tel" class="color-999"></em>
                </span>
              </li>
              <!-- 邮箱 -->
              <li>
                <span>
                  <i :class="bindState.emailstate !='0'?'el-icon-success color-success':'el-icon-warning color-danger'"></i>
                  <em>&nbsp;&nbsp;&nbsp;{{$t('email')||"电子邮箱"}}</em>
                </span>
                <span
                  v-text="$t('emailDesp')||'安全通知、登录、安全设置时输入'"
                  class="txt-center color-999">
                </span>
                <span class="txt-rt">
                  <a v-if="bindState.emailstate=='0'"
                    @click="bindHandle('email')"
                    class="color-danger"
                    href="javascript:"
                    v-text="$t('bind')||'绑定'">
                  </a>
                  <em v-else v-text="bindState.email||'已绑定'" class="color-999"></em>
                </span>
              </li>
              <!-- 银行账户 -->
              <li>
                <span>
                  <i :class="bindState.bankstate !='0'?'el-icon-success color-success':'el-icon-warning color-danger'"></i>
                  <em>&nbsp;&nbsp;&nbsp;{{$t('bankAccount')||"银行账户"}}</em>
                </span>
                <span
                  v-text="$t('bankAccountDesp')||'用户交易买入、卖出'"
                  class="txt-center color-999">
                </span>
                <span class="txt-rt">
                  <a v-if="bindState.bankstate=='0'"
                    @click="bindHandle('bankAccount')"
                    class="color-danger"
                    href="javascript:"
                    v-text="$t('bind')||'绑定'">
                  </a>
                  <em v-else class="color-999" v-text="bindState.bank||'已绑定'"></em>
                </span>
              </li>
              <!-- google账户 -->
              <li>
                <span>
                  <i :class="bindState.googlestate !='0'?'el-icon-success color-success':'el-icon-warning color-danger'"></i>
                  <em>&nbsp;&nbsp;&nbsp;{{$t('googleAuth')||"谷歌验证"}}</em>
                </span>
                <span
                  v-text="$t('googleAuthDesp')||'用户交易买入、卖出'"
                  class="txt-center color-999">
                </span>
                <span class="txt-rt">
                  <a
                    v-if="bindState.googlestate =='0'"
                    @click="bindHandle('googleAccount')"
                    class="color-danger"
                    href="javascript:"
                    v-text="$t('bind')||'绑定'">
                  </a>
                  <em v-else class="color-999" v-text="bindState.val||'已绑定'"></em>
                </span>
              </li>
            </ul>
        </div>
        <!-- 安全日志 -->
        <div class="table-wrap bd-bottom-none mt-20">
            <div class="header" v-text="$t('safeLogs')||'安全日志'"></div>
            <el-table :data='authLogs'>
              <el-table-column :label='$t("orderNum")||"序号"' width='250' type='index'></el-table-column>
              <el-table-column :label='$t("time")||"时间"' prop='wdate'></el-table-column>
              <el-table-column :label='$t("operation")||"操作"' prop='updatelog'></el-table-column>
              <!-- <el-table-column :label='$t("status")||"状态"' width='100'>
                <div slot-scope="scope" v-text="scope.row.state"></div>
              </el-table-column> -->
            </el-table>
        </div>
        <!-- 登录日志 -->
        <div class="table-wrap bd-bottom-none mt-20">
            <div class="header" v-text="$t('loginLogs')"></div>
            <el-table :data='loginLogs'>
              <el-table-column :label='$t("orderNum")||"序号"' width='250' type='index'></el-table-column>
              <el-table-column :label='$t("time")||"时间"' prop='wdate'></el-table-column>
              <el-table-column label='IP' prop='ip'></el-table-column>
              <el-table-column :label='$t("status")||"状态"'>
                <div slot-scope="scope" v-text="scope.row.state"></div>
              </el-table-column>
              <el-table-column width='100' :label='$t("type")||"类型"'>
                <div slot-scope="scope" v-html="scope.row.type=='1'?'web&nbsp;登录':'Mobile&nbsp;登录'"></div>                
              </el-table-column>
            </el-table>
        </div>
        <!-- 绑定登录密码 -->
        <bind-password
          :show='dialogId=="loginPassword"?true:false'
          :title='$t("changePwd")||"修改登录密码"'
          @closeModal='onClose'>
        </bind-password>
        <!-- 绑定资金密码 -->
        <bind-password 
          :show='dialogId=="financialPassword"?true:false'
          :title='$t("bindFundPwd")||"绑定资金密码"'
          :passwordLabel='$t("fundPwd")||"资金密码"'
          @closeModal='onClose'>
        </bind-password>
        <!-- 绑定邮箱 -->
        <bind-email 
          :show='dialogId=="email"?true:false'
          @closeModal='onClose'
          @emailBind="emailBind">
        </bind-email>
        <!-- 绑定银行卡号 -->
        <bind-bank 
          :show='dialogId=="bankAccount"?true:false'
          @closeModal='onClose'>
        </bind-bank>
        <!-- 谷歌验证 -->
        <google-auth 
          :show='dialogId=="googleAccount"?true:false'
          @closeModal='onClose'>
        </google-auth>
    </div>
</template>
<script>
import bindPassword from "../../components/dialogContent/bindPassword";
import bindEmail from "../../components/dialogContent/bindEmail";
import bindBank from "../../components/dialogContent/bindBankCard";
import googleAuth from "../../components/dialogContent/googleAuth";
export default {
  components: {
    bindPassword,
    bindEmail,
    bindBank,
    googleAuth
  },
  data() {
    return {
      dialogId: null,
      bindState: {},
      authLogs: null,
      loginLogs: null
    };
  },
  mounted() {
    this.getState();
    this.getSafeLogs();
    this.getLoginLogs();
  },
  methods: {
    bindHandle(k, index) {
      let idState = this.bindState.idcardstate;
      if (k == "bankAccount") {
        if (idState == "0") {
          this.$confirm("您还没有实名认证，无法操作", "提示", {
            confirmButtonText: "去认证",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.navigateTo("Identify");
          });
          return;
        } else if (idState == "1") {
          this.$alert("实名认证审核中，无法操作", "提示", {
            confirmButtonText: "确定"
          });
          return;
        }
      }
      this.dialogId = k;
    },
    emailBind() {
      this.bindState.emailstate = true;
    },
    onClose() {
      this.dialogId = null;
    },
    getState() {
      this.request(this.api.saftyState).then(res => {
        console.log(`账号状态：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.bindState = res.data.list[0]);
      });
    },
    getSafeLogs() {
      this.request(this.api.logsafe).then(res => {
        console.log(`安全日志：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.authLogs = res.data.list);
      });
    },
    getLoginLogs() {
      this.request(this.api.loglogin).then(res => {
        console.log(`登录日志：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.loginLogs = res.data.list);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 25px;
}
.mt-20 {
  margin-top: 20px;
}

.table-wrap {
  border: $default-border;
  .header {
    @include textVcenter;
    background: #fcfcfc;
    padding: 0 15px;
    border-bottom: $default-border;
  }
  .safe-auth {
    padding: 0 15px;
    li {
      @include textVcenter;
      padding: 0 0.1%;
      border-top: $default-border;
      &:first-child {
        border-top: none;
      }
      span {
        height: inherit;
        float: left;
        display: block;
        width: 33.3%;
      }
    }
  }
}
.bd-bottom-none {
  border-bottom: none;
}
a,
i {
  &.danger {
    color: $color-danger;
  }
  &.success {
    color: $color-success;
  }
}
</style>

