let apiCfg = (function () {
    return {
        baseURL: process.env.NODE_ENV === 'production' ? "https://admin.kmsjqm.cn/" : "http://192.168.16.180:8080/vik",
        // 二维码路径
        qrUrl: 'https://www.kmsjqm.cn/',
        //登录
        login: {
            url: 'api/common/login.do',
            method: 'post'
        },
        //发送验证码
        getSmsCode: {
            url: 'api/common/getSmsCode.do',
            method: 'post'
        },
        //注册
        register: {
            url: 'api/common/registerUser.do',
            method: 'post'
        },
        // app版本
        getVersion: {
            url: "api/common/getVersion",
            method: "post"
        },
        //忘记密码
        forgetPassword: {
            url: 'api/common/forgetPass.do',
            method: 'post'
        },
        //修改头像
        modifyCustomerHead: {
            url: 'api/common/modifyCustomerHead.do',
            method: 'post'
        },
        //待领取奖励
        UnclaimedAward: {
            url: "api/customer/UnclaimedAward",
            method: "post"
        },
        //是否实名认证
        checkAuth: {
            url: "api/customer/checkAuth",
            method: "post"
        },
        //领取奖励
        getAward: {
            url: "api/customer/getAward",
            method: "post"
        },
        //反馈列表
        getFeedbackList: {
            url: "api/customer/getFeedbackList",
            method: "post"
        },
        //反馈类型
        getFeedbackType: {
            url: "api/customer/getFeedbackType",
            method: "post"
        },
        //修改个人信息
        modifyCustomerInfo: {
            url: "api/customer/modifyCustomerInfo",
            method: "post"
        },
        //实名认证
        pushAuth: {
            url: "api/customer/pushAuth",
            method: "post"
        },
        //提出反馈
        pushFeedback: {
            url: "api/customer/pushFeedback",
            method: "post"
        },
        //个人账户查询
        selectAccount: {
            url: "api/customer/selectAccount",
            method: "post"
        },
        //查询banner
        selectBanner: {
            url: "api/customer/selectBanner",
            method: "post"
        },
        //个人信息查询
        selectCustomer: {
            url: "api/customer/selectCustomer",
            method: "post"
        },
        //根据手机号查询用户
        selectCustomerByPhone: {
            url: "api/customer/selectCustomerByPhone",
            method: "post"
        },
        //我的圈友
        selectFriends: {
            url: "api/customer/selectFriends",
            method: "post"
        },
        //首页信息
        selectIndexView: {
            url: "api/customer/selectIndexView",
            method: "post"
        },
        //查询公告
        selectNotice: {
            url: "api/customer/selectNotice",
            method: "post"
        },
        //撤单
        cancleMyCoinTradeById: {
            url: "api/tradeCoin/cancleMyTradeById",
            method: "post"
        },
        //确认订单
        confirmMyCoinTrade: {
            url: "api/tradeCoin/confirmMyTrade",
            method: "post"
        },
        //匹配交易
        matchingCoinTrade: {
            url: "api/tradeCoin/matchingTrade",
            method: "post"
        },
        //上传交易凭证
        payMyCoinTrade: {
            url: "api/tradeCoin/payMyTrade",
            method: "post"
        },
        //发布交易信息
        pushCoinTradeInfo: {
            url: "api/tradeCoin/pushTradeInfo",
            method: "post"
        },
        //待交易列表
        selectMyCoinTrade: {
            url: "api/tradeCoin/selectMyTrade",
            method: "post"
        },
        //交易完成列表
        selectMyCoinTradeList: {
            url: "api/tradeCoin/selectMyTradeList",
            method: "post"
        },
        //交易中列表
        selectMyCoinTrading: {
            url: "api/tradeCoin/selectMyTrading",
            method: "post"
        },
        //交易大厅查询
        selectCoinTradeList: {
            url: "api/tradeCoin/selectTradeList",
            method: "post"
        },
        //撤单
        cancleMyConvertTradeById: {
            url: "api/convert/cancleMyTradeById",
            method: "post"
        },
        //确认交易
        confirmMyConvertTrade: {
            url: "api/convert/confirmMyTrade",
            method: "post"
        },
        // 链转余额
        doCoinToMoney: {
            url: "api/convert/doCoinToMoney",
            method: "post"
        },
        //余额转积分
        doMoneryToIntegral: {
            url: "api/convert/doMoneryToIntegral",
            method: "post"
        },
        //余额转链
        doMoneyToCoin: {
            url: "api/convert/doMoneyToCoin",
            method: "post"
        },
        //匹配转账
        matchTransferAccount: {
            url: "api/convert/matchTransferAccount",
            method: "post"
        },
        //上传交易凭证
        payMyConvertTrade: {
            url: "api/convert/payMyTrade",
            method: "post"
        },
        //转化记录
        selectConvert: {
            url: "api/convert/selectConvert",
            method: "post"
        },
        //转账中
        selectConvertTrading: {
            url: "api/convert/selectConvertTrading",
            method: "post"
        },
        //收支流水
        selectCustomerProfit: {
            url: "api/convert/selectCustomerProfit",
            method: "post"
        },
        //交易顶部数据
        selectIndexData: {
            url: "api/convert/selectIndexData",
            method: "post"
        },
        //交易完成列表
        selectMyConvertTradeList: {
            url: "api/convert/selectMyTradeList",
            method: "post"
        },
        tradeByQRCode: {
            url: "api/convert/tradeByQRCode",
            method: "post"
        },
        //撤单
        cancleMyMoneyTradeById: {
            url: "api/tradeMoney/cancleMyTradeById",
            method: "post"
        },
        // 确认订单
        confirmMyMoneyTrade: {
            url: "api/tradeMoney/confirmMyTrade",
            method: "post"
        },
        //匹配交易
        matchingMoneyTrade: {
            url: "api/tradeMoney/matchingTrade",
            method: "post"
        },
        //上传交易凭证
        payMyMoneyTrade: {
            url: "api/tradeMoney/payMyTrade",
            method: "post"
        },
        //发布交易信息
        pushMoneyTradeInfo: {
            url: "api/tradeMoney/pushTradeInfo",
            method: "post"
        },
        //待交易列表
        selectMyMoneyTrade: {
            url: "api/tradeMoney/selectMyTrade",
            method: "post"
        },
        //交易完成列表
        selectMyMoneyTradeList: {
            url: "api/tradeMoney/selectMyTradeList",
            method: "post"
        },
        //交易中列表
        selectMyMoneyTrading: {
            url: "api/tradeMoney/selectMyTrading",
            method: "post"
        },
        //待交易列表
        selectMyMoneyTrade: {
            url: "api/tradeMoney/selectMyTrade",
            method: "post"
        },
        //交易大厅查询
        selectMoneyTradeList: {
            url: "api/tradeMoney/selectTradeList",
            method: "post"
        },
        /**
         * 购物车接口
         */
        // 添加购物车 
        addCustomerCar: {
            url: 'api/customerCar/addCustomerCar.do',
            method: 'post'
        },
        // 编辑购物车 
        modifyCustomerCar: {
            url: 'api/customerCar/modifyCustomerCar.do',
            method: 'post'
        },
        // 删除购物车 
        delCustomerCar: {
            url: 'api/customerCar/delCustomerCar.do',
            method: 'post'
        },
        // 批量删除购物车 
        delMoreCustomerCar: {
            url: 'api/customerCar/delMoreCustomerCar.do',
            method: 'post'
        },
        // 我的购物车 
        selectCustomerCar: {
            url: 'api/customerCar/selectCustomerCar.do',
            method: 'post'
        },
        // 查询购物车数量接口 
        selectCustomerCarNum: {
            url: 'api/customerCar/selectCustomerCarNum.do',
            method: 'post'
        }
    }
}());

export default apiCfg;