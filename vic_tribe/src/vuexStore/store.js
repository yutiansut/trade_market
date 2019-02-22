import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLogin: false,
    showFooter: true,
    headerTitle: "",
    footerItemIndex: 0,
    showHeaderBack: false,
    showMainHeader: true,
    userInfo: {},
    newsList: []
  },
  mutations: {
    loginState(state, val) {
      state.isLogin = val;
    },
    footerShow(state, newVal) {
      state.showFooter = newVal;
    },
    setFooterItem(state, newVal) {
      state.footerItemIndex = newVal;
    },
    setHeaderTitle(state, newVal) {
      state.headerTitle = newVal;
    },
    setShowHeaderBack(state, newVal) {
      if (state.showHeaderBack == newVal) return
      state.showHeaderBack = newVal;
    },
    setMainHeaderShow(state, val) {
      state.showMainHeader = val;
    },
    updateNewsList(state, arr) {
      state.newsList = arr;
    },
    updateUserInfo(obj) {
      state.updateUserInfo = obj
    }
  },
  actions: {
    changeLoginState(ctx, val) {
      ctx.commit("loginState", val);
    },
    getNewsList(ctx, data) {
      ctx.commit('updateNewsList', data)
    },
    updateUserInfo(ctx, data) {
      ctx.commit('updateUserInfo', data)
    }
  }
});
