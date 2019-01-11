import Router from "vue-router";
Vue.use(Router);
const Main = r => require(["@/view/Main"], r);
const Home = r => require(["@/view/home/Home"], r);
const userMain = r => require(["@/view/user/userMain"], r);
const User = r => require(["@/view/user/User"], r);
const Login = r => require(["@/view/user/Login"], r);
const checkLogin = r => require(["@/view/user/checkLogin"], r);
const Register = r => require(["@/view/user/Register"], r);
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
          title: "首页",
          removeHeader: true
        }
      }
    ]
  },
  {
    path: "/userentry",
    name: "userMain",
    component: userMain,
    redirect: "/userentry/login",
    children: [{
      name: "Login",
      path: "/userentry/login",
      component: Login,
      meta: {
        removeHeader: true
      }
    }, {
      name: "checkLogin",
      path: "/userentry/check_login",
      component: checkLogin,
      meta: {
        auth: true
      }
    }, {
      name: "Register",
      path: "/userentry/register",
      component: Register,
      meta: {
        title: "注册"
      }
    }]
  }
];
export default new Router({ routes });
