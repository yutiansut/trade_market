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

// 获取可用
const getAvailable = async coinid => {
    try {
        if (Store.state.isLogin) {
            let result = await Request(apiConfig.getdaynumber, {
                coin: coinid
            });
            let data = handelResult(result);
            return data.list[0];
        }
    } catch (err) {
        console.log(err);
    }
};
// 当前委托
const currentEntrust = async (maincoinid, tradecoinid) => {
    try {
        if (Store.state.isLogin) {

            let result = await Request(apiConfig.getentrust, {
                maincoin: maincoinid,
                tradcoin: tradecoinid
            });
            let data = handelResult(result);
            return data.list;
        }
    } catch (err) {
        console.log(err);
    }
};
//历史委托
const entrustRecord = async (maincoinid, tradecoinid) => {
    try {
        if (Store.state.isLogin) {
            let result = await Request(apiConfig.gethistoryorder, {
                maincoin: maincoinid,
                tradcoin: tradecoinid
            });
            let data = handelResult(result);
            return data.list;
        }
    } catch (err) {
        console.log(err);
    }
};
// 获取币币交易币种行情
const getCoinInfo = async (maincoinid, tradecoinid) => {
    try {
        let result = await Request(apiConfig.searchcoin, {
            maincoin: maincoinid,
            tradcoin: tradecoinid,
            showLoading: false
        });
        let data = handelResult(result);
        if (data) return data.list[0];
    } catch (err) {
        console.log(err);
    }
};
//查看全站交易
const getAllTrade = async (maincoinid, tradecoinid) => {
    try {
        let result = await Request(apiConfig.gettoporder, {
            maincoin: maincoinid,
            tradcoin: tradecoinid
        });
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err);
    }
};
//买入五档图
const getBuyOrder = async (maincoinid, tradecoinid) => {
    try {
        let result = await Request(apiConfig.buyorder, {
            maincoin: maincoinid,
            tradcoin: tradecoinid,
            showLoading: false
        });
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err);
    }
};
//卖出五档图
const getSellOrder = async (maincoinid, tradecoinid) => {
    try {
        let result = await Request(apiConfig.sellorder, {
            maincoin: maincoinid,
            tradcoin: tradecoinid,
            showLoading: false
        });
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err);
    }
};
//买入卖出操作
const tradeHandle = async (api, params) => {
    try {
        if (!Store.state.isLogin) {
            Toast({
                message: "请先登录",
                position: "bottom"
            });
            return;
        };
        let result = await Request(api, {
            maincoin: params.maincoin,
            tradcoin: params.tradcoin,
            prise: params.price || params.prise,
            number: params.number
        });
        let data = handelResult(result);
        if (data) return data;
    } catch (err) {
        console.log(err);
    }
};
//撤单
const clearEntrust = async (id) => {
    try {
        let result = await Request(apiConfig.clearentrust, { id: id });
        let data = handelResult(result);
        if (data) {
            Toast({
                message: result.msg,
                position: "bottom"
            });
            return result;
        };
    } catch (err) {
        console.log(err)
    }
};
// 币种费率
const CoinFee = async () => {
    try {
        let result = await Request(apiConfig.gaslist);
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
};
export {
    getMainCoin,
    getTradeCoin,
    getAvailable,
    currentEntrust,
    entrustRecord,
    getCoinInfo,
    getAllTrade,
    getBuyOrder,
    getSellOrder,
    tradeHandle,
    clearEntrust,
    CoinFee
}