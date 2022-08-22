import { API } from './axios.service';

import { urls } from '../constants';
import { ICategory, IProduct } from '../interfaces';

export const categoryService = {
  getAll: () => API.get<ICategory[]>(urls.categories),
  getProductsByCategory: (category: string) =>
    API.get<IProduct[]>(`${urls.categories}/${category}`),
};
