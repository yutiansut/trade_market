const userModel = {
    state: {
        isLogin: false,
        account: "",
        tel: "",
        email: "",
        member: ""
    },
    mutations: {
        loginState(state) {
            state.isLogin = !state.isLogin
        },
        accountState(state, val) {
            state.state = val;
        },
        telState(state, val) {
            state.tel = val;
        },
        emailState(state, val) {
            state.email = val;
        },
        memberState(state, val) {
            state.member = val;
        }
    },
    actions: {
        commitLoginState(ctx) {
            ctx.commit('setLoginState');
        }
    }
}
export default userModel