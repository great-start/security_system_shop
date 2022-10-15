import { API } from './axios.service';

import { urls } from '../constants';
import { ICategory, IProduct, IType } from '../interfaces';

export const categoryTypeService = {
  getAll: {
    category: () => API.get<ICategory[]>(urls.categories),
    type: () => API.get<IType[]>(urls.types),
  },
  getProductsSortedByType: (type: number) => API.get<IProduct[]>(`${urls.types}/${type}`),
  addNew: {
    category: (category: string | undefined) => API.post<void>(urls.categories, { name: category }),
    type: (typeName: string, relatedCategoryId: number) =>
      API.post<void>(urls.types, { name: typeName, relatedCategoryId }),
  },
};
