import React, { FC } from 'react';

import { IProduct } from '../../interaces';
import { baseURL } from '../../constants';

interface IProps {
    product: IProduct
}

const Product: FC<IProps> = ({ product: { id, name, image } }) => {

    return (
        <div>
            <p>{id}</p>
            <p>{name}</p>
            <img src={`${baseURL}/${image}`} width={300} height={200}/>
        </div>
    );
};

export default Product;