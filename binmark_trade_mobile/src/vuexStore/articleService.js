import Request from '../assets/js/request';
import apiConfig from '../config/apiConfig';
import Store from '../vuexStore/store';
import { Toast } from 'vant';
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

// 获取新闻列表
const getNewsList = async () => {
    try {
        if (Store.state.newsList.length > 0) return;
        let result = await Request(apiConfig.notices);
        let data = handelResult(result);
        Store.dispatch('getNewsList', data.list);
    } catch (err) {
        console.log(err);
    }
};
export {
    getNewsList
}