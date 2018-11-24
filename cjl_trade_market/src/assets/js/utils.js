const Utils = (function () {
    return {
        isPhone(data) {
            let pattern = /^(1[3456789])\d{9}$/;
            if (data == "") return false;
            return pattern.test(data);
        },
        isPassword(data) {
            let pattern = /^(\w){6,12}$/;
            if (data == "") return false;
            return pattern.test(data);
        },
        isPayPass(data) {
            let pattern = /^[0-9]{6}$/;
            if (data == "") return false;
            return pattern.test(data);
        },
        isIdCard(data) {
            let str = data;
            if (str == "") return false;
            let len = str.length;
            if (len == 15) {
                let reg = /^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/;
            } else if (len == 18) {
                let reg = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d|X|x)$/;
            } else {
                return false;
            }

            if (!reg.test(str)) return false;

            let part = str.match(reg);
            let year = (len == 15) ? ("19" + part[3]) : part[3];
            let date = new Date(year + "/" + part[4] + "/" + part[5]);
            if ((date.getFullYear() != year) ||
                ((date.getMonth() + 1) != (part[4] | 0)) ||
                (date.getDate() != (part[5] | 0)))
                return false;

            if (len == 15) return true;
            let wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            let lastcode = "10X98765432";
            let sum = 0;
            for (let i = 0; i < 17; i++) {
                sum += parseInt(str.charAt(i)) * wi[i];
            }
            return (lastcode.charAt(sum % 11) == part[7].toUpperCase());
        },
        isBankNo(data) {
            return /^\d{19}$/.test(data) || /^\d{16}$/.test(data);
        },
        isPositiveNum(data) {
            return /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{0,2})$/.test(data)
        },
        isInt(data) {
            return /^[+]{0,1}(\d+)$/.test(data)
        },
        isPrice(data) {
            return /^(?!^0*(\.0{1,3})?$)^\d{1,13}(\.\d{1,3})?$/.test(data)
        },
        bankNoCheck(bankno) {
            let lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhn进行比较）

            let first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
            let newArr = new Array();
            for (let i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
                newArr.push(first15Num.substr(i, 1));
            }
            let arrJiShu = new Array();  //奇数位*2的积 <9
            let arrJiShu2 = new Array(); //奇数位*2的积 >9

            let arrOuShu = new Array();  //偶数位数组
            for (let j = 0; j < newArr.length; j++) {
                if ((j + 1) % 2 == 1) {//奇数位
                    if (parseInt(newArr[j]) * 2 < 9)
                        arrJiShu.push(parseInt(newArr[j]) * 2);
                    else
                        arrJiShu2.push(parseInt(newArr[j]) * 2);
                }
                else //偶数位
                    arrOuShu.push(newArr[j]);
            }

            let jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
            let jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
            for (let h = 0; h < arrJiShu2.length; h++) {
                jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
                jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
            }

            let sumJiShu = 0; //奇数位*2 < 9 的数组之和
            let sumOuShu = 0; //偶数位数组之和
            let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
            let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
            let sumTotal = 0;
            for (let m = 0; m < arrJiShu.length; m++) {
                sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
            }

            for (let n = 0; n < arrOuShu.length; n++) {
                sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
            }

            for (let p = 0; p < jishu_child1.length; p++) {
                sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
                sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
            }
            //计算总和
            sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

            //计算luhn值
            let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
            let luhn = 10 - k;

            return lastNum == luhn;
        },
        dataType(o) {
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
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        timerCounter(config) {
            if (!config) return false;
            if (this.dataType(config) !== "object") {
                console.log("参数必须是Object 类型");
                return;
            }
            let defaultConfig = {
                'count': 60,//倒计时其实数
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
            config.onStart && this.dataType(config.onStart) === 'function' && config.onStart(n)
            let timer = setInterval(() => {
                --n;
                if (n <= 0) {
                    clearInterval(timer);
                    timer = null;
                    (config.onComplete && this.dataType(config.onComplete) === "function") && config.onComplete();
                    return;
                }
                (config.onCounting && this.dataType(config.onCounting) === "function") && config.onCounting(n);
            }, config.duration);
        }
    }
}());
export default Utils;