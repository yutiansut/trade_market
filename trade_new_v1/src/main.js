/**
 * 引入并使用第三方库
 */
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.use(ELEMENT);
ELEMENT.locale(ELEMENT.lang.en)
/**
 * 引入全局组件
 */
import App from '@/App';
import Header from './components/header/Header.vue';
import navBar from './components/header/navBar.vue';
import statusBar from './components/header/statusBar.vue';
Vue.component(Header.name, Header);
Vue.component(navBar.name, navBar);
Vue.component(statusBar.name, statusBar);
/**
 * 引入自定义相关js
 */
import router from '@/router/index';
import Store from '@/vuexStore/store';
import Request from '@/assets/js/request';
import myStorage from '@/assets/js/myStorage';
import sessionStorage from '@/assets/js/mySession';
/**
 * 引入全局配置文件
 */
import apiCfg from '@/config/apiConfig';
import assetCfg from '@/config/assetsConfig'
/**
 * 全局方法
 */
let initLang = () => {
  let lang = "zh-CN";
  myStorage.get('DefaultLang') && (lang = myStorage.get('DefaultLang'));
  return lang;
}
/**
 * 设置语言包
 */
const i18n = new VueI18n({
  locale: initLang(),
  messages: {
    'en-US': Object.assign(require('../static/lang/en-US')),
    'zh-CN': Object.assign(require('../static/lang/zh-CN'))
  }
});
/**
 * 拓展Vue实例
 */
Object.assign(Vue.prototype, {
  request: Request,
  storage: myStorage,
  session: sessionStorage,
  api: apiCfg,
  assetCfg: assetCfg,
  Store: Store,
  redirectTo(pathName, params) {
    let data = {
      path: pathName,
      params: params
    }
    if (!params) delete data.params;
    router.replace(data);
  },
  navigateTo(pathName, params) {
    let data = {
      path: pathName,
      params: params
    }
    if (!params) delete data.params;
    router.push(data);
  }
});
/**全局路由守卫 */
router.beforeEach((to, from, next) => {
  // 如果未匹配到正确的路由直接跳转首页
  if (to.matched.length == 0) {
    next({ path: "/" });
    return;
  }
  to.meta.title && (document.title = to.meta.title);
  if (to.meta.auth) {
    if (myStorage.get("token")) {
      next();
    } else {
      myStorage.set('isLogin', false);
      next({ path: "/user/login" });
    }
  } else {
    if (to.name == 'Login') {
      myStorage.remove("token");
    }
    next();
  }
});
/* eslint-disable  */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
});