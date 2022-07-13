import { API } from './axios.service';
import { urls } from '../constants';
import { IToken } from '../interaces';

export const userService = {
    signIn: (email: string, password: string) => API.post<IToken>(urls.signIn, { email, password }), 
    signUp: (firstName: string, lastName: string, email: string, password: string) => 
        API.post<IToken>(urls.signUp, { firstName, lastName, email, password }),
    logOut: () => API.post(urls.logout),
    checkAuth: () => API.post(urls.authCheck),
    getAll: () => API.get<any>(urls.user),
}