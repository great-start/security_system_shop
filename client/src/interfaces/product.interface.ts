export interface IProduct {
    id: string
    name: string,
    title: string
    image: string,
    price: number,
    status: Prod;
}

export enum Prod {
    OUT_OF_STOCK = 'Немає в наявності',
    IN_STOCK = 'В наявності',
    RUNNING_LOW = 'Товар закінчується',
}

// export const ProductStatus: { [key: string]: string } = {
//     OUT_OF_STOCK: 'Немає в наявності',
//     IN_STOCK: 'В наявності',
//     RUNNING_LOW: 'Товар закінчується',
// }