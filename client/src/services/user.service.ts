import { API } from './axios.service';
import { urls } from '../constants';
import { IToken } from '../interaces';

export const userService = {
    signIn: (email: string, password: string) => API.post<IToken>(urls.signIn, { email, password })
}