let apiCfg = (function () {
    return {
        baseURL: process.env.NODE_ENV === 'production' ? "https://admin.kmsjqm.cn/" : "http://192.168.16.180:8080/vik/",
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
            url: "api/common/getVersion.do",
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
            url: "api/customer/UnclaimedAward.do",
            method: "post"
        },
        //是否实名认证
        checkAuth: {
            url: "api/customer/checkAuth.do",
            method: "post"
        },
        //领取奖励
        getAward: {
            url: "api/customer/getAward.do",
            method: "post"
        },
        //反馈列表
        getFeedbackList: {
            url: "api/customer/getFeedbackList.do",
            method: "post"
        },
        //反馈类型
        getFeedbackType: {
            url: "api/customer/getFeedbackType.do",
            method: "post"
        },
        //修改个人信息
        modifyCustomerInfo: {
            url: "api/customer/modifyCustomerInfo.do",
            method: "post"
        },
        //实名认证
        pushAuth: {
            url: "api/customer/pushAuth.do",
            method: "post"
        },
        //提出反馈
        pushFeedback: {
            url: "api/customer/pushFeedback.do",
            method: "post"
        },
        //个人账户查询
        selectAccount: {
            url: "api/customer/selectAccount.do",
            method: "post"
        },
        //查询banner
        selectBanner: {
            url: "api/customer/selectBanner.do",
            method: "post"
        },
        //个人信息查询
        selectCustomer: {
            url: "api/customer/selectCustomer.do",
            method: "post"
        },
        //根据手机号查询用户
        selectCustomerByPhone: {
            url: "api/customer/selectCustomerByPhone.do",
            method: "post"
        },
        //我的圈友
        selectFriends: {
            url: "api/customer/selectFriends.do",
            method: "post"
        },
        //首页信息
        selectIndexView: {
            url: "api/customer/selectIndexView.do",
            method: "post"
        },
        //查询公告
        selectNotice: {
            url: "api/customer/selectNotice.do",
            method: "post"
        },
        //撤单
        cancleMyCoinTradeById: {
            url: "api/tradeCoin/cancleMyTradeById.do",
            method: "post"
        },
        //确认订单
        confirmMyCoinTrade: {
            url: "api/tradeCoin/confirmMyTrade.do",
            method: "post"
        },
        //匹配交易
        matchingCoinTrade: {
            url: "api/tradeCoin/matchingTrade.do",
            method: "post"
        },
        //上传交易凭证
        payMyCoinTrade: {
            url: "api/tradeCoin/payMyTrade.do",
            method: "post"
        },
        //发布交易信息
        pushCoinTradeInfo: {
            url: "api/tradeCoin/pushTradeInfo.do",
            method: "post"
        },
        //待交易列表
        selectMyCoinTrade: {
            url: "api/tradeCoin/selectMyTrade.do",
            method: "post"
        },
        //交易完成列表
        selectMyCoinTradeList: {
            url: "api/tradeCoin/selectMyTradeList.do",
            method: "post"
        },
        //交易中列表
        selectMyCoinTrading: {
            url: "api/tradeCoin/selectMyTrading.do",
            method: "post"
        },
        //交易大厅查询
        selectCoinTradeList: {
            url: "api/tradeCoin/selectTradeList.do",
            method: "post"
        },
        //撤单
        cancleMyConvertTradeById: {
            url: "api/convert/cancleMyTradeById.do",
            method: "post"
        },
        //确认交易
        confirmMyConvertTrade: {
            url: "api/convert/confirmMyTrade.do",
            method: "post"
        },
        // 链转余额
        doCoinToMoney: {
            url: "api/convert/doCoinToMoney.do",
            method: "post"
        },
        //余额转积分
        doMoneryToIntegral: {
            url: "api/convert/doMoneryToIntegral.do",
            method: "post"
        },
        //余额转链
        doMoneyToCoin: {
            url: "api/convert/doMoneyToCoin.do",
            method: "post"
        },
        //匹配转账
        matchTransferAccount: {
            url: "api/convert/matchTransferAccount.do",
            method: "post"
        },
        //上传交易凭证
        payMyConvertTrade: {
            url: "api/convert/payMyTrade.do",
            method: "post"
        },
        //转化记录
        selectConvert: {
            url: "api/convert/selectConvert.do",
            method: "post"
        },
        //转账中
        selectConvertTrading: {
            url: "api/convert/selectConvertTrading.do",
            method: "post"
        },
        //收支流水
        selectCustomerProfit: {
            url: "api/convert/selectCustomerProfit.do",
            method: "post"
        },
        //交易顶部数据
        selectIndexData: {
            url: "api/convert/selectIndexData.do",
            method: "post"
        },
        //交易完成列表
        selectMyConvertTradeList: {
            url: "api/convert/selectMyTradeList.do",
            method: "post"
        },
        tradeByQRCode: {
            url: "api/convert/tradeByQRCode.do",
            method: "post"
        },
        //撤单
        cancleMyMoneyTradeById: {
            url: "api/tradeMoney/cancleMyTradeById.do",
            method: "post"
        },
        // 确认订单
        confirmMyMoneyTrade: {
            url: "api/tradeMoney/confirmMyTrade.do",
            method: "post"
        },
        //匹配交易
        matchingMoneyTrade: {
            url: "api/tradeMoney/matchingTrade.do",
            method: "post"
        },
        //上传交易凭证
        payMyMoneyTrade: {
            url: "api/tradeMoney/payMyTrade.do",
            method: "post"
        },
        //发布交易信息
        pushMoneyTradeInfo: {
            url: "api/tradeMoney/pushTradeInfo.do",
            method: "post"
        },
        //待交易列表
        selectMyMoneyTrade: {
            url: "api/tradeMoney/selectMyTrade.do",
            method: "post"
        },
        //交易完成列表
        selectMyMoneyTradeList: {
            url: "api/tradeMoney/selectMyTradeList.do",
            method: "post"
        },
        //交易中列表
        selectMyMoneyTrading: {
            url: "api/tradeMoney/selectMyTrading.do",
            method: "post"
        },
        //交易大厅查询
        selectMoneyTradeList: {
            url: "api/tradeMoney/selectTradeList.do",
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