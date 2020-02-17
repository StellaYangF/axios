# axios

## 简介
*Promise based HTTP client for the browser and node.js* 

`Axios` 是基于 Promise 的 HTTP 客户端，支持在浏览器端和 node.js 中使用。

其本质就是一个函数，即 `Axios.prototype.request` 函数（绑定 `AxiosInstance` 后的），同时合并 `Axios.prototype` 和 `AxiosInstance` 对象上的属性和方法。该函数内部实例化了一个 `XMLHttpRequest` 对象，调用相关 `API` 实现请求和响应，最终返回一个 `promise` 对象。

## 剖析
### 类型声明
```js
class Axios {
    request() {

    }
}
```
### 实现

## 使用
### get request
### post request
### error handling
### merge options
### transform request & response
### intercept request & response
### cancel request