import {
    getUserInfo,
    checkLogin,
    Register,
    Login,
    Logout,
    resetPassword,
    sendCode
} from './userService';
import {
    getNewsList,
    getCoinProfile,
    getHelpCenter,
    getWorkOrder
} from './articleService';
import { getIndexBanner } from './assetService';
import {
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
} from './coinService';
export {
    getNewsList,
    getCoinProfile,
    getUserInfo,
    getHelpCenter,
    getWorkOrder,
    getIndexBanner,
    getMainCoin,
    getTradeCoin,
    getAvailable,
    Login,
    Logout,
    checkLogin,
    resetPassword,
    Register,
    sendCode,
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