import { AxiosRequestConfig, AxiosResponse } from "./types";
import qs from 'qs';
import parseHeaders from 'parse-headers';

export default class Axios {
    request(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.dispatchRequest(config);
    }

    dispatchRequest(config: AxiosRequestConfig):Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            let { url, method, params } = config;
            let request: XMLHttpRequest = new XMLHttpRequest();
            if (params && typeof params === 'object') {
                params = qs.stringify(params);
                url +=  (url.indexOf('?') === -1 ? '?' : '&')  + params;
            }
            request.open(method, url, true);
            request.responseType = 'json';
            request.onreadystatechange = function() {
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
                        reject('Request failed');
                    }
                }
            }
            request.send();
        })
    }
}