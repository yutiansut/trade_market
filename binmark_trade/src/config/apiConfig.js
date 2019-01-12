let apiCfg = (function () {
    return {
        baseURL: process.env.NODE_ENV === 'production' ? "http://192.168.5.51:8080/API" : "/API",
        socketUrl: process.env.NODE_ENV === 'production' ? "ws://192.168.5.51:8080/echo/" : "ws://192.168.5.51:8080/echo/",
        // 二维码路径
        qrUrl: 'https://www.kmsjqm.cn/',
        // 首页banner
        banner: {
            url: "banner",
        },
        //获取app地址
        version: {
            url: "version"
        },
        //根据主币种和交易币种获取币种信息(最新交易信息)
        getCoinInfo: {
            url: 'getcoininfoByCoinType'
        },
        //所有币种
        allcoin: {
            url: 'allcoin'
        },
        //个人信息
        userinfo: {
            url: 'userinfo'
        },
        //公告列表
        notices: {
            url: "notices"
        },
        // 公告详情
        notice: {
            url: "notice"
        },
        // 阅读数+1
        addreadnum: {
            url: 'addreadnum'
        },
        // 友情链接
        friendlink: {
            url: 'link'
        },
        // 用户注册
        register: {
            url: 'register',
        },
        // 钱包注册
        registeruser: {
            url: "registeruser",
        },
        //手机登录
        signin: {
            url: "signin",
        },
        //pc登录
        login: {
            url: "login",
        },
        // 退出
        logout: {
            url: "logout"
        },
        // 登录验证
        checklogin: {
            url: "checklogin",

        },
        //用户不存在是发送短信
        sendcode: {
            url: 'sendcode'
        },
        //修改密码获取验证码
        sendcodeuser: {
            url: 'sendcodeuser'
        },
        updateloginpwd: {
            url: 'updateloginpwd'
        },
        //设置资金密码
        updatepaypassword: {
            url: 'updatepaypassword'
        },
        // 资金交易获取验证码
        sendcodetoken: {
            url: 'sendcodetoken'
        },
        //获取主币种
        getmaincoin: {
            url: 'getmaincoin'
        },
        // 费率列表
        gaslist: {
            url: "gaslist"
        },
        // 获取验证码
        bzcode: {
            url: 'bzcode'
        },
        //忘记密码
        forgetpwd: {
            url: "forgetpwd",
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
        //根据主币种 获取交易币种
        getTradCoin: {
            url: "getTradCoin"
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
        getotcorder: {
            url: 'getotcorder'
        },
        getotcorderbycoin: {
            url: 'getotcorderbycoin'
        },
        // otc 账号信息
        getotcbank: {
            url: 'getotcbank'
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
        //获取的trade记录
        gettradorder: {
            url: 'gettradorder'
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
        },
        //上传接口
        img: {
            url: 'img',
        },
        //问题中心
        getquest: {
            url: 'getquest'
        },
        // 查看用户绑定状态..
        saftyState: {
            url: "state"
        },
        //安全日志
        logsafe: {
            url: 'logsafe'
        },
        //登录日志
        loglogin: {
            url: 'loglogin'
        },
        //绑定邮箱
        bindemail: {
            url: "bindemail"
        },
        //绑定银行卡
        addbank: {
            url: 'addbank'
        },
        // 获取google验证码
        getgooglekey: {
            url: "getgooglekey"
        },
        //绑定谷歌验证码
        addgoogle: {
            url: 'addgoogle'
        },
        //实名认证
        realynanme: {
            url: 'realynanme'
        },
        getotccoin: {
            url: 'getotccoin'
        },
        //otc买入
        otcbuy: {
            url: 'otcbuy'
        },
        //otc卖出
        otcsell: {
            url: 'otcsell'
        },
        //c2c订单
        getc2chistory: {
            url: 'getc2chistory'
        },
        //撤销我发布的订单
        clearc2c: {
            url: "clearc2c"
        },
        setrealyok: {
            url: "setrealyok"
        },
        setsendok: {
            url: "setsendok"
        },
        getmyc2ctrad: {
            url: "getmyc2ctrad"
        },
        //市场买入c2c
        c2cbuytrad: {
            url: "c2cbuytrad"
        },
        //市场卖出c2c
        c2cselltrad: {
            url: "c2cselltrad"
        },
        //上币申请
        addvoterequest: {
            url: 'addvoterequest'
        },
        //注册时获取邮箱验证码
        setemailcode: {
            url: 'setemailcode'
        },
        //登录时获取邮箱验证码
        sendemailcode: {
            url: 'sendemailcode'
        },
        //发送验证码
        code: {
            url: "code"
        },
        //绑定手机号
        addtel: {
            url: "addtel"
        }
    }
}());

export default apiCfg;