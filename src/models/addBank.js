/**
 * Created by huozhenguang on 2018/2/7.
 */

import React from 'react';
import { getData } from '../services/hn';
import { Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
const history = createHistory({forceRefresh:true});
export default {
    namespace:'addBank',
    state : {
        bank_list:[],
        data:[]
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
                customer_id:window.localStorage.getItem('customerId')
            }
            let result = yield call(getData('getBankList') , { payload });
            let address_detail = yield call(getData('getProvinceOther') , { payload });
            if(address_detail && address_detail.code === 0){
                let provinceId = address_detail.data[0]['value'];
                payload.param = {
                    provinceId:provinceId,
                };
                let countryData;
                let cityList = yield call(getData('getCityOther'),{ payload });
                countryData = cityList.data;
                let cityId = cityList.data[0]['value'];
                payload.param = {
                    cityId:cityId
                };
                let countryList = yield call(getData('getCountryOther') , { payload });
                countryData.map(( item , i) => {
                    if(item.value === cityId){
                        item.children = countryList.data;
                    }
                });
                cityList.data = countryData;
                if(cityList && cityList.code === 0){
                    let province_data = address_detail.data;
                    province_data.map((item , i) => {
                        if(item.value == provinceId){
                            item.children = cityList.data;
                        }
                    });
                }
            }
            if(result && result.code === 0){
                yield put({
                    type:'querySuccess',
                    payload:{
                        bank_list:result.data.bank_list,
                        data:address_detail.data,
                    }
                });
            }
        },
        *city({ payload },{ put,call}){
            payload.param = {
                provinceId:payload.provinceId,
                cityId:payload.cityId
            }
            let countryData;
            let cityList = yield call(getData('getCityOther'),{ payload });
            if(payload.cityId){
                let countryList = yield call(getData('getCountryOther') , { payload });
                if(cityList && cityList.code === 0){
                    countryData = cityList.data;
                    countryData.map(( item , i) => {
                        if(item.value === payload.cityId){
                            item.children = countryList.data;
                        }
                    });
                    cityList.data = countryData;
                }
            }
            if(cityList && cityList.code === 0){
                let province_data = payload.data;
                province_data.map((item , i) => {
                    if(item.value == payload.provinceId){
                        item.children = cityList.data;
                    }
                });
                yield put({
                    type:'queryCity',
                    payload:{
                        newData:province_data,
                        query:payload
                    }
                });
            }
        },
        *bindCardSendSms({ payload } , { put , call}){ // 发送绑卡验证码
            payload.param = {
                customer_id: window.localStorage.getItem('customerId'),
                card_user_name:payload.card_user_name,
                bank_id: payload.bank_id,
                card_num: payload.card_num,
                reserved_mobile: payload.reserved_mobile,

            }
            let result = yield call(getData('bindCardSendSms') , { payload });
            if(result && result.code === 0){
                Toast.info('发送成功');
                return;
            }else{
                Toast.info(result.msg);
                return;
            }
        },
        *saveBankCard({ payload } , { put , call}){ // 保存银行卡
            payload.param = {
                customer_id: window.localStorage.getItem('customerId'),
                card_user_name:payload.card_user_name,
                bank_id: payload.bank_id,
                bank_name: "",
                province_id: payload.province_id,
                city_id: payload.city_id,
                card_num: payload.card_num,
                reserved_mobile: payload.reserved_mobile,
                verify_code: payload.verify_code,
                bind_type: history.location.search.substr(-1) //1添加银行卡，2更换银行卡

            }
            let result = yield call(getData('bindBankCard') , { payload });
            if(result && result.code === 0){
                //history.push({pathname:'/bankCardInfo'});
                history.goBack();
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
                bank_list : payload.bank_list,
                data : payload.data
            }
        },
        queryCity(state,{ payload }){
            return{
                ...state,
                data:payload.newData
            };
        }
    }
}
