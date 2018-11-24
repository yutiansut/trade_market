<template>
    <div class="main">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <img class="banner" :src="banner" alt="">
        <div class="form-wrap p-rel">
            <div class="title font-bold">请填写以下项目资料（请务必提供最详细准确信息，获得审核批准后将有权利参与投票上币）</div>
            <form @submit.prevent='onSubmit' class="form">
                <template v-for='(item,key) in formData'>
                    <form-group
                        :key="key"
                        :label='item.label'
                        :place-holder='item.placeholder'
                        :input-name='item.name||key'
                        :input-val='item.val'
                        @valChange='getVal'>
                    </form-group>
                </template>
                <button class="btn btn-large btn-block btn-active btn-danger">提交上线申请</button>
            </form>
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
          label: "您的Email",
          placeholder: "pcew账号",
          name: "email",
          val: ""
        },
        contact: {
          label: "团队联系方式",
          placeholder: "Email等",
          name: "contact",
          val: ""
        },
        currencyNameEn: {
          label: "币种英文名称",
          placeholder: "比如Bitcoin",
          name: "currencyNameEn",
          val: ""
        },
        currencyNameCn: {
          label: "币种中文名称",
          placeholder: "比如比特币",
          name: "currencyNameCn",
          val: ""
        },
        currencySymbol: {
          label: "币种交易符号",
          placeholder: "比如BTC",
          name: "currencySymbol",
          val: ""
        },
        icoDate: {
          label: "ICO日期",
          placeholder: "YYYY/MM/DD",
          name: "icoDate",
          val: ""
        },
        flowableDate: {
          label: "可流通日期",
          placeholder: "YYYY/MM/DD",
          name: "flowableDate",
          val: ""
        },
        blockType: {
          label: "币种区块网络类型",
          placeholder: "ETH，QTUM，NEO，XML，BTS或者独立链",
          name: "blockType",
          val: ""
        },
        contractAddr: {
          label: "代币合约地址",
          placeholder: "如果没有填“无”",
          name: "contractAddr",
          val: ""
        },
        decimalNum: {
          label: "小数点位数",
          placeholder: "如果没有填“无”",
          name: "decimalNum",
          val: ""
        },
        officalSite: {
          label: "币种官方网站",
          placeholder: "请输入币种官方网站",
          name: "officalSite",
          val: ""
        },
        whiteBook: {
          label: "币种白皮书网址",
          placeholder: "请输入币种白皮书网址",
          name: "whiteBook",
          val: ""
        },
        blockExplorer: {
          label: "区块浏览器",
          placeholder: "请输入区块浏览器地址",
          name: "blockExplorer",
          val: ""
        },
        logoLink: {
          label: "Logo图片链接",
          placeholder: "请输入Logo图片链接",
          name: "logoLink",
          val: ""
        },
        twitterLink: {
          label: "Twitter链接",
          placeholder: "请输入Twitter链接",
          name: "twitterLink",
          val: ""
        },
        telegramLink: {
          label: "Telegram链接",
          placeholder: "请输入Telegram链接",
          name: "telegramLink",
          val: ""
        },
        currentIntroCn: {
          label: "币种简短中文介绍",
          placeholder: "请输入币种简短中文介绍",
          name: "currentIntroCn",
          val: ""
        },
        currencyIntroEn: {
          label: "币种简短英文介绍",
          placeholder: "请输入币种简短英文介绍",
          name: "currencyIntroEn",
          val: ""
        },
        currencyVol: {
          label: "币种总量",
          placeholder: "请输入币种总量",
          name: "currencyVol",
          val: ""
        },
        currencyFlowVol: {
          label: "币种流通量",
          placeholder: "请输入币种流通量",
          name: "currencyFlowVol",
          val: ""
        },
        currencyShareRate: {
          label: "币种分配比例",
          placeholder: "如ICO分发比例，团队预留等",
          name: "currencyShareRate",
          val: ""
        },
        costPrice: {
          label: "成本价格",
          placeholder: "presale,private sale,public sale等",
          name: "costPrice",
          val: ""
        },
        onlinePlat: {
          label: "已上线交易平台",
          placeholder: "未上线写“无”",
          name: "onlinePlat",
          val: ""
        },
        otherInstruction: {
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
    onSubmit(e) {},
    getVal(v) {
      this.formData[v.name].val = v.val;
    }
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


