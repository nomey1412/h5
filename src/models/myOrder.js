/**
 * Created by huozhenguang on 2018/1/16.
 */
import { getData } from '../services/hn';
import { changeJsonToArray } from '../services/gjson';
export default {
    namespace:'myOrder',
    state:{
        orderList:[],
        isDivlog:false
    },
    subscriptions:{
        setup({ dispatch, history }){
            history.listen(location => {
                dispatch({
                    type:'query',
                    payload:{
                        type:history.location.pathname.indexOf('repur') === 1 ? 2 : 1
                    }

                });
            });
        }
    },
    effects:{
        *query({ payload } , { put , call}){
            payload.param = {
                customerId: window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                type:payload.type
            };
            let order_list = yield call(getData('myOrder'), {payload});
            if (order_list && order_list.code === 0) {
                if(payload.type === 2){
                    order_list.data.orderList.map(( item , i) => {
                        item.orderSatus = 20; // 再次购买标识
                    });
                }
                yield put({
                    type: 'querySuccess',
                    payload: {
                        type: 'query',
                        payload: {
                            orderList: order_list.data.orderList,
                            isDivlog:order_list.data.isBindBankCard === 1 ? true : false,
                            query: payload
                        }
                    }
                });
            }
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                orderList:payload.payload.orderList,
                isDivlog:payload.payload.isDivlog
            };
        }
    }
}