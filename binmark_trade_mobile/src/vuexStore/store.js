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
    newsList: []
  },
  mutations: {
    loginState(state) {
      state.isLogin = !state.isLogin;
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
    }
  },
  actions: {
    changeLoginState(ctx) {
      ctx.commit("loginState");
    },
    getNewsList(ctx, data) {
      ctx.commit('updateNewsList', data)
    }
  }
});
