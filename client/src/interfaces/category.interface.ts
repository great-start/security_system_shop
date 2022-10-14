import { IType } from './type.interface';

export interface ICategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  Type: IType[];
}
