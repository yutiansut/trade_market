import Router from "vue-router";
Vue.use(Router);
const Main = r => require(["@/view/Main"], r);
const Home = r => require(["@/view/home/Home"], r);
const Mine = r => require(["@/view/home/Mine"], r);
const c2cHome = r => require(["@/view/trade/c2cHome"], r);
const appList = r => require(["@/view/app/Application"], r);
const User = r => require(["@/view/user/User"], r);
const UserInfo = r => require(["@/view/user/UserInfo"], r);
const AccountSetting = r => require(['@/view/user/AccountSetting'], r);
const ResetPassword = r => require(['@/view/user/ResetPassword'], r);
const ResetTradePassword = r => require(['@/view/user/ResetTradePassword'], r);
const MyTeam = r => require(['@/view/user/MyTeam'], r);
const FeedBack = r => require(['@/view/user/FeedBack'], r);
const Invite = r => require(['@/view/user/Invite'], r);
const QrCode = r => require(['@/view/user/QrCode'], r);
const Login = r => require(["@/view/user/Login"], r);
const userMain = r => require(["@/view/user/userMain"], r);
const Register = r => require(["@/view/user/Register"], r);
const News = r => require(["@/view/news/newsMain"], r);
const newsList = r => require(["@/view/news/newsList"], r);
const newsDetail = r => require(["@/view/news/newsDetail"], r);
const Vicexchange = r => require(["@/view/trade/VicExchange"], r);
const currencyExchange = r => require(["@/view/trade/currencyExchange"], r);
const directionalTrade = r => require(["@/view/trade/directionalTrade"], r);
const Record = r => require(["@/view/record/Record"], r);
const exchangeRecord = r => require(["@/view/record/exchangeRecord"], r);
const incomeRecord = r => require(['@/view/record/incomeRecord'], r);
const billRecord = r => require(['@/view/record/billRecord'], r);
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
          title: "VIC首页",
          removeHeader: true
        }
      },
      {
        path: "/c2c/",
        name: "c2cHome",
        component: c2cHome,
        meta: {
          title: "c2c交易",
          auth: true
        }
      },
      {
        path: "/app_list",
        name: "appList",
        component: appList,
        meta: {
          title: "应用",
          auth: false
        }
      },
      {
        path: "/user",
        name: "User",
        component: User,
        meta: {
          title: "我的",
          auth: true,
          removeHeader: true
        }
      }
    ]
  },
  {
    path: "/home/mine",
    name: "Mine",
    component: Mine,
    meta: {
      title: "矿多多",
      auth: false
    }
  },
  {
    path: "/user/info",
    name: "UserInfo",
    component: UserInfo,
    meta: {
      title: "个人信息",
      auth: true
    }
  },
  {
    path: "/user/setting",
    name: "AccountSetting",
    component: AccountSetting,
    meta: {
      title: "账户设置",
      auth: true
    }
  },
  {
    path: "/user/repassword_1",
    name: "ResetPassword",
    component: ResetPassword,
    meta: {
      title: "修改登录密码",
      auth: true
    }
  },
  {
    path: "/user/repassword_2",
    name: "ResetTradePassword",
    component: ResetTradePassword,
    meta: {
      title: "修改支付密码",
      auth: true
    }
  },
  {
    path: "/user/myteam",
    name: "MyTeam",
    component: MyTeam,
    meta: {
      title: "我的圈友",
      auth: true
    }
  },
  {
    path: "/user/feedback",
    name: "FeedBack",
    component: FeedBack,
    meta: {
      title: "我的小蜜",
      auth: true
    }
  },
  {
    path: "/user/invite",
    name: "Invite",
    component: Invite,
    meta: {
      title: "邀请好友",
      auth: false
    }
  },
  {
    path: "/userentry",
    name: "Account",
    component: userMain,
    redirect: "/userentry/login",
    children: [{
      path: "/userentry/login",
      name: "Login",
      component: Login,
      meta: {
        title: "用户登录",
        auth: false
      }
    }, {
      path: "/userentry/register",
      name: "Register",
      component: Register,
      meta: {
        title: "用户注册",
        auth: false
      }
    }]
  },
  {
    path: "/news",
    name: "News",
    component: News,
    redirect: '/news/list',
    children: [{
      path: "/news/list",
      name: "newsList",
      component: newsList,
      meta: {
        title: "资讯列表"
      }
    },
    {
      path: "/news/detail/:id",
      name: "newsDetail",
      component: newsDetail,
      meta: {
        title: "资讯详情"
      }
    }]
  },
  {
    path: "/vicexchange",
    name: "Vicexchange",
    component: Vicexchange,
    meta: {
      title: "VIC兑换"
    }
  },
  {
    path: "/currency_exchange",
    name: "currencyExchange",
    component: currencyExchange,
    meta: {
      title: "货币兑换"
    }
  },
  {
    path: "/dir_trade",
    name: "directionalTrade",
    component: directionalTrade,
    meta: {
      title: "定向交易"
    }
  },
  {
    path: '/record',
    component: Record,
    children: [{
      path: "",
      component: exchangeRecord,
      name: "exchangeRecord",
      meta: {
        title: "转换记录"
      }
    }, {
      path: "/record/income_record",
      component: incomeRecord,
      name: "incomeRecord",
      meta: {
        title: "收益记录"
      }
    },
    {
      path: "/record/bill_record",
      component: billRecord,
      name: "billRecord",
      meta: {
        title: "我的账单"
      }
    }]
  },
  {
    path: "/qrcode",
    name: "QrCode",
    component: QrCode,
    meta: {
      title: "二维码"
    }
  }
];
export default new Router({ routes });
