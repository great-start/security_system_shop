import { API } from './axios.service';

import { urls } from '../constants';
import { ICategory, IType } from '../interfaces';

export const categoryTypeService = {
  getAll: {
    category: () => API.get<ICategory[]>(urls.categories),
    type: () => API.get<IType[]>(urls.types),
  },
  addNew: {
    category: (category: string | undefined) => API.post<void>(urls.categories, { name: category }),
    type: (typeName: string, relatedCategoryId: number) =>
      API.post<void>(urls.types, { name: typeName, relatedCategoryId }),
  },
};
