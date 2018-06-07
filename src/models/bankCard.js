/**
 * Created by huozhenguang on 2018/2/2.
 */
import createHistory from "history/createBrowserHistory";
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
const history = createHistory({forceRefresh:true});
export default {
    namespace:'bankCard',
    state:{
        card_id:'',
        card_logo:'',
        card_name:'',
        card_num:''
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
        *query({ payload } , { call,put }){
            payload.param = {
                customer_id:window.localStorage.getItem('customerId')
            }
            let result = yield call(getData('myBankCard') , { payload });
            if(result && result.code === 0){
                yield put({
                    type:'querySuccess',
                    payload:{
                        card_id:result.data.card_id,
                        card_logo:result.data.card_logo,
                        card_name:result.data.card_name,
                        card_num:result.data.card_num
                    }
                });
            }
        },
        *JumpAddBand({ payload }, { call , put}){
            history.push({pathname:'/AddBankCardInfo',search: '?type='+payload.type});
        },
        *cancelBank({ payload }, { call , put}){
            payload.param = {
                customer_id:window.localStorage.getItem('customerId'),
                card_id:payload.card_id
            }
            let result = yield call(getData('unBindBank') , { payload });
            if(result && result.code === 0){
                window.location.reload();
                return;
            }else{
                Toast.info(result.msg);
                return;
            }
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return{
                ...state,
                card_id:payload.card_id,
                card_logo:payload.card_logo,
                card_name:payload.card_name,
                card_num:payload.card_num
            }
        }
    }
}