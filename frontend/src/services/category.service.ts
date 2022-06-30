import { axiosService } from './axios.service';

import { urls } from '../constants';
import { ICategory } from '../interaces';

export const categoryService = {
    getAll: () => axiosService.get<ICategory[]>(urls.categories),
    getProductsByCategory: (category: string) => axiosService.get<ICategory[]>(`${urls.categories}/${category}`)
}