// import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios, { AxiosResponse, AxiosRequestConfig } from './axios';
// import { AxiosRequestConfig } from './axios';

const baseURL = 'http://localhost:8080';

export interface User {
  username: string;
  password: string;
}

const user: User = {
  username: 'Stella',
  password: '123456',
}

// axios<User>({
//   method: 'get',
//   url: baseURL + '/get',
//   params: user,
// })

/**
 ***************** handle errors
 *
// setTimeout(() => {
  axios({
    method: 'POST',
    // url: baseURL + '/post',
    // url: baseURL + '/post_timeout?timeout=3000', // 超时错误
    url: baseURL + '/post_status?code=300', // 状态码错误
    headers: {
      'Content-TYpe': 'application/json'
    },
    data: user,
    // timeout: 500,
  })
    .then((response: AxiosResponse<User>) => {
      console.log(response);
      return response.data;
    })
    .then((data: User) => {
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    })
// }, 5000);
*/

/**
 * ********** interceptors
 */
console.time('const');
// 请求拦截器 先进后出
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers!.name += '1';
  console.timeEnd('const');
  return config;
})
let request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers!.name += '2';
  return config;
})
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  // config.headers!.name += '3';
  return new Promise(resolve => {
    setTimeout(() => {
      config.headers!.name += '3';
      resolve(config);
    }, 3000);
  })
  // return Promise.reject('出错了');
})
axios.interceptors.request.eject(request);

axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.username += '1';
  return response;
}, err => Promise.reject(err));
let response = axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.username += '2';
  return response;
})
axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.username += '3';
  return response;
})
axios.interceptors.response.eject(response);


axios({
  method: 'post',
  url: baseURL + '/post',
  headers: {
    'name': 'stella',
    'content-type': 'application/json',
  },
  timeout: 1000,
  data: user
}).then((response: AxiosResponse) => {
  console.log(response);
  console.log(response.data);
}).catch(console.log);
