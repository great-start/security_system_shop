import { axiosService } from './axios.service';

import { urls } from '../constants';
import { ICategory, IProduct } from '../interaces';

export const categoryService = {
    getAll: () => axiosService.get<ICategory[]>(urls.categories),
    getProductsByCategory: (category: string) => axiosService.get<IProduct[]>(`${urls.categories}/${category}`)
}