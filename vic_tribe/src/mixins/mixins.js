import { timerCounter } from '../assets/js/Utils';
// 验证码倒计时
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
// 密码是否可见
const passwordVisable = {
    data() {
        return {
            passwordVisable: false
        }
    },
    methods: {
        toggleVisiable() {
            console.log(1)
            this.passwordVisable = !this.passwordVisable;
        }
    }
}
export {
    verCodeMixin,
    passwordVisable
}