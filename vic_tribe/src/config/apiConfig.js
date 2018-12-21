let apiCfg = (function () {
    return {
        baseURL: process.env.NODE_ENV === 'production' ? "https://admin.kmsjqm.cn/" : "http://192.168.5.138:3000/",
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
        //忘记密码
        forgetPassword: {
            url: 'api/common/forgetPass.do',
            method: 'post'
        },
        //验证token是否失效
        checkToken: {
            url: 'api/common/checkTokenExist.do',
            method: 'post'
        },
        //修改头像
        modifyCustomerHead: {
            url: 'api/common/modifyCustomerHead.do',
            method: 'post'
        },

        //查询个人信息
        selectMyCustomerInfo: {
            url: 'api/customer/selectMyCustomerInfo.do',
            method: 'post'
        },

        //查询银行卡列表
        selectMyBankCard: {
            url: 'api/customer/selectMyBankCard.do',
            method: 'post'
        },
        //添加银行卡
        pushBankCard: {
            url: 'api/customer/pushBankCard.do',
            method: 'post'
        },
        //删除银行卡
        deleteMyBankCard: {
            url: 'api/customer/deleteMyBankCard.do',
            method: 'post'
        },
        //设置默认银行卡
        setBankCardFlag: {
            url: 'api/customer/setBankCardFlag.do',
            method: 'post'
        },

        //首页数据
        selectIndexView: {
            url: "api/customer/selectIndexView.do",
            method: "post"
        },
        selectIndexData: {
            url: 'api/convert/selectIndexData.do',
            method: 'post'
        },

        //官方资讯
        selectNotice: {
            url: "api/customer/selectNotice.do",
            method: "post"
        },
        //查询banner
        selectBanner: {
            url: "api/customer/selectBanner.do",
            method: "post"
        },
        //消息列表
        selectMessageList: {
            url: "api/customer/selectMessageList.do",
            method: "post"
        },


        //签到
        customerSign: {
            url: 'api/customer/sign.do',
            method: 'post'
        },
        modifyCustomerInfo: {
            url: 'api/customer/modifyCustomerInfo.do',
            method: 'post'
        },
        //修改登录密码
        changeLoginPwd: {
            url: "api/common/modifyLoginPass.do",
            method: "post"
        },
        //修改支付密码
        changePayPwd: {
            url: "api/common/modifyPayPass.do",
            method: "post"
        },
        selectMyFans: {
            url: "api/customer/selectMyFans.do",
            method: "post"
        },
        //我的圈友个人信息
        selectSybCustomer: {
            url: '/api/customer/selectSybCustomer.do',
            method: 'post'
        },
        //我的圈友列表
        selectCustomerList: {
            url: '/api/customer/selectDirectCustomerList.do',
            method: 'post'
        },
        getFeedbackType: {
            url: 'api/customer/getFeedbackType.do',
            method: 'post'
        },
        //意见反馈
        pushCustomerFeedback: {
            url: 'api/customer/pushCustomerFeedback.do',
            method: 'post'
        },
        //问题列表
        getCustomerFeedbackList: {
            url: 'api/customer/getFeedbackList.do',
            method: 'post'
        },

        //查询转出账户信息
        selectCustomerByPhone: {
            url: "api/customer/selectCustomerByPhone.do",
            method: "post"
        },
        //收支流水记录
        selectProfit: {
            url: "api/convert/selectProfit.do",
            method: "post"
        },
        //资产转换
        moneyToRegiter: {
            url: "api/convert/moneyToRegiter.do",
            method: "post"
        },
        //转换记录
        selectConvert: {
            url: "api/convert/selectConvert.do",
            method: "post"
        },
        //提现
        applyCash: {
            url: "api/convert/applyCash.do",
            method: "post"
        },
        //查询提现记录
        selectCash: {
            url: "api/convert/selectCash.do",
            method: "post"
        },


        // 上传多张图片 
        uploadImages: {
            url: 'api/common/uploadImages.do',
            method: 'post'
        },
        // base64文件上传 
        uploadImagesByBase64: {
            url: 'api/common/uploadImagesByBase64.do',
            method: 'post'
        },
        // 首页模块 
        selectIndexProduct: {
            url: 'api/mall/selectIndexProduct.do',
            method: 'post'
        },
        // 添加/修改收获地址
        saveMallCustomerAddress: {
            url: 'api/mall/saveMallCustomerAddress.do',
            method: 'post'
        },
        // 查询所有收货地址
        selectMallCustomerAddressList: {
            url: 'api/mall/selectMallCustomerAddressList.do',
            method: 'post'
        },
        // 删除收获地址
        delMallCustomerAddress: {
            url: 'api/mall/delMallCustomerAddress.do',
            method: 'post'
        },
        // 设置默认地址
        setDefultAdress: {
            url: 'api/mall/setDefultAdress.do',
            method: 'post'
        },
        // 我的收藏列表
        selectMyCollection: {
            url: 'api/mall/selectMyCollection.do',
            method: 'post'
        },
        // 收藏/取消收藏
        modifyMyCollection: {
            url: 'api/mall/modifyMyCollection.do',
            method: 'post'
        },
        // 批量收藏 
        batchMyCollection: {
            url: 'api/mall/batchMyCollection.do',
            method: 'post'
        },
        // 查询订单
        selectMyOrder: {
            url: 'api/order/selectMyOrder.do',
            method: 'post'
        },
        // 评价
        pushProductComment: {
            url: 'api/mall/pushProductComment.do',
            method: 'post'
        },
        // 查询商品分类
        selectProductClassifyList: {
            url: 'api/mall/selectProductClassifyList.do',
            method: 'post'
        },
        // 查询全部分类产品
        getClassifyProduct: {
            url: 'api/mall/getClassifyProduct.do',
            method: 'post'
        },

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
        },
        // 查询商品列表
        selectMallProductList: {
            url: 'api/mall/selectMallProductList.do',
            method: 'post'
        },
        getProductCategory: {
            url: 'api/mall/getProductCategory.do',
            method: 'post'
        },


        // 商品详情
        selectProductDetail: {
            url: 'api/mall/selectProductDetail.do',
            method: 'post'
        },


        // 确认收货
        confirmOrder: {
            url: 'api/order/confirmOrder.do',
            method: 'post'
        },
        // 取消订单
        cancelOrderInfo: {
            url: 'api/order/cancelOrderInfo.do',
            method: 'post'
        },
        // 删除订单
        delOrderInfo: {
            url: 'api/order/delOrderInfo.do',
            method: 'post'
        },
        // 根据订单获取物流信息
        selectLogisticsInfo: {
            url: 'api/order/selectLogisticsInfo.do',
            method: 'post'
        },
        // 商品评价列表
        selectProductCommentList: {
            url: 'api/mall/selectProductCommentList.do',
            method: 'post'
        },
        // 订单支付
        payMyOrder: {
            url: 'api/order/payMyOrder.do',
            method: 'post'
        },


        // 构建订单号
        buildOrderInfo: {
            url: 'api/order/buildOrderInfo.do',
            method: 'post'
        },
        // 构建订单号(购物车)
        buildOrderInfoByCars: {
            url: 'api/order/buildOrderInfoByCars.do',
            method: 'post'
        },
        // 创建订单 
        createOrderInfo: {
            url: 'api/order/createOrderInfo.do',
            method: 'post'
        },

        //游戏接口
        //--转盘信息
        getRewardTurntable: {
            url: "api/customer/getRewardTurntable.do",
            method: "post"
        },
        //中奖参数
        getRewardNum: {
            url: "api/customer/getRewardNum.do",
            method: "post"
        },
        //中奖列表
        getRewardList: {
            url: "api/customer/getRewardList.do",
            method: "post"
        },
        //我的中奖列表
        getCustomerReward: {
            url: "api/customer/getCustomerReward.do",
            method: "post"
        },
        //我的中奖列表
        getSysProduct: {
            url: "api/common/getSysProduct.do",
            method: "post"
        },
        //我的中奖列表
        transferAccounts: {
            url: "api/convert/transferAccounts.do",
            method: "post"
        }
    }
}());

export default apiCfg;