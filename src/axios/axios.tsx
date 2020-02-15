import { AxiosRequestConfig, AxiosResponse } from './types';
import qs from 'qs';
import parseHeaders from 'parse-headers';

export default class Axios {
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest(config);
  }
  
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let { method, url, params, data, headers } = config;
      let request = new XMLHttpRequest();
      if (params && typeof params == 'object') {
        params = qs.stringify(params);
        url += ((url.indexOf('?') === -1 ? '?' : '&') + params);
      }
      request.open(method, url, true);
      request.responseType = 'json';
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
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
            reject('请求失败');
          }
        }
      }
      headers &&  Object.keys(headers).forEach(key => request.setRequestHeader(key, headers![key]));
      let body: string | null = null;
      if (data && typeof data === 'object') body = JSON.stringify(data);
      request.send(body);
    })
  }
}
