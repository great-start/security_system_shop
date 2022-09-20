import { API } from './axios.service';

import { urls } from '../constants';
import { ICategory, IProduct, IType } from '../interfaces';

export const categoryTypeService = {
  getAll: {
    category: () => API.get<ICategory[]>(urls.categories),
    type: () => API.get<IType[]>(urls.types),
  },
  getProductsByCategory: (category: string) =>
    API.get<IProduct[]>(`${urls.categories}/${category}`),
  addNew: {
    category: (category: string | undefined) => API.post<void>(urls.categories, { name: category }),
    type: (type: string | undefined) => API.post<void>(urls.types, { name: type }),
  },
};
