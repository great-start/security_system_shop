import React from 'react';
import { Button, Card, CardGroup, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import css from './Basket.module.css';

export const Basket = () => {

    const { products, sum } = useAppSelector(state => state.basketReducer);
    const dispatch = useAppDispatch();

    return (
        <Card border='light' className={css.basket}>
            <Card.Header style={{marginBottom: '20px'}}>
                <Card.Title>Кошик</Card.Title>
            </Card.Header>

            {products && products.map(product => <Card
                className="d-flex flex-row"
                key={product.id}>
                <Card.Body className="border-none">{product.name}</Card.Body>
                <div style={{alignSelf: 'center', marginRight: '10px'}}>{product.price} грн.</div>
            </Card>)}

            <p style={{alignSelf: 'end', marginRight: '10px', marginTop: '10px'}}>Загальна сумма покупки: {sum} грн.</p>

            <Modal.Footer>
                <Button variant="outline-secondary">Продовжити покупки</Button>
                <Button variant="outline-success">Оформити замовлення</Button>
            </Modal.Footer>
        </Card>
    );
};
