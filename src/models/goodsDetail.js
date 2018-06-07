/**
 * Created by huozhenguang on 2018/1/12.
 */
import { getData } from '../services/hn';
import createHistory from "history/createBrowserHistory";
import {  Toast } from 'antd-mobile';
export default {
    namespace:'goodsDetail',
    state:{
        id:'', //商品ID
        imageList:[],
        description:'',
        iousDesc:'',
        name:'',
        price:'',
        attribute:''
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
                goodsId:window.localStorage.getItem('goodsId')
            };
            let goods_detail = yield call(getData('goodsDetail') , { payload });
            window.localStorage.removeItem('price');
            //window.localStorage.setItem('price',goods_detail.data.price ? goods_detail.data.price : 0);
            if(goods_detail && goods_detail.code === 0){
                yield put({
                    type:'querySuccess',
                    payload:{
                        type:'query',
                        payload:{
                            id:goods_detail.data.id,
                            imageList:goods_detail.data.imageList,
                            description:goods_detail.data.description,
                            iousDesc:goods_detail.data.iousDesc,
                            name:goods_detail.data.name,
                            description:goods_detail.data.description,
                            price:goods_detail.data.price,
                            attribute:goods_detail.data.attribute,
                            query:payload
                        }
                    }
                });
            }
        },
        *queryNext({ payload },{put,call}){
            payload.param = {
                goodsId:payload.goodsId,
                goodsType:payload.goodsType,
                customerId:window.localStorage.getItem('customerId') ? window.localStorage.getItem('customerId') : '616'
            }
            let result = yield call(getData('checkUserStatus') , { payload});
            if(result.code == 0){
                const history = createHistory({
                    forceRefresh:true
                });
                history.push({
                    pathname: "/confirmOrder"
                })
            }else{
                Toast.info(result.msg);
                return;
            }

        },
    },
    reducers:{
        querySuccess(state , { payload }){
            return {
                ...state,
                id:payload.payload.id,
                imageList:payload.payload.imageList,
                description:payload.payload.description,
                iousDesc:payload.payload.iousDesc,
                name:payload.payload.name,
                description:payload.payload.description,
                price:payload.payload.price,
                attribute:payload.payload.attribute
            };
        }
    }
}