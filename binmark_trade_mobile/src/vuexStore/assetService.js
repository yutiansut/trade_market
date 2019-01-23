import Request from '../assets/js/request';
import apiConfig from '../config/apiConfig';
import { Toast } from "vant";
// 处理后台返回结果集
function handelResult(result) {
    try {
        if (result.code != 0) {
            Toast({
                message: result.msg || "获取数据失败"
            });
            return false;
        } else {
            return result.data;
        }
    } catch (err) {
        console.log(err)
    }
};
// 获取首页banner
const getIndexBanner = async () => {
    try {
        let result = await Request(apiConfig.banner);
        let data = handelResult(result);
        if (window.sessionStorage) {
            window.sessionStorage.setItem('banner', JSON.stringify(data.list));
        };
        return data.list;
    } catch (err) {
        console.log(err);
    }
};
export {
    getIndexBanner
}