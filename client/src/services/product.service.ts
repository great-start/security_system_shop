import { API } from './axios.service';
import { urls } from '../constants';
import { IProduct } from '../interfaces';

export const productService = {
    getAll: () => API.get<IProduct[]>(urls.product),
    getOne: (id: string) => API.get<IProduct>(`${urls.product}/${id}`)
}