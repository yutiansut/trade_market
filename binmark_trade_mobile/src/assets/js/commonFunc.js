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
export {
    dataType,
    randomNum,
    timerCounter
}