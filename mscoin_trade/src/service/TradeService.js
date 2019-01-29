import apiConfig from '../config/apiConfig';
import Request from '../assets/js/request';
import Message from 'element-ui';
import myStorage from '../assets/js/myStorage';
const checkTradePassword = async tradpwd => {
    let res = await Request(apiConfig.checkTradpwd, { tradpwd });
    return res;
}
export {
    checkTradePassword
}