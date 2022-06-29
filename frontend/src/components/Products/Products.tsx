import React, { FC, useEffect, useState } from 'react';

import { productService } from '../../services';
import { IProduct } from '../../interaces';
import Product from '../Product/Product';

const Products: FC = () => {

    const [products, setProducts] = useState<IProduct[]>([]);

    // useEffect(  () => {
    //     productService.getAll()
    //         .then(value => setProducts(value.data))
    // },[])

    useEffect(  () => {
        const getAll = async () => {
            const { data } = await productService.getAll();
            setProducts(data);
        }
        getAll();
    },[])

    return (
        <div>
            {products && products.map(product => <Product key={product.id} product={product} />)}
       </div>
    );
};

export default Products;