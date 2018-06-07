/**
 * Created by huozhenguang on 2018/1/16.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";

export default {
    namespace:'address',
    state:{
        data:[],
        provinceList:[]
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
                customer_id:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616'
            };
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
                yield put({
                    type:'querySuccess',
                    payload:{
                        type:'query',
                        payload:{
                            data:address_detail.data,
                            query:payload
                        }
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
        *saveAddress({ payload },{ put,call}){
            console.log(payload);
            payload.param = {
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '672',
                provinceId:payload.provinceId,
                cityId:payload.cityId,
                countryId:payload.countryId,
                detailAddress:payload.detailAddress
            }
            let result = yield call(getData('saveGoodsAddress') , { payload });
            if(result && result.code === 0){
                const history = createHistory({
                    forceRefresh:true
                });
                history.push({
                    pathname: "/confirmOrder"
                })
            }else {
                Toast.info(result.msg);
                return;
            }
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                data:payload.payload.data
            };
        },
        queryCity(state,{ payload }){
            return{
                ...state,
                data:payload.newData
            };
        }
    }
}
