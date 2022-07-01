import React, { FC, useEffect, useState } from 'react';

import { categoryService, productService } from '../../services';
import { IProduct } from '../../interaces';
import Product from '../Product/Product';
import CategoryList from '../CategoryLIst/CategoryList';
import css from './Shop.module.css';
import { useParams } from 'react-router-dom';

const Shop: FC = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const params = useParams();

    useEffect(  () => {
        const getProducts = async () => {
            if (params.category) {
                const { data } = await categoryService.getProductsByCategory(params.category);
                setProducts(data);
                return;
            }
            const { data } = await productService.getAll();
            setProducts(data);
        }
        getProducts();
    },[params])

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