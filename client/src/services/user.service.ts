import { API } from './axios.service';
import { urls } from '../constants';
import { IProduct, ITokenData } from '../interfaces';
import { IBasket } from '../store';

export const userService = {
    signIn: (email: string, password: string) => API.post<ITokenData>(urls.signIn, { email, password }),
    signUp: (firstName: string, lastName: string, email: string, password: string) =>
        API.post<ITokenData>(urls.signUp, { firstName, lastName, email, password }),
    logOut: () => API.post(urls.logout),
    checkAuth: () => API.post(urls.authCheck),
    getAll: () => API.get<any>(urls.user),
    makeAnOrder: (productSum: { [p: string]: number }, products: IProduct[]) =>
        API.post<Partial<IBasket>>(urls.order, { productSum, products }),
}