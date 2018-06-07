/**
 * Created by huozhenguang on 2018/1/15.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
const history = createHistory({forceRefresh:true});
export default {
    namespace:'mine',
    state:{
        mineIous: "",
        iousBills: "",
        couponsNum: 0,
        serviceUrl: "",
        consumeId: "",
        guideUrl: "",
        guideTitle: "",
        taberType:2, // 区分是那个taber
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
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616'
            };
            if(window.localStorage.getItem('customerId')){
                let mine_detail = yield call(getData('mine') , { payload });
                if(mine_detail && mine_detail.code === 0){
                    yield put({
                        type:'querySuccess',
                        payload:{
                            type:'query',
                            payload:{
                                mineIous: mine_detail.data.mineIous,
                                iousBills: mine_detail.data.iousBills,
                                couponsNum: mine_detail.data.couponsNum,
                                serviceUrl: mine_detail.data.serviceUrl,
                                consumeId: mine_detail.data.consumeId,
                                guideUrl: mine_detail.data.guideUrl,
                                guideTitle: mine_detail.data.guideTitle,
                                query:payload
                            }
                        }
                    });
                }
            }
        },
        *queryNext({ payload } , { put , call}){
            const history = createHistory({
                forceRefresh:true
            });
            history.push({
                pathname: payload.type == 1 ? "/WhitePage" : '/myOrder'
            })
        },
        *queryPay({payload},{put,call}){
            window.localStorage.removeItem('payOrderId');
            window.localStorage.setItem('payOrderId',payload.orderId);
            const history = createHistory({
                forceRefresh:true,
            });
            history.push({
                pathname:'/confirmPay'
            });
        },
        *queryJump({payload},{put,call}){
            if(payload.type === 4){ // 退出操作
                window.localStorage.clear();
                payload.param = {
                    customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616'
                }
                let result = yield call(getData('logout'),{ payload });
            }
            let pathname;
            switch(payload.type){
                case 2:
                    pathname = "/repur";
                    break;
                case 3:
                    pathname = "/myCoupon";
                    break;
                case 4:
                    pathname = "/mine";
                    break;
                case 5:
                    pathname = "/HelpCenter";
                    break;
                case 6:
                    pathname = '/bankCardInfo';
                    break;
            }
            const history = createHistory({
                forceRefresh:true,
            });
            history.push({
                pathname:pathname
            });
        },
        *queryBack({payload},{put,call}){ // 执行退款
            window.localStorage.removeItem('orderId');
            window.localStorage.setItem('orderId',payload.orderId);
            history.push({pathname:'/confirmRefund'});
        },
        *queryBuy({payload},{put,call}){ // 执行再次购买 先进行判断 是否符合购买条件
            payload.param = {
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '672',
                orderId:payload.orderId
            }
            let result = yield call(getData('checkRepeatGoodsStatus') , { payload });
            if(result && result.code === 0){ // 通过执行付款页面
                window.localStorage.removeItem('orderId'); // orderId =》 payOrderId
                window.localStorage.setItem('orderId',payload.orderId);
                window.localStorage.removeItem(payload.orderId+'_isOld');
                window.localStorage.setItem(payload.orderId+'_isOld',1);
                history.push({pathname:'/confirmPay'});
            }else{
                if(result) {
                    Toast.info(result.msg);
                }
                return;
            }

        },
        *changeLogin({payload},{put,call}){
            history.push({pathname:'/login'});
        },
        *queryReback({payload},{put,call}){
            window.localStorage.removeItem('orderId');
            window.localStorage.setItem('orderId',payload.orderId);
            history.push({pathname:'/confirmRefund'});
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                mineIous: payload.payload.mineIous,
                iousBills: payload.payload.iousBills,
                couponsNum: payload.payload.couponsNum,
                serviceUrl: payload.payload.serviceUrl,
                consumeId: payload.payload.consumeId,
                guideUrl: payload.payload.guideUrl,
                guideTitle: payload.payload.guideTitle
            };
        }
    }
}