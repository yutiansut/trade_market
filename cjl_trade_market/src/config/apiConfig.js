let apiCfg = (function () {
    return {
        baseURL: process.env.NODE_ENV === 'production' ? "https://admin.kmsjqm.cn/" : "http://192.168.5.145:8080/API/",
        // 二维码路径
        qrUrl: 'https://www.kmsjqm.cn/',
        // 首页banner
        banner: {
            url: "banner",
        },
        //所有币种
        allcoin: {
            url: 'allcoin'
        },
        // 友情链接
        friendlink: {
            url: 'link'
        },
        // 用户注册
        register: {
            url: 'register',
            method: 'post'
        },
        // 钱包注册
        registeruser: {
            url: "registeruser",
            method: "post"
        },
        //手机登录
        signin: {
            url: "signin",
            methed: "post"
        },
        //pc登录
        login: {
            url: "login",
            method: "post"
        },
        // 登录验证
        checklogin: {
            url: "checklogin",
            method: "post"
        },
        //忘记密码
        forget: {
            url: "forget",
            method: "post"
        },
        //获取我的资产
        getaccount: {
            url: "getaccount"
        },
        //获取我的推广记录
        getmymxtension: {
            url: 'getmymxtension'
        },
        //获取账单记录
        getbill: {
            url: "getbill"
        },
        //获取我的挂单记录
        getmyentru: {
            url: 'getmyentru'
        },
        //获取我的成交记录
        getmyrecord: {
            url: 'getmyrecord'
        },
        //获取我的提现记录
        getmyrecharge: {
            url: 'getmyrecharge'
        },
        //获取我的充值记录
        getmyput: {
            url: 'getmyput'
        },
        //获取历史工单
        gethisorder: {
            url: "gethisorder"
        },
        //添加工单记录
        addorder: {
            url: 'addorder'
        },
        //获取充值地址
        getaddress: {
            url: "getaddress"
        },
        //可用余额和单日最大可提现额度
        getdaynumber: {
            url: "getdaynumber"
        },
        //提币
        outcoin: {
            url: "outcoin"
        },
        //获取我的地址通讯录
        getoutaddress: {
            url: "getoutaddress"
        },
        //新增我的地址通讯录
        addoutaddress: {
            url: "addoutaddress"
        },
        //删除我的地址通讯录
        deloutaaddress: {
            url: "deloutaaddress"
        },
        //积分充值
        coinin: {
            url: "coinin"
        },
        //K线图
        kline: {
            url: "kline"
        },
        //买入五档图
        buyorder: {
            url: 'buyorder'
        },
        //卖出五档图
        sellorder: {
            url: 'sellorder'
        },
        //查看全站交易
        gettoporder: {
            url: 'gettoporder'
        },
        //获取币种信息
        getcoininfo: {
            url: "getcoininfo"
        },
        //获取用户的资产
        gettradaccount: {
            url: 'gettradaccount'
        },
        //查看我的当前委托
        getentrust: {
            url: "getentrust"
        },
        //撤销委托记录
        clearentrust: {
            url: "clearentrust"
        },
        //查看历史委托
        gethistoryorder: {
            url: 'gethistoryorder'
        },
        //买入
        forbuy: {
            url: 'forbuy'
        },
        //卖出
        forsell: {
            url: 'forsell'
        },
        //获取c2c币种
        getc2ccoin: {
            url: 'getc2ccoin'
        },
        //获取c2c订单
        getc2corder: {
            url: 'getc2corder'
        },
        //根据币种获取信息
        getc2callorder: {
            url: 'getc2callorder'
        },
        //根据token和币种查询该用户是否有未完成的订单
        getc2corderbycoin: {
            url: 'getc2corderbycoin'
        },
        //发布C2C买入订单
        addbuyc2c: {
            url: 'addbuyc2c'
        },
        //发布C2C卖出订单
        addsellc2c: {
            url: 'addsellc2c'
        }
    }
}());

export default apiCfg;