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
const cancleMyCoinTradeById = async id => {
    try {
        let result = await Request(apiConfig.cancleMyCoinTradeById, { id });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};

//确认订单confirmMyCoinTrade
const confirmMyCoinTrade = async id => {
    try {
        let result = await Request(apiConfig.confirmMyCoinTrade, { id });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//匹配交易matchingCoinTrade
const matchingCoinTrade = async (id, payPass) => {
    try {
        let result = await Request(apiConfig.matchingCoinTrade, { id, payPass });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
// 上传凭证payMyCoinTrade
const payMyCoinTrade = async (id, files) => {
    try {
        let result = await Request(apiConfig.payMyCoinTrade, { id, files });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//发布交易信息pushCoinTradeInfo
const pushCoinTradeInfo = async (tradeType, tradePrice, moneyNum, payPass) => {
    try {
        let result = await Request(apiConfig.pushCoinTradeInfo, { tradeType, tradePrice, moneyNum, payPass });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//待交易列表selectMyCoinTrade
const selectMyCoinTrade = async Type => {
    try {
        let result = await Request(apiConfig.selectMyCoinTrade, { Type });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//交易完成列表
const selectMyCoinTradeList = async (pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectMyCoinTradeList, { pageNo, pageSize });
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//交易中的列表selectMyCoinTrading
const selectMyCoinTrading = async () => {
    try {
        let result = await Request(apiConfig.selectMyCoinTrading);
        let data = handelResult(result);
        if (data) { return data };
    } catch (err) {
        console.log(err)
    }
};
//交易大厅查询selectCoinTradeList
const selectCoinTradeList = async (tradeType, searchName, pageNo, pageSize) => {
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
//撤单cancleMyConvertTradeById
const cancleMyConvertTradeById = async id => {
    try {
        let result = await Request(apiConfig.cancleMyConvertTradeById, {
            id
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//确认交易confirmMyConvertTrade
const confirmMyConvertTrade = async id => {
    try {
        let result = await Request(apiConfig.confirmMyConvertTrade, {
            id
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//链转余额doCoinToMoney
const doCoinToMoney = async (moneyNum, payPass) => {
    try {
        let result = await Request(apiConfig.doCoinToMoney, {
            moneyNum,
            payPass
        });
        let data = handelResult(result);
        if (data || result.code == 0) {
            Toast.success(result.msg);
            return result;
        };
    } catch (err) {
        console.log(err)
    }
};
//余额转积分
const doMoneryToIntegral = async (moneyNum, payPass) => {
    try {
        let result = await Request(apiConfig.doMoneryToIntegral, {
            moneyNum,
            payPass
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//余额转链doMoneyToCoin
const doMoneyToCoin = async (moneyNum, payPass) => {
    try {
        let result = await Request(apiConfig.doMoneyToCoin, {
            moneyNum,
            payPass
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//余额转其他货币
const doMoneyConvert = async (moneyNum, payPass, type) => {
    try {
        let result = await Request(apiConfig.doMoneyToCoin, {
            moneyNum,
            payPass,
            type
        });
        let data = handelResult(result);
        if (data || result.code == 0) {
            Toast.success(result.msg);
            return result;
        };
    } catch (err) {
        console.log(err)
    }
};
//匹配转账matchTransferAccount
const matchTransferAccount = async (moneyNum, targetPhone, payPass) => {
    try {
        let result = await Request(apiConfig.matchTransferAccount, {
            moneyNum,
            targetPhone,
            payPass
        });
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//上传交易凭证payMyConvertTrade
const payMyConvertTrade = async (id, files) => {
    try {
        let result = await Request(apiConfig.matchTransferAccount, {
            id,
            files
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//转化记录selectConvert
const selectConvert = async (pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectConvert, {
            pageNo,
            pageSize
        });
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//转账中 selectConvertTrading
const selectConvertTrading = async () => {
    try {
        let result = await Request(apiConfig.selectConvertTrading);
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//收支流水 selectCustomerProfit
const selectCustomerProfit = async (type, pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectCustomerProfit, {
            type,
            pageNo,
            pageSize
        });
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//交易顶部数据selectIndexData
const selectIndexData = async () => {
    try {
        let result = await Request(apiConfig.selectIndexData);
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//交易完成列表selectMyConvertTradeList
const selectMyConvertTradeList = async (pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectMyConvertTradeList, {
            pageNo, pageSize
        });
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
const tradeByQRCode = async (moneyNum, targetPhone, payPass) => {
    try {
        let result = await Request(apiConfig.tradeByQRCode, {
            moneyNum,
            targetPhone,
            payPass
        });
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
/**
 * 货币交易
 */
//撤单 cancleMyMoneyTradeById
const cancleMyMoneyTradeById = async id => {
    try {
        let result = await Request(apiConfig.cancleMyMoneyTradeById, {
            id
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//确认订单 confirmMyMoneyTrade
const confirmMyMoneyTrade = async id => {
    try {
        let result = await Request(apiConfig.confirmMyMoneyTrade, {
            id
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//匹配交易matchingMoneyTrade
const matchingMoneyTrade = async (id, payPass) => {
    try {
        let result = await Request(apiConfig.matchingMoneyTrade, {
            id,
            payPass
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//上传交易凭证payMyMoneyTrade
const payMyMoneyTrade = async (id, files) => {
    try {
        let result = await Request(apiConfig.payMyMoneyTrade, {
            id,
            files
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//发布交易信息pushMoneyTradeInfo
const pushMoneyTradeInfo = async (tradeType, tradePrice, moneyNum, payPass) => {
    try {
        let result = await Request(apiConfig.pushMoneyTradeInfo, {
            tradeType,
            tradePrice,
            moneyNum,
            payPass
        });
        let data = handelResult(result);
        if (data) {
            Toast.success(result.msg);
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//待交易列表selectMyMoneyTrade
const selectMyMoneyTrade = async Type => {
    try {
        let result = await Request(apiConfig.selectMyMoneyTrade, {
            Type
        });
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//交易完成列表
const selectMyMoneyTradeList = async (pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectMyMoneyTradeList, {
            pageNo,
            pageSize
        });
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//交易中列表selectMyMoneyTrading
const selectMyMoneyTrading = async () => {
    try {
        let result = await Request(apiConfig.selectMyMoneyTrading);
        let data = handelResult(result);
        if (data) {
            return data;
        };
    } catch (err) {
        console.log(err)
    }
};
//交易大厅selectMoneyTradeList
const selectMoneyTradeList = async (tradeType, searchName, pageNo, pageSize) => {
    try {
        let result = await Request(apiConfig.selectMoneyTradeList, {
            tradeType,
            searchName,
            pageNo,
            pageSize
        });
        let data = handelResult(result);
        if (data) {
            return data;
        };
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
    selectCoinTradeList,
    cancleMyConvertTradeById,
    confirmMyConvertTrade,
    doCoinToMoney,
    doMoneryToIntegral,
    doMoneyConvert,
    doMoneyToCoin,
    matchTransferAccount,
    payMyConvertTrade,
    selectConvert,
    selectConvertTrading,
    selectCustomerProfit,
    selectIndexData,
    selectMyConvertTradeList,
    tradeByQRCode,
    cancleMyMoneyTradeById,
    confirmMyMoneyTrade,
    matchingMoneyTrade,
    payMyMoneyTrade,
    pushMoneyTradeInfo,
    selectMyMoneyTrade,
    selectMyMoneyTradeList,
    selectMyMoneyTrading,
    selectMoneyTradeList
}