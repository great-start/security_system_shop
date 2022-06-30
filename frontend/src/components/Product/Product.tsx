import React, { FC } from 'react';

import { IProduct } from '../../interaces';
import { baseURL } from '../../constants';
import css from './Product.module.css';

interface IProps {
    product: IProduct
}

const Product: FC<IProps> = ({ product: { id, name, image, price } }) => {

    return (
        <div className={css.product}>
            <img style={{display: 'block', margin: 'auto', backgroundColor: 'grey' }} src={`${baseURL}/${image}`} width={150} height={150} />
            <div>
                <p>{name}</p>
                <p>{price}</p>
            </div>
        </div>
    );
};

export default Product;