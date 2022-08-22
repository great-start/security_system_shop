import React, { FC, useEffect } from 'react';
import { Accordion, Button, Container, FormText, ListGroup, Spinner } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { canselOrderAsync, getUserOrdersAsync } from '../../store';
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

  console.log(orders);

  return !isLoading ? (
    <Accordion alwaysOpen>
      {orders &&
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
                            <FormText>{item.product.price*item.quantity} грн.</FormText>
                            <FormText>{item.quantity} шт.</FormText>
                          </Container>
                        </Container>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
                <Container>
                  <Button
                    variant={'outline-secondary'}
                    style={{ marginTop: '10px' }}
                    onClick={() => canselOrder(order.id)}
                  >
                  Відмінити
                  </Button>
                </Container>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        ))}
    </Accordion>
  ) : (
    <Spinner animation={'border'} variant="success" />
  );
};
