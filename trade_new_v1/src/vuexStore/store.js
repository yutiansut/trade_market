import userModel from "./userStore";
import bindModel from './bindState';
export default new Vuex.Store({
    modules: {
        userModel,
        bindModel
    }
})