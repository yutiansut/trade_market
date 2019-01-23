import {
    getUserInfo,
    checkLogin,
    Register,
    Login,
    Logout,
    resetPassword,
    sendCode
} from './userService';
import { getNewsList } from './articleService';
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
    tradeHandle
} from './coinService';
export {
    getNewsList,
    getUserInfo,
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
    tradeHandle
}