<template>
    <div class="intro">
        <el-container>
          <el-aside width="400px">
            <div class="list-tree">
                <template v-for="(item,i) in myData">
                  <div class="list-head font-bold" :key='i' v-text="item.typeName"></div>
                  <c2c-aside-comp 
                    :key='item.typeName'
                    :myData='item.lists'
                    :showArrow='false'>
                  </c2c-aside-comp>
                </template>
            </div>
            </el-aside>
            <el-main>
              <div class="intro-detail">
                <div class="heading flex flex-v-center flex-h-center">
                  <img class="thumb-50" src="" alt="">
                  <span class="font-bold">【BTC】Bitcoin 比特币 钱包下载与资料</span>
                </div>
                <dl>
                  <dt class="font-bold">币种简介</dt>
                  <dd class="mt-20">Bitcoin是点对点的基于SHA-256算法的网络数字货币，到2140年之前总额达到2100万。</dd>
                  <dt class="font-bold">币种参数</dt>
                  <dd>
                    <ul class="properties">
                      <li>推出日期：&nbsp;&nbsp;2009-01-03</li>
                      <li>发行总量：&nbsp;&nbsp;21000000</li>
                      <li>市值：&nbsp;&nbsp;$ 106,364,261,880</li>
                      <li>币种算法：&nbsp;&nbsp;$ SHA-256</li>
                      <li>区块大小：&nbsp;&nbsp;25</li>
                      <li>难度调整： &nbsp;&nbsp;2016 Blocks</li>
                    </ul>
                  </dd>
                  <dt class="font-bold">链接</dt>
                  <dd class="link">
                    <template v-for="item in links">
                      <a :key='item.href' :href="item.href">
                        <i class="iconfont" :class='item.icon'></i>
                        <span>{{item.label}}</span>
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
      myData: [
        {
          typeName: "BTC",
          lists: [
            {
              id: "1",
              thumb: "",
              currency: "BTC/CEC"
            },
            {
              id: "2",
              thumb: "",
              currency: "BTC/CEC"
            }
          ]
        },
        {
          typeName: "BTC1",
          lists: [
            {
              id: "1",
              thumb: "",
              currency: "BTC/CEC"
            },
            {
              id: "2",
              thumb: "",
              currency: "BTC/CEC"
            }
          ]
        }
      ],
      links: [
        {
          href: "1",
          label: "钱包下载",
          icon: "icon-qianbao"
        },
        {
          href: "2",
          label: "源码下载",
          icon: "icon-baobiaoyuanmax"
        },
        {
          href: "3",
          label: "区块链浏览器",
          icon: "icon-qukuailianjishu"
        },
        {
          href: "4",
          label: "官方网站",
          icon: "icon-guanwang"
        },
        {
          href: "5",
          label: "论坛",
          icon: "icon-luntan"
        },
        {
          href: "6",
          label: "挖矿",
          icon: "icon-wakuang"
        },
        {
          href: "7",
          label: "交易",
          icon: "icon-jiaoyi"
        }
      ]
    };
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