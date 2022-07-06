import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const Basket = () => {

    const { products, sum } = useAppSelector(state => state.basketReducer);
    const dispatch = useAppDispatch();

    return (
        <Modal.Dialog >
            <Modal.Header>
                <Modal.Title>Кошик</Modal.Title>
            </Modal.Header>

            {products && products.map(product => <Card key={product.id}>
                <p>{product.name}</p>
                <p>{product.price}</p>
            </Card>)}

            <p>Загальна сумма покупки: {sum} грн.</p>

            <Modal.Footer>
                <Button variant="outline-secondary">Продовжити покупки</Button>
                <Button variant="outline-primary">Оформити замовлення</Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
};
