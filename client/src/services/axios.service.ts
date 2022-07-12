import axios, {AxiosRequestConfig} from 'axios';

import { baseURL } from '../constants';

export const API = axios.create({ baseURL });

API.interceptors.request.use(async function(config: AxiosRequestConfig) {
    const { accessToken } = JSON.parse(localStorage.getItem('profile') as string);
    if (accessToken) {
        config.headers = {
            'Authorization': `Bearer ${accessToken}`,
        };
        return config;
    }
    return config;
});