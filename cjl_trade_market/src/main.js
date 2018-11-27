/**
 * 引入全局样式
 */
import "@/assets/css/common.css";
import "@/assets/css/aliFont.css";
import "vant/lib/vant-css/index.css";
import 'element-ui/lib/theme-chalk/index.css';
/**
 * 引入vue根节点组件
 */
import Vue from 'vue'
import App from './App'
import router from './router'
/**
 * 注册并使用第三方类/库
 */
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementUI from 'element-ui';
Vue.use(VueI18n);
Vue.use(ElementUI, zhLocale);
/**
 * 方法
 */
let initLang = () => {
  let lang = "en-US";
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
import indexBanner from '@/components/home/IndexBanner.vue';
import noticeBar from '@/components/home/NoticeBar.vue';
import loginStateBar from '@/components/home/loginStateBar.vue';
import CeAsideComp from '@/components/aside/CEasideComp.vue';
import C2CAsideComp from '@/components/aside/C2CasideComp.vue';
import snapShot from '@/components/SnapShot.vue';
import formGroup from '@/components/formGroup.vue';
import dialogBox from '@/components/dialogContent/dialogBox.vue';
import unLoginTip from '@/components/login/unLoginTip.vue';
Vue.component(Footer.name, Footer);
Vue.component(Header.name, Header);
Vue.component(indexBanner.name, indexBanner);
Vue.component(noticeBar.name, noticeBar);
Vue.component(loginStateBar.name, loginStateBar);
Vue.component(CeAsideComp.name, CeAsideComp);
Vue.component(C2CAsideComp.name, C2CAsideComp);
Vue.component(snapShot.name, snapShot);
Vue.component(formGroup.name, formGroup);
Vue.component(dialogBox.name, dialogBox);
Vue.component(unLoginTip.name, unLoginTip);
/**
 * 引入自定义js
 */
import Util from './assets/js/utils'
import Request from './assets/js/request';
import userModel from './model/userData';
import routeModel from './model/routeModel';
import myStorage from './assets/js/myStorage';
import apiCfg from './config/apiConfig';
Vue.config.productionTip = false;
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
    this.$message.error(`${msg}`);
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
      next({ path: "/user/login" });
      userModel.isLogin = false;
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