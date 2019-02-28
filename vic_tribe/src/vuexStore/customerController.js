import Request from '../assets/js/request';
import apiConfig from '../config/apiConfig';
import { Toast } from "vant";
import Store from './store';
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
//忘记密码POST /api/customer/UnclaimedAward
const UnclaimedAward = async () => {
    try {
        let result = await Request(apiConfig.UnclaimedAward);
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//实名认证
const checkAuth = async () => {
    try {
        let result = await Request(apiConfig.checkAuth);
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//领取奖励
const getAward = async id => {
    try {
        let result = await Request(apiConfig.getAward, { id });
        let data = handelResult(result);
        if (data) {
            Toast.success(data.msg);
            return data
        };
    } catch (err) {
        console.log(err)
    }
};
//反馈列表getFeedbackList
const getFeedbackList = async () => {
    try {
        let result = await Request(apiConfig.getFeedbackList);
        let data = handelResult(result);
        if (data) {
            return data;
        }
    } catch (err) {
        console.log(err)
    }
};
//反馈类型
const getFeedbackType = async () => {
    try {
        let result = await Request(apiConfig.getFeedbackType);
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//修改个人信息
const modifyCustomerInfo = async (bankAddress, bankInfo, trueName, customerCard, bankName, bankCard) => {
    try {
        let result = await Request(apiConfig.modifyCustomerInfo, {
            bankAddress,
            bankInfo,
            trueName,
            customerCard,
            bankName,
            bankCard
        });
        let data = handelResult(result);
        if (data) { Toast(data.msg); return data };
    } catch (err) {
        console.log(err)
    }
};
//实名认证pushAuth
const pushAuth = async (trueName, customerCard, bankName, bankCard) => {
    try {
        let result = await Request(apiConfig.pushAuth, {
            trueName,
            customerCard,
            bankName,
            bankCard
        });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//发布反馈
const pushFeedback = async (type, context) => {
    try {
        let result = await Request(apiConfig.pushFeedback, {
            type,
            context
        });
        handelResult(result);
        if (result.code == 0) Toast(result.msg);
        return result;
    } catch (err) {
        console.log(err)
    }
};
//个人账户查询
const selectAccount = async () => {
    if (isEmptyObject(Store.state.accountInfo)) {
        try {
            let result = await Request(apiConfig.selectAccount);
            let data = handelResult(result);
            if (data) {
                Store.dispatch("getAccountInfo", data)
                return data;
            };
        } catch (err) {
            console.log(err)
        }
    }
};
//查询banner @type 1 首页 2 商城
const selectBanner = async type => {
    try {
        let result = await Request(apiConfig.selectBanner, { type });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//查询个人信息selectCustomer
const selectCustomer = async () => {
    if (isEmptyObject(Store.state.userInfo)) {
        try {
            let result = await Request(apiConfig.selectCustomer);
            let data = handelResult(result);
            if (data) {
                Store.dispatch('updateUserInfo', data);
                return data;
            };
        } catch (err) {
            console.log(err)
        }
    }

};
//根据手机号查找用户
const selectCustomerByPhone = async id => {
    try {
        let result = await Request(apiConfig.selectCustomerByPhone, { id });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//我的圈友
const selectFriends = async (pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectFriends, {
            pageNo,
            pageSize
        });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//首页信息
const selectIndexView = async () => {
    try {
        let result = await Request(apiConfig.selectIndexView);
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//公告列表
const selectNotice = async (type, pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectNotice, { type, pageNo, pageSize });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
export {
    UnclaimedAward,
    checkAuth,
    getAward,
    getFeedbackList,
    getFeedbackType,
    modifyCustomerInfo,
    pushAuth,
    pushFeedback,
    selectAccount,
    selectBanner,
    selectCustomer,
    selectCustomerByPhone,
    selectFriends,
    selectIndexView,
    selectNotice
}