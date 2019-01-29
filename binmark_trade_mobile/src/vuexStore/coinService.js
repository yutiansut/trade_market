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
//折线图首页
const getChart = async (maincoin, tradcoin) => {
    try {
        let result = await Request(apiConfig.chart, { coin: `${tradcoin}_${maincoin}` });
        let data = handelResult(result);
        return data;
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
            if (data) return data.list;
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
        if (data) return result;
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
//获取c2c交易币种
const getc2cCoin = async () => {
    try {
        let result = await Request(apiConfig.getc2ccoin, { showLoading: false });
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
};
// 根据币种和交易类型获取c2c市场挂单
const getc2cOrderByType = async (coin, type) => {
    try {
        let result = await Request(apiConfig.getc2callorderbytype, {
            coin: coin,
            type: type
        });
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
};
//获取c2c历史交易订单
const getc2cHistory = async () => {
    try {
        let result = await Request(apiConfig.getc2chistory);
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
};
//获取c2c已匹配订单
const getMyc2cTrade = async () => {
    try {
        let result = await Request(apiConfig.getmyc2ctrad);
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
};
//发布买入
const addBuy = async (coin, price, number) => {
    try {
        let result = await Request(apiConfig.addbuyc2c, {
            coin: coin,
            price: price,
            number: number
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
        console.log(err)
    }
};
//发布卖出
const addSell = async (coin, price, number) => {
    try {
        let result = await Request(apiConfig.addsellc2c, {
            coin: coin,
            price: price,
            number: number
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
        console.log(err)
    }
};
//从市场买入c2c订单
const buyC2cCoin = async autoid => {
    try {
        let result = await Request(apiConfig.c2cbuytrad, {
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
        console.log(err)
    }
};
//从市场卖出c2c订单
const sellC2cCoin = async autoid => {
    try {
        let result = await Request(apiConfig.c2cselltrad, {
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
        console.log(err)
    }
}
//我发布的订单
const getPublishedOrder = async () => {
    try {
        let result = await Request(apiConfig.getc2corder);
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
};
//确认已打款
const confirmPayment = async (autoid) => {
    try {
        let result = await Request(apiConfig.setsendok, {
            autoid: autoid
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
        console.log(err)
    }
};
//确认收款
const confirmReceivePayment = async (autoid) => {
    try {
        let result = await Request(apiConfig.setrealyok, {
            autoid: autoid
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
        console.log(err)
    }
};
//撤销c2c订单
const cancelc2cOrder = async (autoid) => {
    try {
        let result = await Request(apiConfig.clearc2c, {
            autoid: autoid
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
        console.log(err)
    }
};
// OTc币种
const getOTCCoin = async () => {
    try {
        let result = await Request(apiConfig.getotccoin);
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
}
//otc卖出
const otcSell = async (coin, number, total) => {
    try {
        let result = await Request(apiConfig.otcsell, {
            coin: coin,
            number: number,
            total: total
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
        console.log(err)
    }
};
//otc买入
const otcBuy = async formData => {
    try {
        let result = await Request(apiConfig.otcbuy, {
            coin: formData.coin,
            number: formData.number,
            jz: formData.jz,
            id: formData.id,
            bz: formData.bz
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
        console.log(err)
    }
};
//获取otc委托记录
const getOTCOrder = async () => {
    try {
        let result = await Request(apiConfig.getotcorder);
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
};
//根据交易类型获取otc委托记录
const getOtcOrderByType = async (coin, type) => {
    try {
        let result = await Request(apiConfig.getotcorderbycoin, {
            coin: coin,
            type: type
        });
        let data = handelResult(result);
        if (data) return data.list;
    } catch (err) {
        console.log(err)
    }
};
//获取打款账号
const getOtcBank = async () => {
    try {
        let result = await Request(apiConfig.getotcbank);
        let data = handelResult(result);
        if (data.list) return data.list[0];
    } catch (err) {
        console.log(err)
    }
};
//获取所有币种
const getAllCoin = async () => {
    try {
        let result = await Request(apiConfig.allcoin);
        let data = handelResult(result);
        if (data.list) return data.list;
    } catch (err) {
        console.log(err)
    }
}
export {
    getMainCoin,
    getChart,
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
    CoinFee,
    getc2cCoin,
    getc2cOrderByType,
    getMyc2cTrade,
    getc2cHistory,
    addBuy,
    addSell,
    buyC2cCoin,
    sellC2cCoin,
    getPublishedOrder,
    confirmPayment,
    confirmReceivePayment,
    cancelc2cOrder,
    getOTCCoin,
    otcSell,
    otcBuy,
    getOTCOrder,
    getOtcOrderByType,
    getOtcBank,
    getAllCoin
}