import { timerCounter } from '../assets/js/Utils'
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
export {
    verCodeMixin
}