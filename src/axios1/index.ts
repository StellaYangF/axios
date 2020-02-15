import Axios from './Axios';
import { AxiosInstance } from './types';

function createInstance() {
    let context = new Axios();
    let instance = Axios.prototype.request.bind(context);
    instance = Object.assign(instance, Axios.prototype, context);
    return instance as AxiosInstance;
}

let instance: AxiosInstance = createInstance();

export default instance;
export * from './types';