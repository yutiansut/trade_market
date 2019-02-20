import qs from 'qs';
import axios from 'axios';
import router from "../../router/index";
import { Toast } from "vant";
import api from '@/config/apiConfig.js';
import myStorage from '@/assets/js/myStorage';
import Store from '@/vuexStore/store';
let ajaxCount = 0;
const ajaxRequest = (function () {
    const baseURL = api.baseURL;
    ajaxCount++;
    axios.interceptors.request.use(
        config => {
            if (config.showLoading) {
                Toast.loading({
                    spinnerType: "fading-circle",
                    message: '加载中...'
                });
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            return Promise.resolve(error.response);
        }
    );

    function errorState(response) {
        if (
            response &&
            (response.status === 200 ||
                response.status === 304 ||
                response.status === 400)
        ) {
            return response.data;
        };
        Toast({
            message: "网络不给力",
            position: "bottom"
        });
    };
    function successState(response) {

        let code = response.data.code || null;
        let msg = null;
        //统一判断后端返回的错误码
        switch (code) {
            case '0':
                break;
            case '1':
                msg = response.data.msg || "网络不给力";
                Toast({
                    message: msg,
                    position: 'bottom'
                });
                break;
            case '2':
                msg = "登录信息已失效！";
                myStorage.set("isLogin", false);
                Store.commit('loginState', false);
                if (router.history.current.path != '/login') {
                    router.push({ path: "/login" });
                };
                Toast({
                    message: msg,
                    position: 'bottom'
                });
                break;
        }

    };
    return (opts, data) => {
        let Public = {
            //公共参数
            token: localStorage.getItem("token")
        };

        let httpDefaultOpts = {
            //http默认配置
            method: opts.method ? opts.method : 'post',
            baseURL: baseURL,
            url: opts.url,
            timeout: 60000,
            params: Object.assign(Public, data),
            data: qs.stringify(Object.assign(Public, data)),
            headers:
                opts.method == "get"
                    ? {
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "application/json",
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                    : {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
        };
        if (opts.method == "get") {
            delete httpDefaultOpts.data;
        } else {
            delete httpDefaultOpts.params;
        }
        httpDefaultOpts.showLoading = !(data && data.showLoading == '0')

        let promise = new Promise(function (resolve, reject) {
            axios(httpDefaultOpts)
                .then(res => {
                    ajaxCount--;
                    if (ajaxCount <= 0) Toast.clear();
                    successState(res);
                    resolve(res.data);
                })
                .catch(response => {
                    errorState(response);
                    reject(response);
                });
        });
        return promise;
    }
}());
export default ajaxRequest
