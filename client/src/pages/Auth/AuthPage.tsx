import React, { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import css from './Auth.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { signInAsync, signUpAsync } from '../../store/slice/auth.slice';
import { Navigate, useNavigate} from 'react-router-dom';

export const AuthPage = () => {

    const [authState, setAuthState] = useState(true);
    const dispatch = useAppDispatch();
    const { isLoading, errors, isAuth } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate();

    const changeForm = (e: any) => {
        e.preventDefault();
        setAuthState(!authState);
    };

    const signIn = async (e: any) => {
        e.preventDefault();
        await dispatch(signInAsync({ email: e.target.email.value, password: e.target.password.value }));
        navigate('/personal');
    };

    const signUp = async (e: any) => {
        e.preventDefault();
        await dispatch(signUpAsync({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }));
        setAuthState(!authState);
        navigate('/personal');
    };

    return (
        isAuth ? <Navigate to={'/personal'} replace={true} /> :
            <Container className={css.wrap}>
                <Card className={css.card}>
                    <Card.Title style={{ margin: 'auto', marginBottom: '20px' }}>{!authState ? 'Sing Up' : 'Sign In'}</Card.Title>
                    <Form
                        className={css.form}
                        onSubmit={(e) => {
                            authState ? signIn(e) : signUp(e);
                        }}
                    >
                        { !authState && <div className='d-flex justify-content-between'>
                            <Form.Group className='mb-3' controlId='firstName'>
                                <Form.Label>Ім`я</Form.Label>
                                <Form.Control type='text' placeholder='Сюди Ім`я' />
                                <Form.Text style={{ 'color': 'chocolate' }}>{errors && errors[0].email}</Form.Text>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='lastName'>
                                <Form.Label>Прізвище</Form.Label>
                                <Form.Control type='text' placeholder='Сюди Прізвище' />
                                <Form.Text style={{ 'color': 'chocolate' }}>{errors && errors[0].email}</Form.Text>
                            </Form.Group>
                        </div> }
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Тута email :)' />
                            <Form.Text style={{ 'color': 'chocolate' }}>{errors && errors[0].email}</Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type='password' placeholder='Тута пароль :)' />
                            <Form.Text style={{ 'color': 'chocolate' }}>{errors && errors[0].password}</Form.Text>
                        </Form.Group>
                        {/*{ !authState &&*/}
                        {/*    <Form.Group className='mb-3' controlId='formBasicEmail'>*/}
                        {/*        <Form.Label>Підтвердити пароль</Form.Label>*/}
                        {/*        <Form.Control type='password' placeholder='Повторіть пароль :)' />*/}
                        {/*    </Form.Group>*/}
                        {/*}*/}
                        <Container className={'d-flex align-items-center justify-content-between p-0'}>
                            {authState ? (
                                <p className='align-self-end' style={{ margin: '0' }}>
                  Не зареєстровані?
                                    <a href={''} onClick={changeForm}>
                                        {' '}
                    Зареєструватись
                                    </a>
                                </p>
                            ) : (
                                <p className='align-self-end' style={{ margin: '0' }}>
                                    <a href={''} onClick={changeForm}>
                    Авторизуватись
                                    </a>
                                </p>
                            )}
                            {isLoading ? (
                                <Spinner animation='border' variant='secondary' style={{ marginLeft: '120px' }} />
                            ) : null}
                            <Button variant='outline-success' type='submit' className='align-self-end'>
                                {authState ? 'Увійти' : 'Зареєструватись'}
                            </Button>
                        </Container>
                    </Form>
                </Card>
            </Container>
    );
};
