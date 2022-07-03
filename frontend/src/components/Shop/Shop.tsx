import React, { FC, useEffect } from 'react';

import css from './Shop.module.css';
import { useParams } from 'react-router-dom';
import { CategoryList } from '../CategoryList/CategoryList';
import { Product } from '../Product/Product';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCategoryAsync, getAllProductsAsync } from '../../store';

export const Shop: FC = () => {

    const { products } = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        const getProducts = async () => {
            if (params.category) {
                dispatch(getAllCategoryAsync);
                return;
            }
            dispatch(getAllProductsAsync());
        };
        getProducts();
    }, [params.category]);

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
