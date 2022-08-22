import React, { FC } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import css from './Basket.module.css';
import { useNavigate } from 'react-router-dom';
import { deleteProductInBasket, minusProduct, plusProduct } from '../../store';

export const Basket: FC = () => {
  const { products, sum, productsQuantity } = useAppSelector((state) => state.basketReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Card border="light" className={css.basket}>
      <Card.Header style={{ marginBottom: '20px' }}>
        <Card.Title>Кошик</Card.Title>
      </Card.Header>

      {products &&
        products.map((product) => (
          <Card className="d-flex flex-row" key={product.id}>
            <Card.Body className="border-none">{product.name}</Card.Body>
            <Button
              variant={'outline-secondary'}
              style={{ alignSelf: 'center', marginRight: '10px', border: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(minusProduct(product));
              }}
            >
              -
            </Button>
            <div style={{ alignSelf: 'center', marginRight: '10px' }}>
              {productsQuantity[product.id]}
            </div>
            <Button
              variant={'outline-secondary'}
              style={{ alignSelf: 'center', marginRight: '10px', border: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(plusProduct(product));
              }}
            >
              +
            </Button>
            <div style={{ alignSelf: 'center', marginRight: '10px' }}>
              {productsQuantity[product.id] * product.price} грн.
            </div>

            <Button
              variant="outline-secondary"
              style={{ alignSelf: 'center', marginRight: '10px', border: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteProductInBasket(product));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-x-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </Button>
          </Card>
        ))}

      <p style={{ alignSelf: 'end', marginRight: '10px', marginTop: '10px', fontWeight: 'bold' }}>
        Загальна сумма покупки: {sum} грн.
      </p>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={(e) => {
            e.preventDefault();
            navigate('/shop');
          }}
        >
          Продовжити покупки
        </Button>
        <Button
          variant="outline-success"
          onClick={(e) => {
            e.preventDefault();
            navigate('/order');
          }}
        >
          Оформити замовлення
        </Button>
      </Modal.Footer>
    </Card>
  );
};
