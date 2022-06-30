import React, { FC, useEffect, useState } from 'react';

import { productService } from '../../services';
import { IProduct } from '../../interaces';
import Product from '../Product/Product';
import CategoryList from '../CategoryLIst/CategoryList';
import css from './Shop.module.css';

const Shop: FC = () => {

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(  () => {
        const getAll = async () => {
            const { data } = await productService.getAll();
            setProducts(data);
        }
        getAll();
    },[])

    return (
        <div style={{ display: 'flex'}}>
            <CategoryList />
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 20}}>
                <p>Сортувати: </p>
                <div className={css.products}>
                    {products && products.map(product => <Product key={product.id} product={product} />)}
                </div>
            </div>
        </div>
    );
};

export default Shop;