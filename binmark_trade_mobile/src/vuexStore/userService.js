import Request from '../assets/js/request';
import apiConfig from '../config/apiConfig';
import Store from '../vuexStore/store';
import { Toast } from "vant";
// 处理后台返回结果集
function handelResult(result) {
    try {
        if (result.code != 0) {
            Toast({
                message: result.msg || "获取数据失败",
                position: "bottom"
            });
            return false;
        } else {
            return result.data;
        }
    } catch (err) {
        console.log(err)
    }
};
// 检测空对象
function isEmptyObject(obj) {
    let name;
    for (name in obj) {
        return false;
    }
    return true;
};
// 获取用户信息
const getUserInfo = async () => {
    try {
        if (!isEmptyObject(Store.state.userInfo)) return Store.state.userInfo;
        let result = await Request(apiConfig.userinfo);
        let data = handelResult(result);
        if (data) {
            let userInfo = data.userinfo[0];
            userInfo.amount = data.amount * 1 || 0;
            Store.dispatch('updateUserinfo', userInfo);
        };
        return data;
    } catch (err) {
        console.log(err);
    }
};
//登录
const Login = async (account, type, code) => {
    try {
        let result = await Request(apiConfig.login, {
            account: account,
            type: type,
            code: code
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err);
    }
};
//登录验证
const checkLogin = async (account, password) => {
    try {
        let result = await Request(apiConfig.checklogin, {
            account: account,
            password: password
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err);
    }
};
//注册
const Register = async formData => {
    try {
        let result = await Request(apiConfig.register, {
            account: formData.account,
            accountcode: formData.accountcode,
            type: formData.type,
            password: formData.password,
            code: formData.code,
            parent: formData.parent
        });
        let data = handelResult(result);
        if (data) {
            return result
        }
    } catch (err) {
        console.log(err);
    }
};
//获取验证码
const sendCode = async (account, type) => {
    try {
        let result = await Request(apiConfig.code, {
            account: account,
            type: type
        });
        let data = handelResult(result);
        if (data) {
            return result
        }
    } catch (err) {
        console.log(err);
    }
};
// 退出登录
const Logout = async () => {
    try {
        let result = await Request(apiConfig.logout);
        let data = handelResult(result);
        if (data) {
            Store.dispatch('updateLoginState', false);
            return data;
        }
    } catch (err) {
        console.log(err);
    }
};
// 重置密码
const resetPassword = async formData => {
    try {
        let result = await Request(apiConfig.forgetpwd, {
            account: formData.account,
            password: formData.password,
            code: formData.code,
            type: formData.type
        });
        let data = handelResult(result);
        if (data) {
            return result;
        }
    } catch (err) {
        console.log(err);
    }
};
// 资产列表
const myProperty = async (coinid) => {
    try {
        let result = await Request(apiConfig.getaccount, {
            search: coinid || ""
        });
        let data = handelResult(result);
        if (data) {
            return data.list;
        }
    } catch (err) {
        console.log(err);
    }
};
export {
    getUserInfo,
    Login,
    checkLogin,
    Register,
    sendCode,
    resetPassword,
    Logout,
    myProperty
}