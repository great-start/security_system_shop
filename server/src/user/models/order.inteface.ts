import { IProduct } from 'src/product/models/product.interface';

export interface IOrder {
  productSum: {
    [key: string]: number;
  };
  products: IProduct[];
}
