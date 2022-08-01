import axios from 'axios';

import { baseURL, urls } from '../constants';
import { ITokenData } from '../interfaces';

export const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
    if (config.method !== 'OPTIONS') {
        if (localStorage.getItem('profile')) {
            const { accessToken } = JSON.parse(localStorage.getItem('profile') as string) as ITokenData;
            config.headers = {
                Authorization: `Bearer ${ accessToken }`,
            };
            return config;
        }
    }
    return config;
});

API.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const { refreshToken } = JSON.parse(localStorage.getItem('profile') as string) as ITokenData;
            const { data } = await axios.post(`${baseURL}${urls.refresh}`,null, {
                headers: {
                    Authorization: `Bearer ${ refreshToken }`,
                },
            });
            localStorage.setItem('profile', JSON.stringify(data));
            return API.request(originalRequest);
        } catch (e) {
            localStorage.removeItem('profile');
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
})