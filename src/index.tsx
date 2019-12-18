import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://localhost:8080';

export interface User {
  usrname: string;
  password: string;
}
const user:User= {
  usrname: 'xiangju',
  password: '123456',
}
axios({
  method: 'get',
  url: baseURL + '/get',
  params: user
}).then((response: AxiosResponse) => {
  console.log(response);
  return response.data;
}).then((data: User) => {
  console.log(data);
}).catch((err:any) => {
  console.log(err);
})