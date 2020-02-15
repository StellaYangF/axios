// import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios, { AxiosResponse } from './axios';

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