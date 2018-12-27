/**
 * 引入全局样式
 */
import "@/assets/css/common.css";
/**
 * 引入自定义相关js
 */
import App from '@/App'
import router from '@/router'
import Util from '@/assets/js/utils'
import Request from '@/assets/js/request';
import myStorage from '@/assets/js/myStorage';
import apiCfg from '@/config/apiConfig';
/**
 * 引入并使用第三方库
 */
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
Vue.config.productionTip = false;
/**
 * 全局方法
 */
let initLang = () => {
  let lang = "zh-CN";
  myStorage.get('PCDefaultLanguage') && (lang = myStorage.get('PCDefaultLanguage'));
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
  Util: Util,
  storage: myStorage,
  api: apiCfg,
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