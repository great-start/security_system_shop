import React, { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import css from './Auth.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { signInAsync } from '../../store/slice/auth.slice';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {

    const [authState, setAuthState] = useState(true);
    const dispatch = useAppDispatch();
    const { isAuth, isLoading } = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();

    const changeForm = (e: any) => {
        e.preventDefault();
        setAuthState(!authState);
    }

    const signIn = async (e: any) => {
        e.preventDefault();
        await dispatch(signInAsync({ email: e.target.email.value, password: e.target.password.value }));
        navigate('/personal');
    };

    return (
        <Container className={css.wrap}>
            <Card className={css.card}>
                <Card.Title style={{ margin: 'auto' }}>{!authState ? 'Sing Up' : 'Sign In'}</Card.Title>
                <Form className={css.form}  onSubmit={(e) => {
                    authState ? signIn(e) : console.log('register');
                }}>
                    <Form.Group className='mb-3' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Тута email :)' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type='password' placeholder='Тута пароль :)' />
                    </Form.Group>
                    {!authState && <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Підтвердити пароль</Form.Label>
                        <Form.Control type='password' placeholder='Повторіть пароль :)' />
                    </Form.Group>}
                    <Container className={'d-flex align-items-center justify-content-between p-0'}>
                        {authState ?
                            <p className='align-self-end' style={{ margin: '0' }}>Не зареєстровані?
                                <a href={''} onClick={changeForm}> Зареєструватись</a></p>
                            : <p className='align-self-end' style={{ margin: '0' }}>
                                <a href={''} onClick={changeForm}>Авторизуватись</a></p>}
                        {isLoading ? <Spinner animation="border" variant="secondary" style={{marginLeft: "120px"}}/> : null}
                        <Button variant='outline-success' type='submit' className='align-self-end'>
                            {authState ? 'Увійти' : 'Зареєструватись'}
                        </Button>
                    </Container>
                </Form>
            </Card>
        </Container>
    );
};
