import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { productService } from '../../services';
import { IProduct, ProductStatus } from '../../interaces';
import { baseURL } from '../../constants';
import { Button, Card } from 'react-bootstrap';


export const ProductDetails: FC = () => {

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

    return (product &&
        <div>
            <h2>{product.name}</h2>
            <div style={{ display: 'flex'}}>
                <Card style={{padding: '50px', marginTop: '30px'}}>
                    <img style={{ display: 'block', backgroundColor: 'grey' }}
                        src={`${baseURL}/${product.image}`} width={400} height={400} />
                </Card>
                <div style={{padding: '50px'}}>
                    <p>{product.title}</p>
                    <p>{product.price} грн.</p>
                    <p>{ProductStatus[`${product.status}`]}</p>
                    <Button variant='success'>Купити</Button>
                </div>
            </div>
        </div>
    );
};
