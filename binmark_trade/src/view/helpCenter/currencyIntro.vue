<template>
  <div class="intro">
    <el-container>
      <el-aside width="400px">
        <div class="list-tree">
          <c2c-aside-comp
            max-height='660'
            :myData='myData'
            :showArrow='false'
            @onListClick='onListClick'
          >
          </c2c-aside-comp>
        </div>
      </el-aside>
      <el-main>
        <div class="intro-detail">
          <div class="heading flex flex-v-center flex-h-center">
            <img
              class="thumb-50"
              src=""
              alt=""
            >
            <span
              class="font-bold"
              v-text="coinInfo.chinaname"
            ></span>
          </div>
          <dl>
            <dt
              class="font-bold"
              v-text="$t('currencyIntro')||'币种简介'"
            ></dt>
            <dd
              class="mt-20"
              v-text="coinInfo.info"
            ></dd>
            <dt
              class="font-bold"
              v-text="$t('currencyProp')||'币种参数'"
            ></dt>
            <dd>
              <ul class="properties">
                <li>{{$t("publishDate")||"推出日期"}}：&nbsp;&nbsp;{{coinInfo.sdate}}</li>
                <li>{{$t("publishVol")||"发行总量"}}：&nbsp;&nbsp;{{coinInfo.number}}</li>
                <li>{{$t("marketVal")||"市值"}}：&nbsp;&nbsp;${{coinInfo.usdt*1||0}}</li>
                <li>{{$t("currencyAlgorithm")||"币种算法"}}：&nbsp;&nbsp;{{coinInfo.coinscrypt}}</li>
                <li>{{$t("blockSize")||"区块大小"}}：&nbsp;&nbsp;{{coinInfo.blocksize}}</li>
                <!-- <li>{{$t("currencyDifficulty")||"难度调整"}}：&nbsp;&nbsp;2016 Blocks</li> -->
              </ul>
            </dd>
            <dt
              class="font-bold"
              v-text="$t('link')"
            ></dt>
            <dd class="link">
              <template v-for="item in links">
                <a
                  :key='item.href'
                  :href="item.href"
                >
                  <i
                    class="iconfont"
                    :class='item.icon'
                  >
                  </i>
                  <span v-text="$t(item.i18nKey)||item.label"></span>
                </a>
              </template>
            </dd>
          </dl>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myData: "",
      links: [
        {
          href: "",
          i18nKey: "eWalletdownload",
          label: "钱包下载",
          icon: "icon-qianbao"
        },
        {
          href: "",
          i18nKey: "sourceCode",
          label: "源码下载",
          icon: "icon-baobiaoyuanmax"
        },
        {
          href: "",
          i18nKey: "blockBrowser",
          label: "区块链浏览器",
          icon: "icon-qukuailianjishu"
        },
        {
          href: "",
          i18nKey: "website",
          label: "官方网站",
          icon: "icon-guanwang"
        },
        {
          href: "",
          i18nKey: "forum",
          label: "论坛",
          icon: "icon-luntan"
        },
        {
          href: "",
          i18nKey: "mining",
          label: "挖矿",
          icon: "icon-wakuang"
        },
        {
          href: "",
          i18nKey: "transaction",
          label: "交易",
          icon: "icon-jiaoyi"
        }
      ],
      coinInfo: ""
    };
  },
  mounted() {
    this.getCoinInfo();
  },
  methods: {
    getCoinInfo() {
      this.request(this.api.getcoininfo).then(res => {
        console.log(`币种资料：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.myData = res.data.list);
        this.coinInfo = res.data.list[0];
      });
    },
    onListClick(data) {
      this.coinInfo = data;
    }
    // getCoinDetail(id) {}
  }
};
</script>

<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
.el-container {
  border-bottom: $default-border;
  min-height: 100%;
}
.list-head {
  @include textVcenter;
  border-bottom: $default-border;
}
.list-container {
  border-bottom: none !important;
  img {
    margin-right: 5px;
  }
}
.intro-detail {
  .heading {
    width: 100%;
    span {
      font-size: $font-large;
    }
  }
  dl {
    dt {
      font-size: $font-large;
      padding-bottom: 14px;
      border-bottom: $default-border;
      margin-top: 40px;
    }
  }
  .properties {
    overflow: hidden;
    margin-top: 12px;
    li {
      float: left;
      width: 50%;
      line-height: 3;
    }
  }
  .link {
    margin-top: 16px;
    a {
      display: inline-block;
      overflow: hidden;
      padding-right: 26px;
      line-height: 30px;
      &:hover {
        color: $color-danger;
      }
      span {
        margin-left: 5px;
      }
    }
    .iconfont {
      float: left;
      font-size: $font-ex-large;
    }
  }
}
</style>