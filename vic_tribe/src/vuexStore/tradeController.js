import Request from '../assets/js/request';
import apiConfig from '../config/apiConfig';
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
/**
 * Coin trade 交易
 */
// 撤销订单
const cancleMyCoinTradeById = id => {
    try {
        let result = await Request(apiConfig.cancleMyCoinTradeById, { id });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};

//确认订单confirmMyCoinTrade
const confirmMyCoinTrade = id => {
    try {
        let result = await Request(apiConfig.confirmMyCoinTrade, { id });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//匹配交易matchingCoinTrade
const matchingCoinTrade = (id, payPass) => {
    try {
        let result = await Request(apiConfig.matchingCoinTrade, { id, payPass });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
// 上传凭证payMyCoinTrade
const payMyCoinTrade = (id, files) => {
    try {
        let result = await Request(apiConfig.payMyCoinTrade, { id, files });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//发布交易信息pushCoinTradeInfo
const pushCoinTradeInfo = (tradeType, tradePrice, moneyNum, payPass) => {
    try {
        let result = await Request(apiConfig.pushCoinTradeInfo, { tradeType, tradePrice, moneyNum, payPass });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//待交易列表selectMyCoinTrade
const selectMyCoinTrade = Type => {
    try {
        let result = await Request(apiConfig.selectMyCoinTrade, { Type });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//交易完成列表
const selectMyCoinTradeList = (pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectMyCoinTradeList, { pageNo, pageSize });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//交易中的列表selectMyCoinTrading
const selectMyCoinTrading = () => {
    try {
        let result = await Request(apiConfig.selectMyCoinTrading);
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//交易大厅查询selectCoinTradeList
const selectCoinTradeList = (tradeType, searchName, pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectCoinTradeList, {
            tradeType,
            searchName,
            pageNo,
            pageSize
        });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
export {
    cancleMyCoinTradeById,
    confirmMyCoinTrade,
    matchingCoinTrade,
    payMyCoinTrade,
    pushCoinTradeInfo,
    selectMyCoinTrade,
    selectMyCoinTradeList,
    selectMyCoinTrading,
    selectCoinTradeList
}