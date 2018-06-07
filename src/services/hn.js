import map from '../config/route_map';
import urls from '../config/api';
import { getParams } from '../services/enc';
import request from '../utils/request';
import createHistory from "history/createBrowserHistory";

/**
 * 通用请求
 * @param {string} key 请求地址，参考urls中的key
 * @param {object} params 请求参数
 * @return {promise}
 */
export function getData(key) {

  return function({payload}){
    if(checkRouter(urls[key])){
      if(JSON.stringify(payload) == "{}") return;
      let result = JSON.stringify( getParams(payload.param)  );
      return request(urls[key], { body: result });
    }
  }
}


/**
 * 检查是否在当前路由的接口列表里
 * @param key
 * @returns {boolean}
 */
function checkRouter(key) {
  const history = createHistory();
  const router = history.location.pathname.replace('/','');
  if(!map[router])return false;
  const map_arr = map[router].split(',');
  for (var i = 0; i< map_arr.length; i++){
    if (map_arr[i] == key){
      return true;
    }
  }
  return false;
}