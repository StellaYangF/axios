type Method = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE';

export interface AxiosRequestConfig {
    url: string,
    method: Method,
    params?: any,
    headers?: Record<string, any>,
    data?: any,
}

export interface AxiosResponse<T> {
    data: T
    status: number
    statusText: string
    request?: XMLHttpRequest
    config?: AxiosRequestConfig
    headers?: Record<string, any>
}

export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
}
