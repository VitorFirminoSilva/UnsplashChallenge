import axios from 'axios';

let baseURL = "http://localhost:8080/";

const instance = axios.create({
    baseURL,
    timeout : 5000,
});

instance.interceptors.response.use(
    res => res,
    error => {
        if(!axios.isCancel(error)) {
            console.log(error.response.data);
        }
    }
);

export const api = instance;
