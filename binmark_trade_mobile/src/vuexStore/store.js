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
    checkLoginState: {},
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
    },
    checkLoginState(state, data) {
      Object.assign(state.checkLoginState, data);
    }
  },
  actions: {
    updateLoginState(ctx, val) {
      ctx.commit("loginState", val);
    },
    updateCheckLoginState(ctx, data) {
      ctx.commit('checkLoginState', data)
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
    },
    updateTradeCoinid(ctx, val) {
      ctx.commit('updateTradeCoinid', val)
    },
    updateMainCoinid(ctx, val) {
      ctx.commit('updateMainCoinid', val)
    }
  }
});
