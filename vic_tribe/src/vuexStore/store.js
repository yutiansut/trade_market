import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLogin: false,
    showFooter: true,
    headerTitle: "",
    footerItemIndex: 0,
    showHeaderBack: false
  },
  mutations: {
    loginState(state) {
      state.isLogin = !state.isLogin;
    },
    footerShow(state) {
      state.showFooter = !state.showFooter;
    },
    setFooterItem(state, newVal) {
      state.footerItemIndex = newVal;
    },
    setHeaderTitle(state, newVal) {
      state.headerTitle = newVal;
    },
    setShowHeaderBack(state) {
      state.showHeaderBack = !state.showHeaderBack;
    }
  },
  actions: {
    changeLoginState(ctx) {
      ctx.commit("loginState");
    }
  }
});
