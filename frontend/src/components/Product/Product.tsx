import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IProduct } from '../../interaces';
import { baseURL } from '../../constants';
import css from './Product.module.css';
import { Button } from 'react-bootstrap';

interface IProps {
    product: IProduct
}

export const Product: FC<IProps> = ({ product}) => {

    const navigate = useNavigate();
    const { id, name, image, price } = product;

    return (
        <div className={css.product}>
            <img style={{ display: 'block', margin: 'auto', backgroundColor: 'grey' }}
                 src={`${baseURL}/${image}`} width={150} height={150} onClick={(e) => {
                e.preventDefault();
                navigate(`/product/${id}`, { state: product });
            }} />
            <div>
                <p>{name}</p>
                <p style={{ color: 'blue', fontSize: 'large' }}>{price} грн.</p>
                <Button variant='outline-secondary' onClick={(e) => {
                    e.preventDefault();
                    navigate(`/install`, { state: product });
                }}>Купити</Button>
            </div>
        </div>
    );
};
