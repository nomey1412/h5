/**
 * Created by huozhenguang on 2018/1/17.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
export default {
    namespace:'confirmRepay',
    state:{
        coupon_count:0,
        consume_amount:0,
        bank_card_num:'',
        bank_name:'',
        coupon_free_money:'',
        overdue_amount:'', // 逾期金额
        consume_id:'', // 账单ID
        id:'', // 订单子ID
        repay_date:'', // 最后还款时间
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
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                couponId:payload.couponId ? payload.couponId : (window.localStorage.getItem('changeCouponId') ? window.localStorage.getItem('changeCouponId') : ''),
                consumeId:window.localStorage.getItem('iousBillConsumeId'),
            }
            let result = yield call(getData('getRepayInfo') , { payload });
            if(result && result.code === 0){
                payload.param = {
                    customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '672',
                    consume_id:result.data.consume_id,
                    couponId:window.localStorage.getItem('changeCouponId') ? window.localStorage.getItem('changeCouponId') : ''
                }
                //请求？接口
                let result_other = yield call(getData('getRepaymentDetails') , { payload});
                yield put({
                    type:'querySuccess',
                    payload:{
                        coupon_count:result.data.coupon_count,
                        consume_amount:parseInt(result.data.consume_amount) + parseInt(result.data.overdue_amount),
                        bank_card_num:result.data.bank_card_num,
                        bank_name:result.data.bank_name,
                        coupon_free_money:result.data.coupon_free_money,
                        overdue_amount:result.data.overdue_amount,
                        consume_id:result.data.consume_id,
                        id:result.data.id,
                        repay_date:result.data.repay_date,
                        dialog_list:result_other.code === 0 ? result_other.data.dialog_list : [],
                    }
                });
            }else{
                if(result){
                    Toast.info(result.msg);
                }
                return;
            }
        },
        *useCoupon({ payload } , { put , call}){
            const history = createHistory({
                forceRefresh:true
            });
            history.push({
                pathname: "/couponList"
            })
        },
        *sureRepay({ payload } , { put , call}){
            let changeCouponId = window.localStorage.getItem('changeCouponId');
            window.localStorage.removeItem('changeCouponId');
            window.localStorage.removeItem('confirmRepayConsumeId');
            window.localStorage.setItem('confirmRepayConsumeId',payload.consume_id);
            payload.param = {
                no_need_sign:true,
                customer_id:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '672',
                couponId:changeCouponId ? changeCouponId : '',
                paytype:1, // 支付渠道
                type:1, // 支付类型
                consume_data:[
                    {
                        consume_id:payload.consume_id,
                        type:5,
                        repay_date:'',
                        amount:'',
                        overdue_amount:'',
                        installment_history:[
                            {
                                id:payload.id,
                                repay_date:payload.repay_date,
                                amount:payload.consume_amount,
                                overdue_amount:payload.overdue_amount
                            }
                        ]
                    }
                ]
            }
            let result = yield call(getData('repaymentProcessing') , { payload });
            if(result && result.code === 0){
                const history = createHistory({
                    forceRefresh:true
                });
                history.push({
                    pathname: "/repayStatus"
                })
            }else{
                Toast.info(result.msg);
                return;
            }
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                coupon_count:payload.coupon_count,
                consume_amount:payload.consume_amount,
                bank_card_num:payload.bank_card_num,
                bank_name:payload.bank_name,
                coupon_free_money:payload.coupon_free_money,
                overdue_amount:payload.overdue_amount,
                consume_id:payload.consume_id,
                id:payload.id,
                repay_date:payload.repay_date,
                dialog_list:payload.dialog_list
            };
        }
    }
}