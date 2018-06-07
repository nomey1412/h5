/**
 * Created by huozhenguang on 2018/1/10.
 */
import { getData } from '../services/hn';
import createHistory from "history/createBrowserHistory";
export default {
    namespace:'home',
    state:{
        bannerList:[],
        goodsList:[],
        taberType:1
    },

    subscriptions:{
        setup({ dispatch, history}){
            history.listen(location => {
                dispatch({
                    type:'query',
                    payload:{},

                });
                dispatch({
                    type:'queryDetail',
                    payload:{},
                });
            });
        },
    },

    effects:{
        *query({ payload }, { put, call }) {
            payload.param = {};
            let result = yield call(getData('banner'), { payload });
            if(result && result.code=="0"){
                yield put({
                    type:'querySuccess',
                    payload:{
                        data:result.data.banner_list,
                        query:payload
                    }
                });
            }
        },

        *queryDetail({ payload } , {put,call}){
            payload.param = {
                currentPage:1,
                pageSize:30
            };
            let result = yield call(getData('goodsList'),{ payload });
            if(result && result.code == '0'){
                yield put({
                    type:'queryGoodsList',
                    payload:{
                        data:result.data.list,
                        query:payload
                    }
                });
            }
        },
        *queryDetailNext({ payload} , {put,call}){
            const history = createHistory({
                forceRefresh:true
            });
            window.localStorage.removeItem('goodsId');
            window.localStorage.setItem('goodsId',payload.goods_id);
            history.push({
                pathname:'goods_detail'
            });
        },
        *changeTaber({ payload} , {put,call}){
            let pathname;
            const history = createHistory({
                forceRefresh:true
            });
            switch (payload.type){
                case 1:
                    pathname = '/home';
                    break;
                case 2:
                    pathname = '/mine';
                    break;
                default:
                    pathname = '';
            }
            history.push({
                pathname:pathname
            });
        }
    },

    reducers:{
        querySuccess(state,{ payload }){
            return {
                ...state,
                bannerList:payload.data,
            };
        },
        queryGoodsList(state,{ payload }){
            return {
                ...state,
                goodsList:payload.data
            }
        }
    },
}