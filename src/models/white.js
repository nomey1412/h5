/**
 * Created by huozhenguang on 2018/1/22.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
export default {
    namespace:'white',
    state:{
        orderHistory:[],
        consume_id:'',
        iousRepayMonth:'',
        iousRepayDay:'',
        iousBills:'',
        couponsNum:'',
        spendMoney:'',
        spendDate:'',
        overdueDays:'',
        rePayStatus:'',
        dialog_list:[]
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
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '672',
            }

            let result = yield call(getData('iousBills') , { payload });
            if(result && result.code === 0){
                payload.param = {
                    customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '672',
                    consume_id:result.data.consume_id,
                    couponId:''
                }
                //请求？接口
                let result_other = yield call(getData('getRepaymentDetails') , { payload});
                yield put({
                    type:'querySuccess',
                    payload:{
                        type:'query',
                        orderHistory:result.data.orderHistory,
                        consume_id:result.data.consume_id,
                        iousRepayMonth:result.data.iousRepayMonth,
                        iousRepayDay:result.data.iousRepayDay,
                        iousBills:result.data.iousBills,
                        couponsNum:result.data.couponsNum,
                        spendMoney:result.data.spendMoney,
                        spendDate:result.data.spendDate,
                        overdueDays:result.data.overdueDays,
                        rePayStatus:result.data.rePayStatus,
                        dialog_list:result_other.code === 0 ? result_other.data.dialog_list : [],
                        query:payload
                    }

                });
            }
        },

        *repay({ payload } , { put , call}){
            window.localStorage.removeItem('iousBillConsumeId');
            window.localStorage.setItem('iousBillConsumeId',payload.consumeId);
            const history = createHistory({
                forceRefresh:true
            });
            history.push({
                pathname: "/repay"
            })
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                orderHistory:payload.orderHistory,
                consume_id:payload.consume_id,
                iousRepayMonth:payload.iousRepayMonth,
                iousRepayDay:payload.iousRepayDay,
                iousBills:payload.iousBills,
                couponsNum:payload.couponsNum,
                spendMoney:payload.spendMoney,
                spendDate:payload.spendDate,
                overdueDays:payload.overdueDays,
                rePayStatus:payload.rePayStatus,
                dialog_list:payload.dialog_list
            };
        }
    }
}