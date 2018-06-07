/**
 * Created by huozhenguang on 2018/1/15.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
const history = createHistory({forceRefresh:true});
export default {
    namespace:'confirmPayResult',
    state:{
        goodsImage: '',
        goodsDesc: "",
        price: "",
        orderPayStatus: "",
        logisticStatus: "",
        orderId:"",
        orderPayDes:"",
        isDivlog:false,
        isShow:false
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
        *query({ payload},{ put, call}){
            payload.param = {
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                orderId:window.localStorage.getItem('orderId'),
                customer_id:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
            };
            let result = yield call(getData('orderPayStatus'),{ payload });
            let cardBank = yield call(getData('myBankCard') , { payload });
            if(result && result.code === 0){
                yield put({
                    type:'querySuccess',
                    payload:{
                        type:'query',
                        payload:{
                            goodsImage: result.data.goodsImage,
                            goodsDesc: result.data.goodsDesc,
                            price: result.data.price,
                            orderPayStatus: result.data.orderPayStatus,
                            logisticStatus: result.data.logisticStatus,
                            orderId:result.data.orderId,
                            orderPayDes:result.data.orderPayDes,
                            isDivlog:cardBank.data.card_id ? true : false
                        }
                    }
                });
            }else{
                if(result) {
                    Toast.info(result.msg);
                }
                return;
            }
        },
        *changeHome({ payload } ,{ put,call}){
            history.push({pathname: "/home"})
        },
        *changeToRefund({ payload } ,{ put,call}){ //跳转 退款页面
            history.push({pathname:'/confirmRefund'});
        },
        *cancelOrder({ payload } ,{ put,call}){
            payload.param = {
                customer_id:window.localStorage.getItem('customerId'),
                order_id:payload.order_id
            }
            let result = yield call(getData('cancelOrder'),{ payload });
            if(result && result.code === 0){
                history.push({pathname:'/cancel'});
            }else{
                Toast.info(result.msg);
                return;
            }
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                goodsImage: payload.payload.goodsImage,
                goodsDesc: payload.payload.goodsDesc,
                price: payload.payload.price,
                orderPayStatus: payload.payload.orderPayStatus,
                logisticStatus: payload.payload.logisticStatus,
                orderId:payload.payload.orderId,
                orderPayDes:payload.payload.orderPayDes,
                isDivlog:payload.payload.isDivlog
            }
        }
    }
}