export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT'|'delete' |'DELETE' | 'options' | 'OPTIONS';

export interface AxiosRequestConfig {
  url: string;
  method: Methods;
  params: any
}

// T表示promise变成功态的resolve的值resolve(value)
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<T>
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers? : Record<string, any>;
  config?:AxiosRequestConfig;
  request?: XMLHttpRequest;
}