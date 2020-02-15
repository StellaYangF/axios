// import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios, { AxiosResponse } from './axios1';

const baseURL = 'http://localhost:8080';

export interface User {
  username: string;
  password: string;
}
const user: User= {
  username: 'Stella',
  password: '123456',
}
axios({
  method: 'get',
  url: baseURL + '/get',
  params: user,
}).then((response: AxiosResponse<User>) => {
  console.log(response);
  return response.data;
}).then((data: User) => {
  console.log(data);
}).catch((err:any) => {
  console.log(err);
})