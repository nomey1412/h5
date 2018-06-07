/**
 * Created by huozhenguang on 2018/1/15.
 */
import md5 from '../utils/md5';
import { hex_sha1 }  from '../utils/sha1';

/**
 * 获取sign值
 * @param param 参数
 * @return string
 */
export function getParams(param){

    delete param.sign;
    let times =  Date.parse(new Date()) / 1000;
    let type = '5';
    let token = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '';
    let key = 'secret@tianshen_mall#!$$.com';
    let params = objKeySort(param);
    let newStr = '';
    let newKey = Object.keys(params);
    for (var i=0;i<newKey.length;i++){
        let currentKey = newKey[i];
        let currentValue = params[currentKey];
        newStr += currentKey+'='+currentValue+'&';
    }
    let str = newStr.substring(0,newStr.length-1);
    let sign = hex_sha1(md5(str+key));
    param.sign = sign;
    let data = { 'token' : token, 'version' : '9.9.9', 'type' : type, 'timestamp' : times, 'data' : param};
    return data;

}

/**
 * json对象排序
 * @param obj
 * @returns {{}}
 */
function objKeySort(obj){
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}


function encParam(param){
    let key = 'secret@tianshen_mall#!$$.com';
    let newStr = '';
    let newKey = Object.keys(param);
    for (var i = 0; i < newKey.length; i++){
        let currentKey = newKey[i];
        let currentValue = param[currentKey];
        if(currentValue instanceof Array){
            console.log('-----===============');
            console.log(currentValue);
            currentValue = encParam(currentValue);
        }
        newStr += currentKey+'='+currentValue+'&';
    }
    let str = newStr.substring(0,newStr.length-1);
    console.log('--------sign------------');
    console.log(str);
    let sign = md5(str+key);
    return sign;
}
