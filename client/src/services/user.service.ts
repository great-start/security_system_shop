import { API } from './axios.service';
import { urls } from '../constants';
import { ITokenData } from '../interfaces';
import { IOrder, IPersonalData } from '../store';
import { ISignUp } from '../store';

export const userService = {
  signIn: (email: string, password: string) =>
    API.post<ITokenData>(urls.signIn, { email, password }),
  signUp: ({ firstName, lastName, email, password }: ISignUp) =>
    API.post<ITokenData>(urls.signUp, { firstName, lastName, email, password }),
  logOut: () => API.post(urls.logout),
  checkAuth: () => API.post(urls.authCheck),
  googleAuth: (googleToken: string) => API.post(urls.googleAuth, { googleToken }),
  makeAnOrder: ({ productsQuantity, products }: IOrder) =>
    API.post<string>(urls.makeOrder, { productsQuantity, products }),
  getAllOrders: () => API.get(urls.getAllOrders),
  canselOrder: (id: string) => API.delete(`${urls.canselOrder}/${id}`),
  getPersonalData: () => API.get(urls.personalData),
  changePersonalData: ({ firstName, lastName }: Partial<IPersonalData>) =>
    API.patch(urls.personalData, { firstName, lastName }),
};
