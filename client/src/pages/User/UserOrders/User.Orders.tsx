import React, { FC, useEffect } from 'react';
import { Accordion, Button, Container, FormText, ListGroup, Spinner } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { canselOrderAsync, getUserOrdersAsync, IOrderData } from '../../../store';
import css from './UserOrders.module.css';

export const UserOrders: FC = () => {
  const { orders, isLoading } = useAppSelector((state) => state.personalDataReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserOrdersAsync());
  }, []);

  const canselOrder = (id: number) => {
    dispatch(canselOrderAsync(String(id)));
  };

  const sum = (order: IOrderData) => {
    let sum = 0;
    order.Product.map((item) => {
      sum += item.product.price * item.quantity;
    });
    return sum;
  };

  return !isLoading ? (
    <Accordion alwaysOpen>
      {orders?.length ? (
        orders.map((order) => (
          <Accordion.Item key={order.id} eventKey={String(order.id)}>
            <Accordion.Header className={css.ordersHeader}>
              №<span>{order.id}</span>від
              <span>{order.orderTime}</span>
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <ListGroup>
                  {order.Product &&
                    order.Product.map((item) => (
                      <ListGroup.Item key={item.product.id}>
                        <Container className={css.item}>
                          <Container>
                            <FormText>{item.product.image}</FormText>
                            <FormText>{item.product.name}</FormText>
                          </Container>
                          <Container>
                            <FormText>{item.product.price * item.quantity} грн.</FormText>
                            <FormText>{item.quantity} шт.</FormText>
                          </Container>
                        </Container>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className={css.orderFooter}>
                  <Button
                    variant={'secondary'}
                    style={{ marginTop: '10px' }}
                    onClick={() => canselOrder(order.id)}
                  >
                    Скасувати замовлення
                  </Button>
                  <FormText>Загальна сумма {sum(order)} грн.</FormText>
                </div>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        ))
      ) : (
        <Container>У Вас поки що немає замовлень</Container>
      )}
    </Accordion>
  ) : (
    <Spinner animation={'grow'} variant="success" />
  );
};
