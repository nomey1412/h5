/**
 * Created by fengxiangfei on 2018/1/13.
 */
import { getData } from '../services/hn';
import {  Toast } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
const history = createHistory({forceRefresh:true});
export default {
    namespace:'confirmOrder',
    state:{
        goodsType: "",
        address: "",
        addressDetail: "",
        provinceId:"",
        cityId:"",
        countryId:"",
        goodsDesc: "",
        price: "",
        goodsMaxNum: "",
        goodsImage: "",
        freight: "",
        mineIous:"",
        addressId:"",
        totalNum:0,
        totalPrice:0
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
        *query({ payload },{ put, call}){
            payload.param = {
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                goodsId:window.localStorage.getItem('goodsId')
            };
            let confirm_order_detail = yield call(getData('confirmOrder'), { payload });
            if(confirm_order_detail && confirm_order_detail.code === 0){
                yield put({
                    type:'querySuccess',
                    payload:{
                        type:'query',
                        payload:{
                            goodsType: confirm_order_detail.data.goodsType,
                            address: confirm_order_detail.data.address,
                            addressDetail: confirm_order_detail.data.addressDetail,
                            provinceId:confirm_order_detail.data.provinceId,
                            cityId:confirm_order_detail.data.cityId,
                            countryId:confirm_order_detail.data.countryId,
                            goodsDesc: confirm_order_detail.data.goodsDesc,
                            price: confirm_order_detail.data.price,
                            goodsMaxNum: confirm_order_detail.data.goodsMaxNum,
                            goodsImage: confirm_order_detail.data.goodsImage,
                            freight: confirm_order_detail.data.freight,
                            mineIous:confirm_order_detail.data.mineIous,
                            addressId:confirm_order_detail.data.addressId,
                            query:payload
                        }
                    }
                });
            }

        },
        *add({ payload },{put , call}){
            yield put({
                type:'setAddReduce',
                payload:payload
            });

        },
        *minus({ payload },{put , call}){
            yield put({
                type:'setMinusReduce',
                payload:payload
            });
        },
        *queryNextConfirm({ payload },{put , call}){
            payload.param = {
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616',
                goodsType:payload.goodsType,
                goodsNum:payload.goodsNum,
                totalPrice:payload.totalPrice,
                freight:payload.freight,
                addressId:payload.addressId,
                goodsId:window.localStorage.getItem('goodsId')
            };
            let result = yield call(getData('commitConfirmOrder'),{payload});
            if(result.code === 0 && result){
                history.push({pathname: "/confirmPay"})
            }else{
                Toast.info(result.msg);
                return;
            }
        },
        *changeAddress({ payload },{put , call}){
            history.push({pathname: "/address"})
        },
        *JumpToHome({ payload },{put , call}){
           history.push({pathname:'/home'});
        }
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                goodsType: payload.payload.goodsType,
                address: payload.payload.address,
                addressDetail: payload.payload.addressDetail,
                provinceId:payload.payload.provinceId,
                cityId:payload.payload.cityId,
                countryId:payload.payload.countryId,
                goodsDesc: payload.payload.goodsDesc,
                price: payload.payload.price,
                goodsMaxNum: payload.payload.goodsMaxNum,
                goodsImage: payload.payload.goodsImage,
                freight: payload.payload.freight,
                mineIous:payload.payload.mineIous,
                addressId:payload.payload.addressId,
                totalPrice:payload.payload.goodsType == 2 ? payload.payload.price * payload.payload.goodsMaxNum :payload.payload.price, // 虚拟商品取最大值
                totalNum:payload.payload.goodsMaxNum
            };
        },
        setAddReduce(state,{ payload }){
            return {
                ...state, // 1 真实商品 2 虚拟商品 若为1 等于单价 虚拟商品 为2 商品数量 * 商品单价
                totalPrice : state.goodsType == 1 ? state.price : (payload.minNum >= state.goodsMaxNum ?  state.price * state.goodsMaxNum : state.price * payload.minNum),
                totalNum : state.goodsType == 1 ? state.goodsMaxNum : (payload.minNum >= state.goodsMaxNum ? state.goodsMaxNum : payload.minNum)
            }
        },
        setMinusReduce(state,{ payload }){
            return {
                ...state,
                totalPrice: state.goodsType == 1 ? state.price : (state.goodsType == 2 && payload.minNum <= 1 ? state.price :payload.minNum * state.price),
                totalNum : payload.minNum <= 1 ? 1 : payload.minNum
            }
        }
    }
}