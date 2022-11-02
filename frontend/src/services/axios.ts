import axios from 'axios';
import { NoResponseError } from '../errors/NoResponseError';
import { ResponseError } from '../errors/ResponseError';
import { UnexpectedError } from '../errors/UnexpectedError';


let baseURL = process.env.AXIOSURL;

if (!baseURL && process.env.NODE_ENV !== 'production') {
    baseURL = 'http://localhost:8080';
}

const instance = axios.create({
    baseURL,
    timeout : 5000,
});

instance.interceptors.response.use(
    res => res,
    error => {
        if(!axios.isCancel(error)) {
            if(error.response) {
                throw new ResponseError(error.response.data, error.response.status);
            } else if (error.request) {
                throw new NoResponseError(error.stack);
            }
            throw new UnexpectedError(error.stack);
        }
    }
);

export const api = instance;

