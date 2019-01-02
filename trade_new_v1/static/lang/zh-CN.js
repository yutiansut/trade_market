const textArr = [
    "登录",
    "币币交易",
    "法币交易",
    "发布广告",
    "交易管理",
    "商家认证",
    "消息",
    "通知",
    "中文",
    "英文",
    "切换中..."
];
const langEnCfg = (function () {
    let obj = {};
    textArr.map((item, i) => {
        obj['label' + (i + 1)] = item;
    });
    console.log(JSON.stringify(obj));
    return obj;
}());
module.exports = langEnCfg;