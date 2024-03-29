import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';

import css from './Order.module.css';
import { makeAnOrderAsync } from '../../store';

export const Order: FC = () => {
  const { products, productsQuantity, sum } = useAppSelector((state) => state.basketReducer);
  const dispatch = useAppDispatch();

  const makeAnOrder = (e: any) => {
    e.preventDefault();
    dispatch(makeAnOrderAsync({ productsQuantity, products }));
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Оформлення замовлення</h2>
      <div
        style={{
          display: 'flex',
          gap: '100px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '100%' }}>
          <Card border="info" style={{ width: '100%' }}>
            <Card.Header>Авторизація</Card.Header>
            <Card.Body>
              <Card.Title>Primary Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="info" style={{ width: '100%', marginTop: '30px' }}>
            <Card.Header>Контактні дані</Card.Header>
            <Card.Body>
              <Card.Title>Primary Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Card border="info" style={{ width: '100%' }}>
            <Card.Header>Замовлені товари</Card.Header>
            {products &&
              products.map((product) => (
                <Card className="d-flex flex-row border-none" key={product.id}>
                  <Card.Body className="border-none">{product.name}</Card.Body>
                  <div style={{ alignSelf: 'center', marginRight: '20px' }}>
                    {productsQuantity[product.id]}шт.
                  </div>
                  <div style={{ alignSelf: 'center', marginRight: '10px' }}>
                    {productsQuantity[product.id] * product.price} грн.
                  </div>
                </Card>
              ))}
            <p
              style={{
                alignSelf: 'end',
                marginRight: '10px',
                marginTop: '20px',
                fontWeight: 'bold',
              }}
            >
              Загальна сумма: {sum} грн.
            </p>
          </Card>
          <Button
            variant="outline-success"
            className={css.orderBtn}
            onClick={(e) => makeAnOrder(e)}
          >
            Замовити
          </Button>
        </div>
      </div>
    </div>
  );
};
