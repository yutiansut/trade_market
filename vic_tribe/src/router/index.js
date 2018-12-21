const Main = r => require(['@/view/Main'], r);
const routes = [
  {
    path: '/',
    name: "Main",
    component: Main,
    meta: {
      title: "首页"
    }
  }
]
export default new VueRouter({ mode: 'history', routes });
