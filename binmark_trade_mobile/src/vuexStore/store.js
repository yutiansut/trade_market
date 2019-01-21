import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLogin: false,
    isCheckLogin: false,
    showFooter: true,
    headerTitle: "",
    footerItemIndex: 0,
    showHeaderBack: false,
    showMainHeader: true,
    newsList: [],
    mainCoin: [],
    tradeCoin: [],
    maincoinid: "",
    tradecoinid: "",
    coinInfo: {},
    userInfo: {},
    coinPropertyInfo: {}
  },
  mutations: {
    loginState(state, val) {
      state.isLogin = val;
    },
    checkLoginState(state) {
      state.isCheckLogin = !state.isCheckLogin
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
    updateMainCoin(state, obj) {
      state.mainCoin = obj;
    },
    updateTradeCoin(state, obj) {
      state.tradeCoin = obj;
    },
    updateMainCoinid(state, val) {
      state.maincoinid = val;
    },
    updateTradeCoinid(state, val) {
      state.tradecoinid = val;
    },
    setCoinInfo(state, obj) {
      state.coinInfo = obj;
    },
    setCoinPropertyInfo(state, obj) {
      state.coinPropertyInfo = obj;
    },
    getUserInfo(state, obj) {
      state.userInfo = obj;
    }
  },
  actions: {
    updateLoginState(ctx, val) {
      ctx.commit("loginState", val);
    },
    updateCheckLoginState(ctx) {
      ctx.commit('checkLoginState')
    },
    getNewsList(ctx, data) {
      ctx.commit('updateNewsList', data)
    },
    updateUserinfo(ctx, data) {
      ctx.commit('getUserInfo', data)
    },
    getMainCoin(ctx, data) {
      ctx.commit('updateMainCoin', data);
    },
    getTradeCoin(ctx, data) {
      ctx.commit('updateTradeCoin', data);
    }
  }
});
