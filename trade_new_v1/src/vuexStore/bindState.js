
const bindModel = {
    state: {
        googlestate: 0,
        emailstate: 0,
        idcardstate: 0,
        tradestate: 0,
        bankstate: 0,
    },
    mutations: {
        updateState(state, obj) {
            if (typeof (obj) == 'object' && !obj.length) {
                for (let key in obj) {
                    if (state.hasOwnProperty(key)) {
                        state[key] = obj[key]
                    }
                }
            } else {
                console.warn('参数必须为Object');
            }
        }
    },
    actions: {
        triggerUpdate(ctx, data) {
            ctx.commit("updateState", data);
        }
    }
}
export default bindModel