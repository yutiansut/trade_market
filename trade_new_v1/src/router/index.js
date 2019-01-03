const Main = r => require(['@/view/Main'], r);
const routes = [
  {
    path: '/',
    name: "Main",
    component: Main,
    meta: {
      title: "新交易所"
    }
  }
]
export default new VueRouter({ routes });
