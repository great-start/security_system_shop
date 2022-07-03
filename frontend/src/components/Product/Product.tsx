import React, { FC } from 'react';

import { IProduct } from '../../interaces';
import { baseURL } from '../../constants';
import css from './Product.module.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
    product: IProduct
}

export const Product: FC<IProps> = ({ product}) => {

    const navigate = useNavigate();
    const { id, name, image, price } = product

    return (
        <div className={css.product} onClick={(e) => {
            e.preventDefault();
            navigate(`/product/${id}`, {state: product })
        }}>
            <img style={{display: 'block', margin: 'auto', backgroundColor: 'grey' }} src={`${baseURL}/${image}`} width={150} height={150} />
            <div>
                <p>{name}</p>
                <p>{price}</p>
            </div>
        </div>
    );
};
