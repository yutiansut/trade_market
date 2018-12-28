export default new Vuex.Store({
    state: {
        isLogin: false
    },
    mutations: {
        setLoginState(state) {
            state.isLogin = !state.isLogin
        }
    },
    actions: {
        handleSetLoginState(ctx) {
            ctx.commit('setLoginState');
        }
    }
});