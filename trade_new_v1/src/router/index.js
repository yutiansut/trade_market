const Main = r => require(['@/view/home/Main'], r);
const Home = r => require(['@/view/home/Home'], r);
const Invite = r => require(['@/view/home/Invite'], r);
const User = r => require(['@/view/user/UserMain'], r);
const Login = r => require(['@/view/user/Login'], r);
const Register = r => require(['@/view/user/Register'], r);
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Home',
        component: Home,
        meta: {
          title: "首页"
        }
      },
      {
        path: '/invite',
        name: 'Invite',
        component: Invite,
        meta: {
          title: "好友邀请",
          auth: true
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    redirect: "/user/login",
    children: [
      {
        path: "/user/login",
        name: "Login",
        component: Login,
        meta: {
          title: "用户登录"
        }
      }, {
        path: "/user/register",
        name: "Register",
        component: Register,
        meta: {
          title: "用户注册"
        }
      }]
  }
]
export default new VueRouter({ routes });
