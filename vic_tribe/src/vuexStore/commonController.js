import Request from '../assets/js/request';
import apiConfig from '../config/apiConfig';
import { Toast } from "vant";
// 处理后台返回结果集
function handelResult(result) {
    try {
        if (result.code != 0) {
            Toast({
                message: result.msg || "获取数据失败",
                position: "bottom"
            });
            return false;
        } else {
            return result;
        }
    } catch (err) {
        console.log(err)
    }
};
//登录
const Login = async (phone, password) => {
    try {
        let result = await Request(apiConfig.login, {
            phone, password
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
};
//注册
const Register = async (phone, password, code, parentPhone, payPass, userName) => {
    try {
        let result = await Request(apiConfig.register, {
            userName,
            phone,
            password,
            code,
            parentPhone,
            payPass
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
};
//忘记密码
const forgetPassword = async (phone, password, code) => {
    try {
        let result = await Request(apiConfig.forgetPassword, {
            phone, password, code
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
};
//获取验证码
const getSmsCode = async (phone, smsType) => {
    try {
        let result = await Request(apiConfig.getSmsCode, {
            phone, smsType
        });
        let data = handelResult(result);
        if (data) {
            Toast(result.msg);
            return data;
        }
    } catch (err) {
        console.log(err)
    }
};
//版本号
const getVersion = async () => {
    try {
        let result = await Request(apiConfig.getVersion);
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
};
//用户头像修改
const modifyCustomerHead = async (headImg) => {
    try {
        let result = await Request(apiConfig.modifyCustomerHead, { headImg });
        let data = handelResult(result);
        if (data) {
            Toast(result.msg);
            return data;
        }
    } catch (err) {
        console.log(err)
    }
};
//修改登录密码
const modifyLoginPass = async (oldPassword, phone, newPassword, code) => {
    try {
        let result = await Request(apiConfig.modifyLoginPass,
            {
                oldPassword,
                phone,
                newPassword,
                code
            });
        let data = handelResult(result);
        if (data) {
            return data;
            Toast(result.msg)
        }
    } catch (err) {
        console.log(err)
    }
};
//修改交易密码
const modifyPayPass = async (oldPassword, phone, newPassword, code) => {
    try {
        let result = await Request(apiConfig.modifyPayPass,
            {
                oldPassword,
                phone,
                newPassword,
                code
            });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
};

//上传图片
const uploadImage = async file => {
    try {
        let result = await Request(apiConfig.uploadImage, {
            file
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
};
//上传多图
const uploadImages = async files => {
    try {
        let result = await Request(apiConfig.uploadImages, {
            files
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
};
//上传多图
const uploadImagesByBase64 = async baseString => {
    try {
        let result = await Request(apiConfig.uploadImagesByBase64, {
            baseString
        });
        let data = handelResult(result);
        return data;
    } catch (err) {
        console.log(err)
    }
};
export {
    forgetPassword,
    getSmsCode,
    getVersion,
    modifyCustomerHead,
    modifyLoginPass,
    modifyPayPass,
    Login,
    Register,
    uploadImage,
    uploadImages,
    uploadImagesByBase64
}