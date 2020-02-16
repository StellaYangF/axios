import Axios from './Axios';
import { AxiosInstance } from './types';
import { CancelToken, isCancel } from './cancel';

function createInstance<T>(): AxiosInstance {
  let context: Axios<T> = new Axios();
  let instance = Axios.prototype.request.bind(context);
  instance = Object.assign(instance, Axios.prototype, context);
  return instance as AxiosInstance;
}

let axios = createInstance();
axios.CancelToken = new CancelToken();
axios.isCancel = isCancel;
export default axios;

export * from './types';