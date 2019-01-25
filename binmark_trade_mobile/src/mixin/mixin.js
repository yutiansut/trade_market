import {
    getTradeCoin,
    getMainCoin,
    getAvailable
} from "@/vuexStore/storeService.js";
import { timerCounter, randomNum } from '../assets/js/commonFunc'
// 侧栏混入
const asideMixin = {
    data() {
        return {
            showPop: false,
        }
    },
    methods: {
        slideClose() {
            this.showPop = false;
        },
        slideShow() {
            this.showPop = true;
        }
    }
};
// 币币交易混入
const coinTradeMixin = {
    methods: {
        async getCoinData() {
            let mainCoinList = await getMainCoin();
            if (Array.isArray(mainCoinList) && mainCoinList.length > 0) {
                return await mainCoinList;
            }
        },
        async getTradeCoin(maincoinid, tradecoinid) {
            let result = await getTradeCoin(maincoinid);
            this.Store.dispatch('updateMainCoinid', maincoinid);
            this.Store.dispatch('updateTradeCoinid', tradecoinid || result[0].coinid);
        },
        async getAvailable(coinid) {
            if (coinid) {
                return await getAvailable(coinid);
            }
        }
    }
};
const verCodeMixin = {
    data() {
        return {
            code: "",
            canGetCode: true,
            timer: null,
            codeText: "获取验证码"
        }
    },
    methods: {
        timeCountDown() {

            if (this.canGetCode) {
                this.timer = timerCounter({
                    onStart: t => {

                        this.canGetCode = false;
                        this.codeText = `倒计时(${t})s`;
                    },
                    onCounting: t => {
                        this.codeText = `倒计时(${t})s`;
                    },
                    onComplete: () => {
                        this.canGetCode = true;
                        this.codeText = "重新获取";
                    }
                })
            }
        }
    }
}
const imgCodeMixin = {
    data() {
        return {
            verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            verCodeStr: "",
        }
    },
    methods: {
        createCode(arr, len) {
            if (Array.isArray(arr)) {
                let str = "";
                for (let i = 0; i < len; i++) {
                    str += arr[
                        randomNum(0, arr.length)
                    ];
                }
                this.verCodeStr = str;
            }

        }
    }
}
export {
    asideMixin,
    coinTradeMixin,
    verCodeMixin,
    imgCodeMixin
}