/**
 * Created by huozhenguang on 2018/1/15.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";

export default {
    namespace:'confirmPay',
    state : {
        totalMoney:0,
        orderTime:0,
        orderInterest:0,
        moneyUrl:'',
        shopUrl:'',
        orderId:0,
        verifyCode:'',
        isShow:true, // 是否显示取消按钮
    },
    subscriptions:{
        setup({ dispatch,history }){
            history.listen(location => {
                dispatch({
                    type:'query',
                    payload:{}
                });
            });
        },
    },
    effects:{
        /*
        * payOrderId 是 从我的订单点进来的订单id
        * */
        *query({ payload},{ put, call}){ // 在去付款界面 记录的orderId的key => orderId
            let payOrderId = window.localStorage.getItem('orderId') ? window.localStorage.getItem('orderId') : '';
            payload.param = {
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                orderId: payOrderId,
                isOld: window.localStorage.getItem(payOrderId+'_isOld') ? 1 : '',
            };
            let result = yield call(getData('getConfirmPayMoney'),{ payload });
            if(result && result.code === 0){
                window.localStorage.removeItem('orderId');
                window.localStorage.setItem('orderId',result.data.orderId);
                yield put({
                    type:'querySuccess',
                    payload:{
                        type:'query',
                        payload:{
                            totalMoney:result.data.totalMoney,
                            orderTime:result.data.orderTime,
                            orderInterest:result.data.orderInterest,
                            moneyUrl:result.data.moneyUrl,
                            shopUrl:result.data.shopUrl,
                            orderId:result.data.orderId
                        }
                    }
                });
            }else{
                if(result){
                    Toast.info(result.msg);
                }
                return;
            }
        },
        *queryNext({ payload },{put,call}){
            if(payload.verifyCode.replace(/\s/g, '').length != 6){
                Toast.info('验证码有误');
                return;
            }
            payload.param = {
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                orderId:window.localStorage.getItem('orderId'),
                verifCode:payload.verifyCode
            }
            let result = yield call(getData('confirmPayMoney') , { payload });
            if(result && result.code === 0){
                window.localStorage.removeItem('orderPayStatus');
                window.localStorage.setItem('orderPayStatus',result.data.orderPayStatus); //订单支付状态 0 失败 1 成功
                const history = createHistory({
                    forceRefresh:true
                });
                history.push({
                    pathname: "/confirmPayResult"
                })
            }else{
                Toast.info(result.msg);
                return;
            }
        },
        *sendVerifyCode({ payload },{put,call}){
            payload.param = {
                mobile:payload.mobile ? payload.mobile.split(" ").join(""):(window.localStorage.getItem('mobile') ? window.localStorage.getItem('mobile') : '13552201065'),
                type:payload.type
            }
            let result = yield call(getData('getVerifyCode') , { payload });
            if(result && result.code === 0){
                Toast.info('发送成功');
                return;
            }else{
                Toast.info(result.msg);
                return;
            }
        },
        *getVerifyCode({ payload },{put,call}){
            yield put({
                type:'getVerifyFun',
                payload:{
                    verifyCode:payload.verifyCode,
                }
            });
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                totalMoney:payload.payload.totalMoney,
                orderTime:payload.payload.orderTime,
                orderInterest:payload.payload.orderInterest,
                moneyUrl:payload.payload.moneyUrl,
                shopUrl:payload.payload.shopUrl,
                orderId:payload.payload.orderId
            }
        },
        getVerifyFun(state , { payload }){
            return {
                ...state,
                verifyCode:payload.verifyCode
            }
        }
    }
}