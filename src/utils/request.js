
import fetch from 'dva/fetch';
import { message } from 'antd-mobile';
import createHistory from "history/createBrowserHistory";
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import hosts from '../config/hosts';
const history = createHistory({forceRefresh:true});
function parseJSON(response) {
  return response.json();
}

function checkStatus(response, timer) {
  timer && clearTimeout(timer);
  timer = null;
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    //message.error(response.statusText)
    return Promise.reject(response.statusText)
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options={}) {
  let fheaders = new Headers();
  let hostname = '';
  let currentHost = window.location.host;
   hostname = hosts.development;
  // if(currentHost.indexOf('localhost')=== 0 || currentHost.indexOf('devxgh5') === 0){
  //    hostname = hosts.development;
  // }else if(currentHost.indexOf('prexgh5') === 0){
  //    hostname = hosts.prerelease;
  // }else if(currentHost.indexOf('xgh5') === 0){
  //    hostname = hosts.production;
  // }
  fheaders.append('X-Requested-With','XMLHttpRequest');
  fheaders.append("Content-Type", options.content_type || "application/json");

  options = Object.assign({
    method: options.method || 'POST',
    mode: 'cors', // 是否允许跨域请求，no-cors默认，same-origin同域，cors跨域
    headers : fheaders,
  }, options);
  if (options.data && !options.body) {
    options.body = options.data;
  }
  if (options.body && Object.prototype.toString.call(options.body) == '[object Object]') {
    let str = '';
    str = str.replace(/\&$/, '');
    if (/get/i.test(options.method)) {
      url += url.indexOf('?') > -1 ? '&' + str : '?' + str;
      delete options.body;
    }
    if (/post/i.test(options.method)) {
      if (options.headers['Content_Type'] == 'application/json') {
        options.body = JSON.stringify(options.body);
      }else{
        options.body = str;
      }
    }
  }

  // 添加请求超时
  let timeout = 30000, // 默认30秒超时
      abort = null,
      timer = null,
      abort_promise = new Promise((resolve, reject) => {
        abort = (msg) => {
          Toast.success("loading done", 10);
          return reject(new Error(`请求超时:${url}`));
        }
      }),
      promise = Promise.race([
        abort_promise,
        fetch(hostname+`${url}`, options).then(checkStatus)
            .then(function (res) {
              clearTimeout(timer);
              timer = null;
              Toast.hide();
              return res.json();
            })
            .then((data) => {
              if(data.code == '-2'){
                history.push({pathname: "/login"})
              }
              return data;
            })
      ]);

  Object.defineProperty(promise, 'timeout', {
    set: function (ts) {
      if ((ts = +ts)) {
        timeout = ts;
        timer = setTimeout(function () {
          abort('请求超时')
        }, timeout);
      }
    },
    get: function () {
      return timeout;
    }
  });
  promise.timeout = options.timeout || timeout;
  // Toast.success("loading", 10000);
  Toast.loading('加载中...', 1);
  return promise;

}


