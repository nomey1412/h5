/**
 * Created by huozhenguang on 2018/1/15.
 */

import createHistory from "history/createBrowserHistory";
/**
 * 根据当前的链接获取json串
 * @param currentUrl
 * @return json
 */
export function changeJsonToArray(data){
    let len=eval(data).length;
    let arr=[],
        item=[];
    for(var i=0;i<len;i++){
        let newKey = Object.keys(data[i]);
        for(var r=0; r<newKey.length; r++){
            let currentKey = newKey[r];
            let currentValue = data[i][currentKey];
            item[currentKey] = currentValue;
        }
        arr[i] = item;
    }
    return arr;
}