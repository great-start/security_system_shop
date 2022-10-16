import { API } from './axios.service';

import { urls } from '../constants';
import { IAddProduct, IProduct } from '../interfaces';

export const productService = {
  getAll: () => API.get<IProduct[]>(urls.product),
  getOne: (id: string) => API.get<IProduct>(`${urls.product}/${id}`),
  addOne: (product: Partial<IAddProduct>) => API.post<void>(urls.product, product),
  getProductsSortedByType: (typeId: number) =>
    API.get<IProduct[]>(`${urls.product}?typeId=${typeId}`),
};
