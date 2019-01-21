import Router from "vue-router";
Vue.use(Router);
const Main = r => require(["@/view/Main"], r);
const Home = r => require(["@/view/home/Home"], r);
const userMain = r => require(["@/view/user/userMain"], r);
const Login = r => require(["@/view/user/Login"], r);
const checkLogin = r => require(["@/view/user/checkLogin"], r);
const Register = r => require(["@/view/user/Register"], r);
const Register_1 = r => require(["@/view/user/Register_1"], r);
const Register_2 = r => require(["@/view/user/Register_2"], r);
const Resetpassword = r => require(["@/view/user/Resetpassword"], r);
const News = r => require(["@/view/news/newsMain"], r);
const newsList = r => require(["@/view/news/newsList"], r);
const newsDetail = r => require(["@/view/news/newsDetail"], r);
const coinTrade = r => require(["@/view/trade/coinTrade"], r);
const entrustDetail = r => require(["@/view/trade/entrustDetail"], r);
const c2cTrade = r => require(["@/view/trade/c2cTrade"], r);
const c2cTradeConfirm = r => require(["@/view/trade/c2cTradeConfirm"], r);
const c2cMatch = r => require(["@/view/trade/c2cMatch"], r);
const orderDetail = r => require(["@/view/trade/orderDetail"], r);
const otcTrade = r => require(["@/view/trade/otcTrade"], r);
const tradeStatement = r => require(["@/view/trade/tradeStatement"], r);
const Property = r => require(["@/view/myproperty/Property"], r);
const propertyDetail = r => require(["@/view/myproperty/PropertyDetail"], r);
const Recharge = r => require(["@/view/myproperty/Recharge"], r);
const WithDraw = r => require(["@/view/myproperty/WithDraw"], r);
const PropertyRecord = r => require(["@/view/myproperty/PropertyRecord"], r);
const DetailRecord = r => require(["@/view/myproperty/DetailRecord"], r);
const AccountMain = r => require(["@/view/account/Main"], r);
const SecurityCenter = r => require(["@/view/account/SecurityCenter"], r);
const ChangePassword = r => require(["@/view/account/ChangePassword"], r);
const ChangeTradePassword = r => require(["@/view/account/ChangeTradePassword"], r);
const BindEmail = r => require(["@/view/account/BindEmail"], r);
const BindBank = r => require(["@/view/account/BindBank"], r);
const GoogleAuth = r => require(["@/view/account/GoogleAuth"], r);
const Identify = r => require(["@/view/account/Identify"], r);
// 日志记录
const AccountLogs = r => require(["@/view/account/AccountLogs"], r);
const LoginLogs = r => require(["@/view/account/LoginLogs"], r);
// 文章资料
const ArticleMain = r => require(["@/view/articles/ArticleMain"], r);
const AboutTrade = r => require(["@/view/articles/AboutTrade"], r);
const Fee = r => require(["@/view/articles/Fee"], r);
const CoinInfo = r => require(["@/view/articles/CoinInfo"], r);
const AccountCenter = r => require(["@/view/account/AccountCenter"], r);
const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: Home,
        name: "Home",
        meta: {
          title: "首页"
        }
      },
      {
        path: "/trade/coin_trade",
        name: 'coinTrade',
        component: coinTrade,
        meta: {
          title: "交易"
        }
      },
      {
        path: "/trade/c2c_trade",
        name: 'c2cTrade',
        component: c2cTrade,
        meta: {
          title: "c2c交易"
        }
      },
      {
        path: "/trade/otc_trade",
        name: 'otcTrade',
        component: otcTrade,
        meta: {
          title: "OTC交易"
        }
      },
      {
        path: "/property",
        name: 'Property',
        component: Property,
        meta: {
          title: "我的资产",
          auth: true
        }
      },
    ]
  },
  {
    path: "/userentry",
    name: "userMain",
    component: userMain,
    redirect: "/userentry/login",
    children: [
      {
        path: "/userentry/login",
        component: Login,
        meta: {
          removeHeader: true
        }
      },
      {
        name: "checkLogin",
        path: "/userentry/check_login",
        component: checkLogin,
        meta: {
          auth: false
        }
      },
      {
        path: "/userentry/register",
        component: Register,
        children: [{
          name: "Register_1",
          path: "",
          component: Register_1,
        }, {
          name: "Register_2",
          path: '/userentry/register_2',
          component: Register_2,
        }]
      },
      {
        path: "/userentry/resetpassword",
        component: Resetpassword
      }
    ]
  },
  {
    path: "/news",
    component: News,
    children: [
      {
        path: "",
        component: newsList,
        meta: {
          title: "我的公告"
        }
      },
      {
        path: "/news/detail/:id",
        name: "newsDetail",
        component: newsDetail,
        meta: {
          title: "公告详情"
        }
      }
    ]
  },
  {
    path: "/trade/entrust_detail",
    name: "entrustDetail",
    component: entrustDetail,
    meta: {
      title: "委托详情"
    }
  },
  {
    path: "/trade/trade_confirm",
    name: "c2cTradeConfirm",
    component: c2cTradeConfirm,
    meta: {
      title: "订单确认"
    }
  },
  {
    path: "/trade/c2c_match",
    name: "c2cMatch",
    component: c2cMatch,
    meta: {
      title: "最近匹配订单"
    }
  },
  {
    path: "/trade/order_detail",
    name: "orderDetail",
    component: orderDetail,
    meta: {
      title: "订单详情"
    }
  },
  {
    path: "/trade/tradeStatement",
    name: "tradeStatement",
    component: tradeStatement,
    meta: {
      title: "交易须知"
    }
  },
  {
    path: "/property/property_detail",
    name: "propertyDetail",
    component: propertyDetail,
    meta: {
      title: "币种账户"
    }
  },
  {
    path: "/property/recharge",
    name: "Recharge",
    component: Recharge,
    meta: {
      title: "充值"
    }
  },
  {
    path: "/property/withdraw",
    name: "WithDraw",
    component: WithDraw,
    meta: {
      title: "提现"
    }
  },
  {
    path: "/property/record",
    name: "PropertyRecord",
    component: PropertyRecord,
    meta: {
      title: "账户记录"
    }
  },
  {
    path: "/property/detail_record",
    name: "DetailRecord",
    component: DetailRecord,
    meta: {
      title: "记录详情"
    }
  },
  {
    path: "/account",
    component: AccountMain,
    children: [
      {
        path: "",
        component: SecurityCenter,
        meta: {
          title: "安全中心"
        }
      },
      {
        path: "/account/changepwd",
        name: "ChangePassword",
        component: ChangePassword,
        meta: {
          title: "修改登录密码"
        }
      },
      {
        path: "/account/changetradepwd",
        name: "ChangeTradePassword",
        component: ChangeTradePassword,
        meta: {
          title: "修改交易密码"
        }
      },
      {
        path: "/account/bindemail",
        name: "BindEmail",
        component: BindEmail,
        meta: {
          title: "修改交易密码"
        }
      },
      {
        path: "/account/bindbank",
        name: "BindBank",
        component: BindBank,
        meta: {
          title: "修改交易密码"
        }
      },
      {
        path: "/account/google_auth",
        name: "GoogleAuth",
        component: GoogleAuth,
        meta: {
          title: "谷歌验证"
        }
      },
      {
        path: "/account/identify",
        name: "Identify",
        component: Identify,
        meta: {
          title: "身份认证"
        }
      },
      {
        path: "/account/account_log",
        name: "AccountLogs",
        component: AccountLogs,
        meta: {
          title: "安全日志"
        }
      },
      {
        path: "/account/login_logs",
        name: "LoginLogs",
        component: LoginLogs,
        meta: {
          title: "登录日志"
        }
      },
      {
        path: "/account/center",
        name: "AccountCenter",
        component: AccountCenter,
        meta: {
          title: "账户管理"
        }
      }
    ]
  },
  {
    path: '/articles',
    component: ArticleMain,
    children: [
      {
        path: "",
        component: AboutTrade,
        meta: { title: "问题中心" }
      },
      {
        path: "/articles/fee",
        name: "Fee",
        component: Fee,
        meta: { title: "费率" }
      },
      {
        path: "/articles/coininfo",
        component: CoinInfo,
        meta: { title: "币种资料" }
      }
    ]
  }
];
export default new Router({ routes });