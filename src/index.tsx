import axios, { AxiosResponse, AxiosRequestConfig } from './axios';
interface User {
    username: string;
    password: string;
}

const user: User = {
    username: 'stella',
    password: '123456',
}

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios({
    method: 'get',
    baseURL: 'http://localhost:8080',
    url: '/post_timeout?timeout=2000',
    timeout: 3000,
    cancelToken: source.token,
}).then((response: AxiosRequestConfig | AxiosResponse<User>): User => {
    console.log(response);
    return response.data as User;
}).then((data: User): void => {
    console.log(data);
}).catch((error: any) => {
    let msg: string =  axios.isCancel(error) ? '请求取消': 'error';
    console.log(msg, error);
})


source.cancel('用户取消请求');

// axios.get<User>('/get',{
//     baseURL: 'http://localhost:8080',
//     params: user
// }).then((response: AxiosResponse<User>): void => {
//     console.log(response);
//     console.log(response.data);
// })