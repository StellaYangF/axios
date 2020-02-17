# axios

## 简介
*Promise based HTTP client for the browser and node.js* 

`Axios` 是基于 Promise 的 HTTP 客户端，支持在浏览器端和 node.js 中使用。

其本质就是一个函数，即 `Axios.prototype.request` 函数（绑定 `AxiosInstance` 后的），同时合并 `Axios.prototype` 和 `AxiosInstance` 对象上的属性和方法。该函数内部实例化了一个 `XMLHttpRequest` 对象，调用相关 `API` 实现请求和响应，最终返回一个 `promise` 对象。

## 准备工作

### 首先，前端用 `npx create-react-app axios-app` 生成一个 `react` 项目

### 接下来，搭建用 `node` 搭建一个后台服务器
```js
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:3000',// 设置跨越 react web服务器 端口号 3000
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,name'
    });
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.get('/get', (req, res) => res.json(req.query));

app.post('/post', (req, res) => res.json(req.body));

app.post('/post_timeout', (req, res) => {
    let { timeout } = req.query;
    timeout = timeout ?  parseInt(timeout) : 0;
    setTimeout(() => res.json(req.body), timeout);
});

app.post('/post_status', (req, res) => {
    let { code } = req.query;
    code = code ? parseInt(code) : 200;
    res.statusCode = code;
    res.json(req.body);
});
app.listen(8000);
```

### `axios` 库实现前后端的交互

### 安装前后端需要的模块
- 前端库需要的模块
    - `qs` 调用 `qs.stringify(object)` 将参数 对象转为 查询字符串
    - `parseHeaders` 解析后端传入的请求头字符串 => 对象格式
- 后端
    - `express` 基于 `http` 实现的后端服务
    - `body-parser` 解析 json 请求体和表单请求体

```cmd
npx create-react-app axios-app
cd axios-app
yarn add axios qs parse-headers
yarn add express body-parser
```

## 使用 & 实现
### get request
发送 `get` 请求
#### 使用

```js
// index.js 文件
import axios from 'axios';

const user = {
    name: 'Stella',
    password: '123456',
}

const baseUrl = 'http://localhost:8000';

axios({
    url: `${baseUrl}/get`,
    params: user,
    method: 'get',
})
.then(response => console.log(response))
.catch(err => console.log(err))
```

#### 实现
接下来，来分析分析 `axios` 调用过程以及 `.then` 成功回调中接收的相应结果，很显然这里的 `axios` 函数调用后返回的是一个 `promise` 对象

src 目录下创建 axios 目录，并新增
-  Axios.js 
```js
import qs from 'qs';
import parseHeaders from 'parse-headers';

export default class Axios {
    request(config) {
       return this.dispatchRequest(config);
    }

    dispatchRequest(config) {
        // 解构
        let { url, params, method } = config;
        if (params && typeof params === 'object') {
           params = qs.stringify(params);
            // { name: 'Stella', password: '123456' } => "name=Stella&password=123456"
            url += `${url.includes("?") ? "&" : "?"}${params}`;
        }
        const request = new XMLHttpRequest();
        request.open(method, url, true);
        request.responseType = 'json'; // 相应 data 为 json 格式
        request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 0) {
          if (request.status >= 200 && request.status < 300) {
            let response= {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()), 、、 
              config,
              request,
            }
            resolve(response);
          } else {
            reject(new Error(`Request failed with status code ${request.status}`));
          }
        }
      }
    }

}
```

-  index.js
```js
import Axios from './Axios';

function createInstance() {
    const context = new Axios();
    const request = Axios.prototype.request.bind(context); // 绑定 request this 永远指向当前实例
    const instance = Object.assign(request, context.prototype, context);
    // 合并 Axios 原型对象 和 实例属性到 request 函数对象上。
    return instance;
}

const instance = createInstance();

export default instance;
```

### TODO ...

### post request
### error handling
### merge options
### transform request & response
### intercept request & response
### cancel request