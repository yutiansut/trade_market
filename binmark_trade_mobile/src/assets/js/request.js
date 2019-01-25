import qs from 'qs';
import axios from 'axios';
import { Toast } from "vant";
import api from '@/config/apiConfig.js';
import myStorage from './myStorage';
import Store from '@/vuexStore/store';
const ajaxRequest = (function () {
    const baseURL = api.baseURL;
    axios.interceptors.request.use(
        config => {
            if (config.showLoading) {
                Toast.loading({
                    spinnerType: "fading-circle",
                    message: '加载中...',
                    mask: true,
                    loadingType: "spinner"
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
        Toast.clear();
        let errMsg = "";
        switch (response.status) {
            case 400:
                errMsg = '请求错误'
                break;
            case 401:
                errMsg = '未授权，请登录'
                break

            case 403:
                errMsg = '拒绝访问'
                break

            case 404:
                errMsg = `请求地址出错: ${err.response.config.url}`
                break

            case 408:
                errMsg = '请求超时'
                break

            case 500:
                errMsg = '服务器内部错误'
                break

            case 501:
                errMsg = '服务未实现'
                break

            case 502:
                errMsg = '网关错误'
                break

            case 503:
                errMsg = '服务不可用'
                break

            case 504:
                errMsg = '网关超时'
                break

            case 505:
                errMsg = 'HTTP版本不受支持'
                break
        }
        Toast({
            message: errMsg,
            position: "bottom"
        });
    };

    function successState(response) {
        Toast.clear();
        let code = response.data.code * 1 || null;
        let msg = null;
        //统一判断后端返回的错误码
        switch (code) {
            case -1:
                myStorage.remove('token');
                Store.dispatch('updateLoginState', false);
                myStorage.set('isLogin', Store.state.isLogin);
                break;
            case 0:

                break;
        }
    };
    return (opts, data) => {
        let Public = {
            //公共参数
            token: myStorage.get("token")
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
