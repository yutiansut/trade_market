/**
 * 引入vue根节点组件
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import "../static/css/aliFont.css";
import "../static/css/common.css";

/**
 * 注册并使用第三方类/库
 */
import VueClipboard from 'vue-clipboard2';
import VueI18n from 'vue-i18n';
import ELEMENT from 'element-ui';
import locale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import vueBus from 'vue-bus';
VueClipboard.config.autoSetContainer = true;
Vue.use(vueBus);
Vue.use(VueI18n);
Vue.use(ELEMENT, zhLocale);
Vue.use(VueClipboard);
/**
 * 处理promise 兼容
 */
require('es6-promise').polyfill();
/**
 * 方法
 */
let initLang = () => {
  let lang = "zh-CN";
  myStorage.get('PCDefaultLanguage') && (lang = myStorage.get('PCDefaultLanguage'));
  return lang;
}

/**设置语言包 */
const i18n = new VueI18n({
  locale: initLang(),
  messages: {
    'en-US': Object.assign(require('../static/lang/en-US'), enLocale),
    'zh-CN': Object.assign(require('../static/lang/zh-CN'), zhLocale)
  }
});

// element UI 语言同步;
locale.i18n((key, value) => i18n.t(key, value));
/*
 * 引入全局组件
 */
import Footer from '@/components/Footer.vue';
import Header from '@/components/home/Header.vue';
import loginStateBar from '@/components/home/loginStateBar.vue';
import C2CAsideComp from "@/components/aside/C2CasideComp.vue";
import dialogBox from '@/components/dialogContent/dialogBox.vue';
import unLoginTip from '@/components/login/unLoginTip.vue';
Vue.component(Footer.name, Footer);
Vue.component(Header.name, Header);
Vue.component(loginStateBar.name, loginStateBar);
Vue.component(dialogBox.name, dialogBox);
Vue.component(unLoginTip.name, unLoginTip);
Vue.component(C2CAsideComp.name, C2CAsideComp);
/**
 * 引入自定义js
 */
import Util from './assets/js/utils'
import Request from './assets/js/request';
import userModel from './model/userData';
import routeModel from './model/routeModel';
import myStorage from './assets/js/myStorage';
import apiCfg from './config/apiConfig';
import filter from './assets/js/filter';
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
});
Vue.config.productionTip = false;
// 公共方法
const getDataFaild = function (errMsg) {
  this.$message.error(i18n.t(errMsg) || '获取数据失败');
  return false;
};
/**
 * 拓展Vue实例
 */
Object.assign(Vue.prototype, {
  request: Request,
  Util: Util,
  storage: myStorage,
  api: apiCfg,
  userModel: userModel,
  routeModel: routeModel,
  getDataFaild: getDataFaild,
  redirectTo(pathName, params) {
    let data = {
      path: pathName,
      query: params
    }
    if (!params) delete data.query;
    router.replace(data);
  },
  navigateTo(pathName, params) {
    let data = {
      path: pathName,
      query: params
    }
    if (!params) delete data.query;
    router.push(data);
  },
  errMsg(msg) {
    this.$message.error(i18n.t(msg));
  },
  successMsg(msg) {
    this.$message({
      message: `${i18n.t(msg)}`,
      type: "success"
    });
  },
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