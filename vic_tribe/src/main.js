/**
 * 引入全局样式
 */
import "@/assets/css/common.css";
import "normalize.css";
/**
 * 引入第三方库
 */
import Store from "@/vuexStore/store";
import router from "@/router/index";
import { Tabbar, TabbarItem, NavBar } from "vant";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(NavBar);
/**
 * 引入全局组件
 */
import App from "@/App";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
Vue.component(Footer.name, Footer);
Vue.component(Header.name, Header);
/**
 * 引入自定义相关js
 */
import Util from "@/assets/js/utils";
import Request from "@/assets/js/request";
import myStorage from "@/assets/js/myStorage";
import apiCfg from "@/config/apiConfig";
Vue.config.productionTip = false;

/**
 * 拓展Vue实例
 */
Object.assign(Vue.prototype, {
  request: Request,
  Util: Util,
  storage: myStorage,
  $store: Store,
  api: apiCfg,
  redirectTo(pathName, params) {
    let data = {
      path: pathName,
      params: params
    };
    if (!params) delete data.params;
    router.replace(data);
  },
  navigateTo(pathName, params) {
    let data = {
      path: pathName,
      params: params
    };
    if (!params) delete data.params;
    router.push(data);
  }
});
/**全局路由守卫 */
router.beforeEach((to, from, next) => {
  // 如果未匹配到正确的路由直接跳转首页
  if (to.matched.length == 0) {
    next({ path: "/" });
  }
  to.meta.title && (document.title = to.meta.title);
  Store.commit("setHeaderTitle", to.meta.title);
  if (to.meta.auth) {
    if (myStorage.get("token")) {
      next();
    } else {
      myStorage.set("isLogin", false);
      next({ path: "/login" });
    }
  } else {
    if (to.name == "Login") {
      myStorage.remove("token");
    }
    next();
  }
});
/* eslint-disable  */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
