import Request from '../assets/js/request';
import apiConfig from '../config/apiConfig';
import Store from '../vuexStore/store';
import { Toast } from "vant";
// 处理后台返回结果集
function handelResult(result) {
    try {
        if (result.code != 0) {
            Toast({
                message: result.msg || "获取数据失败"
            });
            return false;
        } else {
            return result.data;
        }
    } catch (err) {
        console.log(err)
    }
};
function isEmptyObject(obj) {
    let name;
    for (name in obj) {
        return false;
    }
    return true;
};
// 获取新闻列表
const getNewsList = async () => {
    try {
        if (Store.state.newsList.length > 0) return;
        let result = await Request(apiConfig.notices);
        let data = handelResult(result);
        Store.dispatch('getNewsList', data.list);
    } catch (err) {
        console.log(err);
    }
};
// 获取用户信息
const getUserInfo = async () => {
    try {
        if (!isEmptyObject(Store.state.userInfo)) return Store.state.userInfo;
        let result = await Request(apiConfig.userinfo);
        let data = handelResult(result);
        Store.dispatch('updateUserinfo', data[0]);
    } catch (err) {
        console.log(err);
    }
};
// 获取主币种
const getMainCoin = async () => {
    try {
        if (Store.state.mainCoin.length > 0) return Store.state.mainCoin;
        let result = await Request(apiConfig.getmaincoin);
        let data = handelResult(result);
        Store.dispatch('getMainCoin', data.list);
        return data.list;
    } catch (err) {
        console.log(err);
    }
};
//获取交易币种
const getTradeCoin = async coinid => {
    try {
        let result = await Request(apiConfig.gettradecoin, { maincoin: coinid });
        let data = handelResult(result);
        Store.dispatch('getTradeCoin', data.list);
        return data.list;
    } catch (err) {
        console.log(err);
    }
};
// 获取首页banner
const getIndexBanner = async () => {
    try {
        let result = await Request(apiConfig.banner);
        let data = handelResult(result);
        if (window.sessionStorage) {
            window.sessionStorage.setItem('banner', JSON.stringify(data.list));
        };
        return data.list;
    } catch (err) {
        console.log(err);
    }
};
// 获取可用
const getAvailable = async coinid => {
    try {
        let result = await Request(apiConfig.getdaynumber, {
            coin: coinid
        });
        let data = handelResult(result);
        return data.list[0];
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
        if (result.code == 0) {
            return result;
        }
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
            password: formData.password,
            type: formData.type,
            password: formData.password,
            code: formData.code,
            parent: formData.parent
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err);
    }
};
//获取验证码
const setCode = async (account, type) => {
    try {
        let result = await Request(apiConfig.code, {
            account: account,
            type: type
        });
        if (result.code == 0) {
            return result
        }
    } catch (err) {
        console.log(err);
    }
};
export {
    getNewsList,
    getUserInfo,
    getMainCoin,
    getTradeCoin,
    getIndexBanner,
    getAvailable,
    Login,
    checkLogin,
    Register,
    setCode
}