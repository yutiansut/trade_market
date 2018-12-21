const Main = r => require(['@/view/home/Home'], r);
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
export default new VueRouter({ routes });
