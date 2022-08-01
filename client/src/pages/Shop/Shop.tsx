import React, { FC, useEffect } from 'react';

import css from './Shop.module.css';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllProductsAsync, getProductsByCategoryAsync } from '../../store';
import { CategoryList, Product } from '../../components';

export const Shop: FC = () => {

    const { products } = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        const getProducts = async () => {
            if (params.category) {
                dispatch(getProductsByCategoryAsync(params.category));
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
