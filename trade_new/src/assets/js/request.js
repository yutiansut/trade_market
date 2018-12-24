import qs from 'qs';
import axios from 'axios';
import { Loading } from 'element-ui';
import api from '@/config/apiConfig.js';
import Utils from './utils';
import myStorage from '@/assets/js/myStorage';
import userModel from '@/model/userData.js';
axios.defaults.withCredentials = true;
let loadingMask = null;
const ajaxRequest = (function () {
    const baseURL = api.baseURL;
    axios.interceptors.request.use(
        config => {
            if (config.showLoading) {
                loadingMask = Loading.service({
                    background: "rgba(255, 255, 255, .4)"
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
        }
        return false;
    };

    function successState(response) {
        loadingMask && loadingMask.close();
        let code = response.data.code * 1 || null;
        let msg = null;
        // 统一判断后端返回的错误码
        if (code == -1) {
            myStorage.remove('token');
            myStorage.remove("cellphone");
            myStorage.set('isLogin', false);
            userModel.isLogin = false;
        };
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
        !myStorage.get('token') && delete Public.token;
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
        if (data && data.showLoading) {
            httpDefaultOpts.showLoading = data.showLoading;
        } else {
            httpDefaultOpts.showLoading = false;
        }
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
