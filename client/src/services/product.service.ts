import { API } from './axios.service';
import { urls } from '../constants';
import { IProduct } from '../interaces';

export const productService = {
    getAll: () => API.get<IProduct[]>(urls.product),
    getOne: (id: string) => API.get<IProduct>(`${urls.product}/${id}`)
}