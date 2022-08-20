import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Accordion, Button, Container, ListGroup, Spinner } from 'react-bootstrap';
import { canselOrderAsync, getUserOrdersAsync } from '../../store';
import css from './UserOrders.module.css';

export const UserOrders: FC = () => {

    const { orders, isLoading } = useAppSelector(state => state.personalDataReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserOrdersAsync());
    },[])

    const canselOrder = (id: number) => {
        dispatch(canselOrderAsync(String(id)))
    }

    console.log(orders);

    return (
        !isLoading ?
            <Accordion alwaysOpen>
                {orders && orders.map(order =>
                    <Accordion.Item key={order.id} eventKey={String(order.id)}>
                        <Accordion.Header className={css.ordersHeader}>№
                            <span>{order.id}</span>від
                            <span>{order.orderTime}</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <ListGroup>
                                    {order.Product && order.Product.map((item) =>
                                        <ListGroup.Item key={item.product.id}>{item.product.name} {item.quantity}</ListGroup.Item>
                                    )}
                                </ListGroup>
                                <Button variant={'outline-secondary'} onClick={() => canselOrder(order.id)}>Відмінити</Button>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion> 
            : <Spinner animation={'border'} variant='success' />
    );
};
