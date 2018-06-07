
import { hex_sha1 }  from '../utils/sha1';
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
const history = createHistory({forceRefresh:true});
export default {
    namespace:'regis',
    state:{
        captcha_result:false
    },
    effects:{
        *regisCheckCaptcha({ payload } , { put , call} ){
            payload.param = {
                captcha:payload.captcha
            }
            let captcha_res = yield call(getData('checkVerifyCaptcha') , { payload });
            console.log(captcha_res);
            if(captcha_res && captcha_res.code === 0){
                yield put({
                    type:'regisCheckCaptchaSuccess',
                    payload:{
                        captcha_result:captcha_res.data.result ? true : false
                    }
                });
            }
        },
        *regisLogin( { payload } , { put , call} ){
            if(payload.password){
                let sha_pass = hex_sha1(payload.password).split("").reverse().join("");
                payload.password = sha_pass.toUpperCase();
            }
            payload.param = {
                captcha:payload.captcha
            }
            let captcha_res = yield call(getData('checkVerifyCaptcha') , { payload });
            if(captcha_res && captcha_res.code === 0){
                if(captcha_res.data.result){
                    payload.param = {
                        mobile:payload.mobile.split(" ").join(""),
                        password:payload.password,
                        code:payload.verify,
                        push_id:'111111',
                        login_type: payload.verify ? 1 : 2 // 1 验证码 2 密码
                    }
                    let result = yield call(getData('signUp') , { payload });
                    if(result && result.code === 0){
                        window.localStorage.removeItem('customerId');
                        window.localStorage.removeItem('token');
                        window.localStorage.removeItem('mobile');
                        window.localStorage.setItem('customerId',result.data.customer_id);
                        window.localStorage.setItem('token',result.data.token);
                        window.localStorage.setItem('mobile',payload.param.mobile);
                        history.push({pathname:'/home'});
                    }else{
                        if(result.msg){
                            Toast.fail(result.msg);
                        }
                        return;
                    }
                }else{
                    Toast.fail('请输入正确的图形验证码');
                    return;
                }

            }
        },
    },
    reducers:{
        regisCheckCaptchaSuccess(state , { payload }){
            return{
                ...state,
                captcha_result:payload.captcha_result
            }
        }
    },

}