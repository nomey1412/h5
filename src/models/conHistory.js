/**
 * Created by huozhenguang on 2018/1/23.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
export default {
    namespace:'conHistory',
    state:{
        available_list:[]
    },
    subscriptions:{
        setup({ dispatch, history }){
            history.listen(location => {
                dispatch({
                    type:'query',
                    payload:{
                        type:history.location.pathname.indexOf('myCoupon') === 1 ? 1 :2
                    }

                });
            });
        }
    },
    effects:{
        *query({ payload } , { put , call}){
            payload.param = {
                customerId : window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                page:0,
                size:0,
                type:payload.type
            }
            let result = yield call(getData('getCouponList') , { payload });
            if(result  && result.code === 0){
                yield put({
                    type:'querySuccess',
                    payload:{
                        couponList:result.data.couponList
                    }
                });
            }else{
                if(result){
                    Toast.info(result.msg);
                }
                return;
            }
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                available_list:payload.couponList
            };
        }
    }
}