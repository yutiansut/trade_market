import Request from '../assets/js/request';
import apiConfig from '../config/apiConfig';
import Store from '../vuexStore/store';
import { Toast } from 'vant';
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
//币种资料
const getCoinProfile = async () => {
    try {
        if (Store.state.coinInfo.length > 0) return;
        let result = await Request(apiConfig.getcoininfo);
        let data = handelResult(result);
        Store.dispatch('getCoinIntro', data.list);
    } catch (err) {
        console.log(err)
    }
}
// 获取帮助中心
const getHelpCenter = async () => {
    try {
        let result = await Request(apiConfig.getquest);
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
}
//获取工单记录
const getWorkOrder = async () => {
    try {
        let result = await Request(apiConfig.gethisorder);
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
}
//提交工单
const SubmitWorkOrder = async (type, title, url) => {
    try {
        let result = await Request(apiConfig.addorder, {
            type, title, url
        });
        let data = handelResult(result);
        if (data) {
            Toast(`${result.msg}`);
            return result;
        };
    } catch (err) {
        console.log(err)
    }
}
export {
    getNewsList,
    getCoinProfile,
    getHelpCenter,
    getWorkOrder,
    SubmitWorkOrder
}