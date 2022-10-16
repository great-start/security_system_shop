import { API } from './axios.service';

import { urls } from '../constants';
import { IAddProduct, IProduct } from '../interfaces';

export const productService = {
  getOne: (id: string) => API.get<IProduct>(`${urls.product}/${id}`),
  addOne: (product: Partial<IAddProduct>) => API.post<void>(urls.product, product),
  getAllProductsOrSortedBy: (typeId: number, categoryId: number) =>
    API.get<IProduct[]>(
      `${urls.product}${
        typeId ? `?typeId=${typeId}` : categoryId ? `?categoryId=${categoryId}` : ''
      }`,
    ),
};
