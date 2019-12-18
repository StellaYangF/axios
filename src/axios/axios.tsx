import { AxiosRequestConfig } from './types';
import qs from 'qs';
import parseHeaders from 'parse-headers';

export default class Axios {
  request<T> (config: AxiosRequestConfig):Promise<T> {
    return this.dipatchRequest(config);
  }
  dipatchRequest<T>(config:AxiosRequestConfig):Promise<T>  {
    return new Promise<T>((resolve, reject) => {
      let {method, url, params} = config;
      let request = new XMLHttpRequest();
      if (params && typeof params == 'object') 
      {
        params = qs.stringify(params);
        url += ((url.indexOf('?') ? '&' : '?') + params);
      }
      request.open(method, url, true);
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 300) {
            let response = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
            }
          }
        }
      }
    })
  }
}