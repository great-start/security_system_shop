import { IProduct } from 'src/product/models/product.interface';

export interface IOrder {
  productsQuantity: {
    [key: string]: number;
  };
  products: IProduct[];
}
