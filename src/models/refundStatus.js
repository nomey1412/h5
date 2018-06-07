/**
 * Created by huozhenguang on 2018/1/17.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
const history = createHistory({forceRefresh:true});
export default {
    namespace:'refundStatus',
    state:{
        consume_status:'',
        consume_status_list:[]
    },
    subscriptions:{
        setup({ dispatch, history }){
            history.listen(location => {
                dispatch({
                    type:'query',
                    payload:{
                        type:history.location.pathname.indexOf('repayStatus') === 1 ? 1 :2
                    }

                });
            });
        }
    },
    effects:{
        *query({ payload } , { put , call}){
            if(payload.type === 1){
                payload.param = {
                    customer_id:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                    consume_id:window.localStorage.getItem('confirmRepayConsumeId') ? window.localStorage.getItem('confirmRepayConsumeId') : '124383712'
                }
            }else if(payload.type === 2){
                payload.param = {
                    customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                    orderId:window.localStorage.getItem('orderId')
                }
            }
            let result = yield call(getData(payload.type === 1 ? 'getRepaymentStatus' :'getOrderLog') , { payload});
            if(result && result.code === 0){
                yield put({
                    type:'querySuccess',
                    payload:{
                        consume_status:result.data.consume_status,
                        consume_status_list:result.data.consume_status_list
                    }
                });
            }else{
                if(result){
                    Toast.info(result.msg);
                }
                return;
            }
        },
        *changeConfirmBack({ payload } , { put , call}){ // 再次申请退款
            history.push({pathname: "/confirmRefund"})
        },
        *confirmBackSuccess({ payload } , { put , call}){ // 还款成功后
            history.push({pathname: "/repur"})
        },
        *confirmBackFail({ payload } , { put , call}){ // 还款失败后
            history.push({pathname: "/repay"})
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                consume_status:payload.consume_status,
                consume_status_list:payload.consume_status_list
            };
        }
    }
}