/**
 * 引入全局样式
 */
import 'swiper/dist/css/swiper.css';
import '../static/css/common.css';
/**
 * 引入第三方库
 */
import Store from "@/vuexStore/store";
import router from "@/router/index";
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Cell,
  CellGroup,
  Field,
  Row,
  Col,
  Icon,
  Tag,
  Tab,
  Tabs,
  Dialog,
  Uploader
} from "vant";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(Row)
  .use(Col)
  .use(Icon)
  .use(Tag)
  .use(Tab)
  .use(Tabs)
  .use(Dialog)
  .use(Uploader)
/**
 * 引入全局组件
 */
import App from "@/App";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import tabBar from "@/components/other/tabBar";
Vue.component(Footer.name, Footer);
Vue.component(Header.name, Header);
Vue.component(tabBar.name, tabBar);
/**
 * 引入自定义相关js
 */
import Validate from "@/assets/js/validate";
import Request from "@/assets/js/request";
import myStorage from "@/assets/js/myStorage";
import apiCfg from "@/config/apiConfig";
Vue.config.productionTip = false;
/**
 * 过滤器
 */
import filter from './filters/Filter';
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
});
/**
 * 拓展Vue实例
 */

Object.assign(Vue.prototype, {
  request: Request,
  Validate: Validate,
  storage: myStorage,
  $store: Store,
  api: apiCfg,
  redirectTo(pathName, params) {
    let data = {
      path: pathName,
      query: params
    };
    if (!params) delete data.params;
    router.replace(data);
  },
  navigateTo(pathName, params) {
    let data = {
      path: pathName,
      query: params
    };
    if (!params) delete data.params;
    router.push(data);
  },
  goBack() {
    router.go(-1);
  }
});
/**全局路由守卫 */
router.beforeEach((to, from, next) => {
  // 如果未匹配到正确的路由直接跳转首页
  if (to.matched.length == 0) {
    next({ path: "/" });
  }
  // 判断是否有上一页
  from.path && Store.commit("setShowHeaderBack", true);
  to.meta.title && (document.title = to.meta.title);
  // 设置是否加载通用的header
  Store.commit('setMainHeaderShow', !to.meta.removeHeader)
  Store.commit("setHeaderTitle", to.meta.title);
  if (myStorage.get('isLogin')) {
    Store.dispatch('changeLoginState', true);
  }
  if (to.meta.auth) {
    if (myStorage.get("token")) {
      Store.dispatch('changeLoginState', true);
      next();
    } else {
      myStorage.set("isLogin", false);
      next({ path: "/userentry/login" });
    }
  } else {
    if (to.name == "Login" || to.name == 'Register') {
      myStorage.remove("token");
      Store.dispatch('changeLoginState', false);
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
