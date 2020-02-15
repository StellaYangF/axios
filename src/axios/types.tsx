import { AxiosInterceptorManager } from "./AxiosInterceptorManager";

export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT'|'delete' |'DELETE' | 'options' | 'OPTIONS';

// interface PlainObject {
//   [name: string]: any
// }

export interface AxiosRequestConfig {
  url?: string;
  method?: Methods;
  params?: any,
  // params: Record<string, any>,
  headers?: Record<string, any>,
  data?: Record<string, any>,
  timeout?: number,
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers? : Record<string, any>;
  config?: AxiosRequestConfig;
  request?: XMLHttpRequest;
}

// T表示promise变成功态的resolve的值resolve(value)
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  }
}