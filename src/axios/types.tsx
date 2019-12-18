export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT'|'delete' |'DELETE' | 'options' | 'OPTIONS';

export interface AxiosRequestConfig {
  url: string;
  method: Methods;
  params: Record<string, any>
}

// T表示promise变成功态的resolve的值resolve(value)
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<T>
}