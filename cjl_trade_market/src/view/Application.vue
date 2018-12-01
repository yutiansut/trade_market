<template>
    <div class="main">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <img class="banner" :src="banner" alt="">
        <div class="form-wrap p-rel">
            <div class="title font-bold">请填写以下项目资料（请务必提供最详细准确信息，获得审核批准后将有权利参与投票上币）</div>
            <div class="form">
                <el-form label-position='top' @submit.native.prevent>
                  <template v-for="(item,key) in formData">
                    <el-form-item
                      :label='$t(item.labeli18n)||item.label'
                      :key='key'>
                      <el-input name='mobile'
                        v-model="item.val"
                        :placeholder='$t(item.placeholderi18n)||item.placeholder'>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-form>
                <button
                  @click="onSubmit"
                  v-text="$t('submitApplication')||'提交上线申请'"
                  class="btn btn-large btn-block btn-active btn-danger">
                </button>
            </div>
        </div>
        <div class="requirement">
            <template v-for='(item,i) in rules'>
            <dl :key='i'>
                <dt v-text="item.title"></dt>
                <dd v-text="item.content"></dd>
            </dl>
            </template>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      banner: require("@/assets/images/shangbi/shangbi_banner.png"),
      formData: {
        email: {
          label: "手机号",
          labeli18n: "cellphone",
          placeholderi18n: "mobilePlaceholder",
          placeholder: "登录时手机号",
          name: "email",
          val: ""
        },
        contact: {
          labeli18n: "teamContact",
          placeholderi18n: "email",
          label: "团队联系方式",
          placeholder: "Email等",
          name: "contact",
          val: ""
        },
        currencyNameEn: {
          labeli18n: "coinInEnglish",
          placeholderi18n: "coinNamePlaceholderEn",
          label: "币种英文名称",
          placeholder: "比如Bitcoin",
          name: "currencyNameEn",
          val: ""
        },
        currencyNameCn: {
          labeli18n: "coinInChinese",
          placeholderi18n: "coinNamePlaceholderZh",
          label: "币种中文名称",
          placeholder: "比如比特币",
          name: "currencyNameCn",
          val: ""
        },
        currencySymbol: {
          labeli18n: "coinSymbol",
          placeholderi18n: "symbolPlacehoder",
          label: "币种交易符号",
          placeholder: "比如BTC",
          name: "currencySymbol",
          val: ""
        },
        icoDate: {
          labeli18n: "icoDate",
          label: "ICO日期",
          placeholder: "YYYY/MM/DD",
          name: "icoDate",
          val: ""
        },
        flowableDate: {
          labeli18n: "transferableDate",
          label: "可流通日期",
          placeholder: "YYYY/MM/DD",
          name: "flowableDate",
          val: ""
        },
        blockType: {
          labeli18n: "blockNetType",
          placeholderi18n: "netTypePlaceholder",
          label: "币种区块网络类型",
          placeholder: "ETH，QTUM，NEO，XML，BTS或者独立链",
          name: "blockType",
          val: ""
        },
        contractAddr: {
          labeli18n: "contractAddress",
          placeholderi18n: "optionalPlaceholder",
          label: "代币合约地址",
          placeholder: "如果没有填“无”",
          name: "contractAddr",
          val: ""
        },
        decimalNum: {
          placeholderi18n: "optionalPlaceholder",
          labeli18n: "decimalPlace",
          label: "小数点位数",
          placeholder: "如果没有填“无”",
          name: "decimalNum",
          val: ""
        },
        officalSite: {
          labeli18n: "officialSite",
          placeholderi18n: "sitePlaceholder",
          label: "币种官方网站",
          placeholder: "请输入币种官方网站",
          name: "officalSite",
          val: ""
        },
        whiteBook: {
          labeli18n: "whitePaperLink",
          label: "币种白皮书网址",
          placeholderi18n: "whitePaperPlaceholder",
          placeholder: "请输入币种白皮书网址",
          name: "whiteBook",
          val: ""
        },
        blockExplorer: {
          labeli18n: "blockChainExploer",
          placeholderi18n: "exploerPlaceholder",
          label: "区块浏览器",
          placeholder: "请输入区块浏览器地址",
          name: "blockExplorer",
          val: ""
        },
        logoLink: {
          labeli18n: "logoUrl",
          placeholderi18n: "logoPlaceholder",
          label: "Logo图片链接",
          placeholder: "请输入Logo图片链接",
          name: "logoLink",
          val: ""
        },
        twitterLink: {
          labeli18n: "twitterLink",
          label: "Twitter链接",
          placeholder: "请输入Twitter链接",
          name: "twitterLink",
          val: ""
        },
        telegramLink: {
          labeli18n: "telegramLink",
          label: "Telegram链接",
          placeholder: "请输入Telegram链接",
          name: "telegramLink",
          val: ""
        },
        currentIntroCn: {
          labeli18n: "chineseIntro",
          label: "币种简短中文介绍",
          placeholder: "请输入币种简短中文介绍",
          name: "currentIntroCn",
          val: ""
        },
        currencyIntroEn: {
          labeli18n: "englishIntro",
          label: "币种简短英文介绍",
          placeholder: "请输入币种简短英文介绍",
          name: "currencyIntroEn",
          val: ""
        },
        currencyVol: {
          labeli18n: "totalSupply",
          label: "币种总量",
          placeholder: "请输入币种总量",
          name: "currencyVol",
          val: ""
        },
        currencyFlowVol: {
          labeli18n: "circulatingSupply",
          label: "币种流通量",
          placeholder: "请输入币种流通量",
          name: "currencyFlowVol",
          val: ""
        },
        currencyShareRate: {
          labeli18n: "coinDistribution",
          placeholderi18n: "distributionPlaceholder",
          label: "币种分配比例",
          placeholder: "如ICO分发比例，团队预留等",
          name: "currencyShareRate",
          val: ""
        },
        costPrice: {
          labeli18n: "initialPrice",
          label: "成本价格",
          placeholder: "presale,private sale,public sale等",
          name: "costPrice",
          val: ""
        },
        onlinePlat: {
          labeli18n: "onLinePlateform",
          placeholderi18n: "optionalPlaceholder",
          label: "已上线交易平台",
          placeholder: "未上线写“无”",
          name: "onlinePlat",
          val: ""
        },
        otherInstruction: {
          labeli18n: "otherInfo",
          label: "其他信息说明",
          placeholder: "请输入其他信息说明",
          name: "otherInstruction",
          val: ""
        }
      },
      rules: [
        {
          title: "这里是标题",
          content: "这里是内容"
        },
        {
          title: "这里是标题",
          content: "这里是内容"
        },
        {
          title: "这里是标题",
          content: "这里是内容"
        }
      ]
    };
  },
  methods: {
    onSubmit(e) {}
  }
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
}
.form-wrap,
.requirement {
  @include hCenter;
  width: 1200px;
  padding: 25px 0;
  border: $default-border;
  border-radius: 4px;
  background: $bg-white;
}
.requirement {
  margin-top: 25px;
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  dl {
    margin-top: 32px;
    dt {
      font-size: $font-large;
      color: $color-danger;
      margin-bottom: 10px;
    }
    dd {
      line-height: 1.8;
    }
  }
}

.form-wrap {
  margin-top: -140px;
  .title {
    text-align: center;
    font-size: $font-middile;
  }
  .form {
    padding: 0 235px;
    margin-top: 30px;
    button {
      margin-top: 30px;
    }
  }
}
</style>


