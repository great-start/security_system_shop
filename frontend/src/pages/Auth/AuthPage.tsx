import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import css from './Auth.module.css';

export const AuthPage = () => {

    const [authState, setAuthState] = useState(true);

    return (
        <Container className={css.wrap}>
            <Card className={css.card}>
                {!authState && <Card.Title className='mb-3'>Реєстрація</Card.Title>}
                <Form className={css.form}>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Тута email :)' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type='password' placeholder='Тута пароль :)' />
                    </Form.Group>
                    {!authState && <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Підтвердити пароль</Form.Label>
                        <Form.Control type='password' placeholder='Повторіть пароль :)' />
                    </Form.Group>}
                    <Container className={'d-flex align-items-center justify-content-between p-0'}>
                        {authState ?
                            <p className='align-self-end' style={{ margin: '0' }}>Не зареєстровані? <a href={''} onClick={e => {
                                e.preventDefault();
                                setAuthState(false);
                            }}>Зареєструватись</a></p>
                            : <p className='align-self-end' style={{ margin: '0' }}>
                                <a href={''} onClick={e => {
                                    e.preventDefault();
                                    setAuthState(true);
                                }}>Авторизуватись</a></p>}
                        <Button variant='outline-success' type='submit' className='align-self-end'
                                onClick={e => {
                                    e.preventDefault();
                                    authState ? console.log('auth') : console.log('register');
                                }}

                        >
                            {authState ? 'Увійти' : 'Зареєструватись'}
                        </Button>
                    </Container>
                </Form>
            </Card>
        </Container>
    );
};
