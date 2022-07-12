import axios, {AxiosRequestConfig} from 'axios';

import { baseURL } from '../constants';

export const API = axios.create({ baseURL });

API.interceptors.request.use(async function (config: AxiosRequestConfig) {
    const item = localStorage.getItem('profile');
    if (item) {
        return config.headers = {
            'Authorization': item as string,
        }
    }
    return config;
});