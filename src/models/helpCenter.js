/**
 * Created by huozhenguang on 2018/1/22.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
export default {
    namespace:'helpCenter',
    state:{
        qaList:[],
        serviceUrl:'',
        type : ''
    },
    subscriptions:{
        setup({ dispatch, history }){
            history.listen(location => {
                dispatch({
                    type:'query',
                    payload:{
                        type:history.location.pathname.indexOf('Help') === 1 ? 1 :2
                    }

                });
            });
        }
    },
    effects:{
        *query({ payload } , { put , call}){
            payload.param = {
                type:payload.type
            }
            let result = yield call(getData('helpCenter') , { payload });
            if(result && result.code === 0){
                result.data.qaList.map((item,i) => {
                    item.status = 1;
                });
                yield put({
                    type:'querySuccess',
                    payload:{
                        qaList:result.data,
                        type:payload.type,
                        query:payload
                    }
                });
            }else{
                if(result){
                    Toast.info(result.msg);
                }
                return;
            }
        },
        *changeStatus({ payload } , { put , call}){
            payload.data.map(( item , i) => {
                if(i == payload.argv){
                    if(item.status){
                        item.status = 0;
                    }else{
                        item.status = 1;
                    }
                }else{
                    item.status = 1
                }
            });
            yield put({
                type:'queryChangeStatus',
                payload:{
                    data:payload.data
                }
            });
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                qaList:payload.qaList.qaList,
                type:payload.type,
                serviceUrl:payload.qaList.serviceUrl
            };
        },
        queryChangeStatus(state , { payload }){
            return {
                ...state,
                qaList:payload.data
            };
        }
    }
}