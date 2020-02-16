import { AxiosRequestConfig, AxiosResponse } from './types';
import AxiosInterceptorManager, { Interceptor, Interceptors } from './AxiosInterceptorManager';
import qs from 'qs';
import parseHeaders from 'parse-headers';

export default class Axios {
  public interceptors: Interceptors = {
    request: new AxiosInterceptorManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse>(),
  }

  request<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    let chain: Interceptor[] = [{
      onFulfilled: this.dispatchRequest,
      onRejected: undefined,
    }]
    this.interceptors.request.interceptors.forEach(interceptor => {
      interceptor && chain.unshift(interceptor);
    })
    this.interceptors.response.interceptors.forEach(interceptor => {
      interceptor && chain.push(interceptor);
    })

    let promise = Promise.resolve(config);

    while (chain.length) {
      let { onFulfilled, onRejected } = chain.shift()!;
      promise = promise.then(onFulfilled, onRejected);
    }
    
    return promise;
  }

  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let { method= 'get', url, params, data, headers, timeout = 0 } = config;
      let request = new XMLHttpRequest();
      if (params && typeof params == 'object') {
        params = qs.stringify(params);
        url += ((url!.indexOf('?') === -1 ? '?' : '&') + params);
      }
      request.open(method, url!, true);
      request.responseType = 'json';
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 0) {
          if (request.status >= 200 && request.status < 300) {
            let response: AxiosResponse<T> = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config,
              request,
            }
            resolve(response);
          } else {
            reject(new Error(`Request failed with status code ${request.status}`));
          }
        }
      }
      //  POST method
      headers && Object.keys(headers).forEach(key => request.setRequestHeader(key, headers![key]));
      let body: string | null = null;
      if (data && typeof data === 'object') body = JSON.stringify(data);

      /**
       * 错误处理
       *  - 网络异常 request.onerror
       *  - 超时异常 request.ontimeout
       *  - 错误状态码 request.status === 0
       */

      request.onerror = function() {
        reject(new Error(`net::ERR_INTERNET_DISCONNECTED`));
      }

      if (timeout) {
        request.timeout = timeout;
        request.ontimeout = function () {
          reject(new Error(`timeout of ${timeout}ms exceeded`))
        }
      }
      request.send(body);
    })
  }
}
