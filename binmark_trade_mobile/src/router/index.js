import Router from "vue-router";
Vue.use(Router);
const Main = r => require(["@/view/Main"], r);
const Home = r => require(["@/view/home/Home"], r);
const userMain = r => require(["@/view/user/userMain"], r);
const User = r => require(["@/view/user/User"], r);
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
    component: c2cTradeConfirm
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
];
export default new Router({ routes });
