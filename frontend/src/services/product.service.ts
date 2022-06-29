import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IProduct } from '../interaces';

export const productService = {
    getAll: () => axiosService.get<IProduct[]>(urls.products)
}