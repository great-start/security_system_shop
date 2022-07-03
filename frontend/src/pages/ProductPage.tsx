import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { productService } from '../services';
import { IProduct } from '../interaces';


export const ProductPage: FC = () => {

    const [product, setProduct] = useState<IProduct | null>(null);
    const location = useLocation();
    const state = location.state as IProduct;
    const { id } = useParams();

    useEffect(() => {
        async function getProduct() {
            if (!location.state) {
                const { data } = await productService.getOne(id as string);
                setProduct(data);
                return;
            }
            setProduct(state);
        }
        getProduct();
    },[])


    return ( product &&
        <div>
            <p>{JSON.stringify(product)}</p>
        </div>
    );
};
