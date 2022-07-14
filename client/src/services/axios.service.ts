import axios, { AxiosRequestConfig } from 'axios';

import { baseURL } from '../constants';
import { IToken } from '../interaces';

export const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
    if (localStorage.getItem('profile')) {
        const { accessToken } = JSON.parse(localStorage.getItem('profile') as string) as IToken;
        config.headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        return config;
    }
    return config;
}, (error) => {
    console.log(error);
},
);