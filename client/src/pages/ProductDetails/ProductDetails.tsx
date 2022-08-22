import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { productService } from '../../services';
import { IProduct, Prod } from '../../interfaces';
import { baseURL } from '../../constants';
import { Button, Card } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks';
import { setProductToBasket } from '../../store';

export const ProductDetails: FC = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as IProduct;
  const { id } = useParams();
  const navigate = useNavigate();

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
  }, []);

  return (
    product && (
      <div>
        <h2>{product.name}</h2>
        <div style={{ display: 'flex' }}>
          <Card style={{ padding: '50px', marginTop: '30px' }}>
            <img
              style={{ display: 'block', backgroundColor: 'grey' }}
              alt={product.name}
              src={`${baseURL}/${product.image}`}
              width={400}
              height={400}
            />
          </Card>
          <div style={{ padding: '50px' }}>
            <p>{product.title}</p>
            <p>{product.price} грн.</p>
            <p>{Prod[`${product.status}` as keyof typeof Prod]}</p>
            <Button
              variant="success"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setProductToBasket(product));
                navigate(`/basket`, { state: product });
              }}
            >
              Купити
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
