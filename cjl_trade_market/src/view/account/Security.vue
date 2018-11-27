<template>
    <div class="content">
        <div class="title font-16 font-bold" v-text="$t('accountSecurity')||'账户安全'"></div>
        <!-- 认证 -->
        <div class="table-wrap bd-bottom">
            <div class="header" v-text="$t('security')||'安全认证'"></div>
            <ul class="safe-auth">
              <li v-for="(item,key) in authConfig" :key='key'>
                <span>
                  <i class="el-icon-warning color-danger"></i>
                  <em>&nbsp;&nbsp;&nbsp;{{$t(item.i18nLabelKey)||item.label}}</em>
                </span>
                <span
                  v-text="$t(item.i18nDespKey)||item.description"
                  class="txt-center color-999">
                </span>
                <span v-if='!item.isBind' class="txt-rt">
                  <a @click="bindHandle(key)"
                    class="color-danger"
                    href="javascript:"
                    v-text="$t(item.i18nStatelabelKey)||item.stateLabel">
                  </a>
                </span>
                <span v-else v-text="item.val"></span>
              </li>
            </ul>
        </div>
        <!-- 安全日志 -->
        <div class="table-wrap bd-bottom-none mt-20">
            <div class="header" v-text="$t('safeLogs')||'安全日志'"></div>
            <el-table :data='authLogs'>
              <el-table-column :label='$t("orderNum")||"序号"' width='250' type='index'></el-table-column>
              <el-table-column :label='$t("time")||"时间"' prop='date'></el-table-column>
              <el-table-column :label='$t("operation")||"操作"' prop='operate'></el-table-column>
              <el-table-column :label='$t("status")||"状态"' width='100'>
                <div slot-scope="scope" v-text="scope.row.state"></div>
              </el-table-column>
            </el-table>
        </div>
        <!-- 登录日志 -->
        <div class="table-wrap bd-bottom-none mt-20">
            <div class="header" v-text="$t('loginLogs')"></div>
            <el-table :data='loginLogs'>
              <el-table-column :label='$t("orderNum")||"序号"' width='250' type='index'></el-table-column>
              <el-table-column :label='$t("time")||"时间"' prop='date'></el-table-column>
              <el-table-column label='IP' prop='ip'></el-table-column>
              <el-table-column :label='$t("status")||"状态"'>
                <div slot-scope="scope" v-text="scope.row.state"></div>
              </el-table-column>
              <el-table-column width='100' :label='$t("type")||"类型"' prop='type'></el-table-column>
            </el-table>
        </div>
        <!-- 绑定登录密码 -->
        <bind-password 
          :show='dialogId=="loginPassword"?true:false'
          title='绑定登录密码'
          @closeModal='onClose'>
        </bind-password>
        <!-- 绑定资金密码 -->
        <bind-password 
          :show='dialogId=="financialPassword"?true:false'
          title='绑定资金密码'
          passwordLabel='资金密码'
          @closeModal='onClose'>
        </bind-password>
        <!-- 绑定邮箱 -->
        <bind-email 
          :show='dialogId=="email"?true:false'
          @closeModal='onClose'>
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
      authConfig: {
        loginPassword: {
          i18nLabelKey: "loginPwd",
          i18nDespKey: "loginPwdDesp",
          i18nStatelabelKey: "bind",
          label: "登录密码",
          description: "用于登录时的密码",
          stateLabel: "绑定",
          isBind: false,
          val: ""
        },
        financialPassword: {
          i18nLabelKey: "fundPwd",
          i18nDespKey: "fundPwdDesp",
          i18nStatelabelKey: "bind",
          label: "资金密码",
          description: "交易时密码，请谨慎保管",
          stateLabel: "绑定",
          isBind: false,
          val: ""
        },
        mobileAccount: {
          i18nLabelKey: "mobileAccount",
          i18nDespKey: "mobileAccountDesp",
          i18nStatelabelKey: "bind",
          label: "手机账户",
          description: "登录时唯一账号",
          stateLabel: "绑定",
          isBind: false,
          val: ""
        },
        email: {
          i18nLabelKey: "email",
          i18nDespKey: "emailDesp",
          i18nStatelabelKey: "bind",
          label: "电子邮箱",
          description: "安全通知、登录、安全设置时输入",
          stateLabel: "绑定",
          isBind: false,
          val: ""
        },
        bankAccount: {
          i18nLabelKey: "bankAccount",
          i18nDespKey: "bankAccountDesp",
          i18nStatelabelKey: "bind",
          label: "银行账户",
          description: "用户交易买入、卖出",
          stateLabel: "绑定",
          isBind: false,
          val: ""
        },
        googleAccount: {
          i18nLabelKey: "googleAuth",
          i18nDespKey: "googleAuthDesp",
          i18nStatelabelKey: "bind",
          label: "谷歌验证",
          description: "交易、充值、提现时用谷歌验证",
          stateLabel: "绑定",
          isBind: false,
          val: ""
        }
      },
      authLogs: [
        {
          date: "2017-8-8",
          operate: "登录密码",
          state: "成功"
        }
      ],
      loginLogs: [
        {
          date: "2017-8-8",
          ip: "127.1.0.1",
          state: "成功",
          type: "网页登录"
        }
      ]
    };
  },
  methods: {
    bindHandle(k, index) {
      this.dialogId = k;
    },
    onClose() {
      this.dialogId = null;
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

