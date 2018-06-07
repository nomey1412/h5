/**
 * Created by huozhenguang on 2018/1/17.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
const history = createHistory({forceRefresh:true});
export default {
    namespace:'confirmRefund',
    state:{
        amount: '',
        orderId: '',
        bankName: "",
        cardNum: "",
        moneyUrl: "",
        shopUrl: "",
        wastageMoney: ''
    },
    subscriptions:{
        setup({ dispatch, history }){
            history.listen(location => {
                dispatch({
                    type:'query',
                    payload:{}

                });
            });
        }
    },
    effects:{
        *query({ payload } , { put , call}){
            payload.param = {
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                orderId:window.localStorage.getItem('orderId')
            }
            let result = yield call(getData('orderConfirm') , { payload });
            if(result && result.code === 0){
                yield put({
                    type:'querySuccess',
                    payload:{
                        type:'query',
                        payload:{
                            amount: result.data.amount,
                            orderId: result.data.orderId,
                            bankName: result.data.bankName,
                            cardNum: result.data.cardNum,
                            moneyUrl: result.data.moneyUrl,
                            shopUrl: result.data.shopUrl,
                            wastageMoney: result.data.wastageMoney,
                            query:payload
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
        *queryNext({ payload } , { put , call}){ //确认退款按钮
            // 考虑是否存储退款时的订单ID
            payload.param = {
                customerId:window.localStorage.getItem('customerId'),
                orderId:payload.orderId,
                consumeAmount:payload.consumeAmount,
                //consumeBlank:payload.consumeBlank,
                //consumeBlankCard:payload.consumeBlankCard,
                verifCode:''
            }
           let result = yield call(getData('withdrawalsApply') , { payload });
            if(result && result.code === 0){
                history.push({pathname: "/refundStatus"})
            }else{
                if(result)Toast.info(result.msg);
                return;
            }
        },
        *JumpToAddBank({ payload } , { put , call}){
            history.push({pathname:'/AddBankCardInfo',search: '?type='+payload.type,});
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                amount: payload.payload.amount,
                orderId: payload.payload.orderId,
                bankName: payload.payload.bankName,
                cardNum: payload.payload.cardNum,
                moneyUrl: payload.payload.moneyUrl,
                shopUrl: payload.payload.shopUrl,
                wastageMoney: payload.payload.wastageMoney,
            };
        }
    }
}