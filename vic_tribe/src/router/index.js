import Router from "vue-router";
Vue.use(Router);
const Main = r => require(["@/view/Main"], r);
const Home = r => require(["@/view/home/Home"], r);
const c2cHome = r => require(["@/view/trade/c2cHome"], r);
const appList = r => require(["@/view/app/Application"], r);
const User = r => require(["@/view/user/User"], r);
const Login = r => require(["@/view/user/login"], r);
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
        meta: { title: "首页" }
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
          title: "用户中心",
          auth: false
        }
      }
    ]
  }, {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "用户中心",
      auth: false
    }
  }
];
export default new Router({ routes });
