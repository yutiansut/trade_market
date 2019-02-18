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
            account,
            password
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
    let params = { account, type };
    if (!account) delete params[account];
    try {
        let result = await Request(apiConfig.code, params);
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
        if (Store.state.myProperty && Store.state.myProperty.length > 0) {
            return Store.state.myProperty
        }
        let result = await Request(apiConfig.getaccount, coinid && {
            search: coinid
        });
        let data = handelResult(result);
        if (data && data.list) {
            Store.dispatch('getMyproperty', data.list);
            return data.list;
        }
    } catch (err) {
        console.log(err);
    }
};
// 新增地址通讯录
const addAddress = async (title, address, coin) => {
    try {
        let result = await Request(apiConfig.addoutaddress, {
            title,
            address,
            coin
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
// 获取币种充值详情以及记录
const getCoinRecharge = async (coin) => {
    try {
        let result = await Request(apiConfig.getcoinbycoin, {
            coin
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err);
    }
};
//获取充值提现详情
const getRecordInfo = async (id, type) => {
    try {
        let result = await Request(apiConfig.getrecordinfo, {
            id,
            type
        });
        let data = handelResult(result);
        if (data.list) return data.list[0];
    } catch (err) {
        console.log(err);
    }
};
//获取地址通讯录
const getAddress = async (coin) => {
    try {
        let result = await Request(apiConfig.getoutaddress, coin && {
            search: coin
        });
        let data = handelResult(result);
        if (data.list) return data.list;
    } catch (err) {
        console.log(err);
    }
};
//删除地址
const deleteAddress = async (autoid) => {
    try {
        let result = await Request(apiConfig.deloutaaddress, {
            autoid
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
// 提币
const outCoin = async formData => {
    try {
        let result = await Request(apiConfig.outcoin, {
            coin: formData.coin,
            address: formData.address,
            addressname: formData.addressname,
            number: formData.number,
            code: formData.code,
            password: formData.password,
            google: formData.google,
            type: formData.type,
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
//获取提现额度
const getDayNumber = async coin => {
    try {
        let result = await Request(apiConfig.getdaynumber, {
            coin
        });
        let data = handelResult(result);
        return data.list[0];
    } catch (err) {
        console.log(err);
    }
};
//绑定银行卡
const bindBank = async formData => {
    try {
        let result = await Request(apiConfig.addbank, {
            bankcard: formData.bankcard,
            bank1: formData.bank1,
            bank2: formData.bank2,
            googlecode: formData.googlecode,
            password: formData.password
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
//获取充值记录
const getMyInputRecord = async coin => {
    try {
        let result = await Request(apiConfig.getmyputbycoin, { coin });
        let data = handelResult(result);
        return data.list;
    } catch (err) {
        console.log(err);
    }
}
//获取充值地址
const getRechargeAddr = async coin => {
    try {
        let result = await Request(apiConfig.getaddress, { coin });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err);
    }
};
//获取提现记录
const getmyrecharge = async () => {
    try {
        let result = await Request(apiConfig.getmyrecharge);
        let data = handelResult(result);
        return data.list;
    } catch (err) {
        console.log(err);
    }
};
//获取充值记录
const getmyput = async () => {
    try {
        let result = await Request(apiConfig.getmyput);
        let data = handelResult(result);
        return data.list;
    } catch (err) {
        console.log(err);
    }
};
//安全配置
const getsafe = async () => {
    try {
        let result = await Request(apiConfig.saftyState);
        let data = handelResult(result);
        if (data) return data.list[0];
    } catch (err) {
        console.log(err);
    }
};
//实名认证
const realname = async formData => {
    try {
        let result = await Request(apiConfig.realynanme, {
            cardzm: formData.cardzm,
            cardfm: formData.cardfm,
            cardsc: formData.cardsc,
            name: formData.name,
            cardnumber: formData.cardnumber
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
//修改登录密码
const updateloginpwd = async formData => {
    try {
        let result = await Request(apiConfig.updateloginpwd, {
            code: formData.code,
            password: formData.password,
            type: formData.type
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
//修改交易密码
const updatepaypassword = async formData => {
    try {
        let result = await Request(apiConfig.updatepaypassword, {
            type: formData.type,
            code: formData.code,
            password: formData.password,
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
//
//绑定邮箱
const bindEmail = async formData => {
    try {
        let result = await Request(apiConfig.bindemail, {
            code: formData.code,
            email: formData.email,
            password: formData.password
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
//获取谷歌密匙
const getGoogleKey = async () => {
    try {
        let result = await Request(apiConfig.getgooglekey);
        let data = handelResult(result);
        if (data) return data.result;
    } catch (err) {
        console.log(err);
    }
};
//绑定google
const bindGoogle = async formData => {
    try {
        let result = await Request(apiConfig.addgoogle, {
            googlekey: formData.googlekey,
            password: formData.password,
            googlecode: formData.googlecode
        });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err);
    }
};
//vip等级
const VipInfo = async () => {
    try {
        let result = await Request(apiConfig.vipinfo);
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
}
//安全日志
const safeLogs = async () => {
    try {
        let result = await Request(apiConfig.logsafe);
        let data = handelResult(result);
        return data.list;
    } catch (err) {
        console.log(err);
    }
};
//登录日志
const loginLogs = async () => {
    try {
        let result = await Request(apiConfig.loglogin);
        let data = handelResult(result);
        return data.list;
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
    myProperty,
    addAddress,
    getCoinRecharge,
    getRecordInfo,
    getAddress,
    deleteAddress,
    outCoin,
    getDayNumber,
    bindBank,
    getMyInputRecord,
    getRechargeAddr,
    getmyrecharge,
    getmyput,
    getsafe,
    realname,
    updateloginpwd,
    updatepaypassword,
    bindEmail,
    getGoogleKey,
    bindGoogle,
    VipInfo,
    safeLogs,
    loginLogs
}