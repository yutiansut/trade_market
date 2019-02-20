function dataType(o) {
    let toString = Object.prototype.toString;
    let typeObj = {
        "undefined": "undefined",
        "number": "number",
        "boolean": "boolean",
        "string": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object RegExp]": "regexp",
        "[object Date]": "date",
        "[object Erroe]": "error"
    }
    return typeObj[typeof o] || typeObj[toString.call(o)] || (o ? "object" : "null");
};
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
function timerCounter(config) {
    if (!config) return false;
    if (dataType(config) !== "object") {
        console.log("参数必须是Object 类型");
        return;
    };
    let defaultConfig = {
        'count': 30,//倒计时时长
        'onStart': null,
        'duration': 1000,//倒计时周期
        'onCounting': null,//倒计时回调函数
        'onComplete': null//倒计时结束时的回调函数
    };
    for (let key in defaultConfig) {
        if (!config.hasOwnProperty(key)) {
            config[key] = defaultConfig[key];
        }
    }
    let n = config.count;
    config.onStart && dataType(config.onStart) === 'function' && config.onStart(n)
    let timer = setInterval(() => {
        --n;
        if (n <= 0) {
            clearInterval(timer);
            timer = null;
            (config.onComplete && dataType(config.onComplete) === "function") && config.onComplete();
            return;
        }
        (config.onCounting && dataType(config.onCounting) === "function") && config.onCounting(n);
    }, config.duration);
    return timer;
};
//乘积精度处理
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { };
    return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(8)
};
//求和
function sumCalc(arr, price, num) {
    if (dataType(arr) == "array") {
        arr.map(item => {
            if (item[price] && item[num]) {
                item.total = accMul(item[price], item[num]);
            }
        });
    };
    return arr;
};
function randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function getQueryParams() {
    let url = decodeURIComponent(location.search),
        qs = url.length > 0 ? url.substring(1) : "",
        args = {},
        paramsArr = qs.length > 0 ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        len = paramsArr.length,
        i = 0;
    while (i < len) {
        item = paramsArr[i].split('=');
        name = item[0];
        value = item[1];
        if (name) args[name] = value;
        i++;
    };
    return args;
}
export {
    dataType,
    randomNum,
    timerCounter,
    sumCalc,
    randomString,
    getQueryParams
}