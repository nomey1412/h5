/**
 * Created by huozhenguang on 2018/1/24.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
export default {
    namespace:'myCoupon',
    state:{},
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

            }
        }
    }
}