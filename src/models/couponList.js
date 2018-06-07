/**
 * Created by huozhenguang on 2018/1/17.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
export default {
    namespace:'couponList',
    state:{
        available_list:[], //可以使用
        unavailable_list:[] // 历史
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
                consumeId:window.localStorage.getItem('iousBillConsumeId'),
            }
            let result = yield call(getData('getRepayCouponList') , { payload });
            if(result && result.code === 0){
                console.log(result);
                yield put({
                    type:'querySuccess',
                    payload:{
                        available_list:result.data.available_list,
                        unavailable_list:result.data.unavailable_list
                    }
                });
            }else{
                if(result){
                    Toast.info(result.msg);
                }
                return;
            }
        },
        *changeCoupon({ payload } , { put , call}){
            window.localStorage.removeItem('changeCouponId');
            window.localStorage.setItem('changeCouponId',payload.couponId);
            const history = createHistory({
                forceRefresh:true
            });
            history.push({
                pathname: "/repay"
            })
        },
        *changeConHistory({ payload } , { put , call}){
            const history = createHistory({
                forceRefresh:true
            });
            history.push({
                pathname: "/ConHistory"
            })
        },
        *changeRule({ payload } , { put , call}){
            const history = createHistory({
                forceRefresh:true
            });
            history.push({
                pathname: "/helpCenter"
            })
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                available_list:payload.available_list,
                unavailable_list:payload.unavailable_list
            };
        }
    }
}