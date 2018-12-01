import qs from 'qs';
import axios from 'axios';
import { Toast } from "vant";
import { Loading } from 'element-ui';
import api from '@/config/apiConfig.js';
import Utils from './utils';
import myStorage from '@/assets/js/myStorage';
axios.defaults.withCredentials = true;
let loadingMask = null;
const ajaxRequest = (function () {
    const baseURL = api.baseURL;
    axios.interceptors.request.use(
        config => {
            if (config.showLoading) {
                loadingMask = Loading.service({
                    text: "加载中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.4)"
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
        loadingMask.close();
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
        loadingMask.close();
        let code = response.data.code * 1 || null;
        let msg = null;
        //统一判断后端返回的错误码
        switch (code) {
            case 1:
                msg = response.data.msg || "网络不给力";
                Toast({
                    message: msg,
                    position: 'bottom'
                });
                break;
            case 2:
                msg = "登录信息已失效！";
                myStorage.remove('token');
                myStorage.set('isLogin', false);
                Toast({
                    message: msg,
                    position: 'bottom'
                });
                break;
        }
    };
    function createParam(data) {
        let params = '';
        if (data && Utils.dataType(data) == "object") {
            for (let key in data) {
                data[key] && (params += `/${data[key]}`);
            }
            return params;
        }
    };
    return (opts, data) => {
        let Public = {
            //公共参数
            token: myStorage.get("token") || ""
        };
        let postData = Object.assign(Public, data);
        let httpDefaultOpts = {
            //http默认配置
            method: opts.method ? opts.method : "post",
            baseURL: baseURL,
            url: opts.url,
            timeout: 60000,
            params: postData,
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
