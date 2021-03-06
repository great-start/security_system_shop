import React from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import css from './Auth.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeAuthForm, signInAsync, signUpAsync } from '../../store/slice/auth.slice';
import { Navigate, useNavigate} from 'react-router-dom';

export const AuthPage = () => {

    const dispatch = useAppDispatch();
    const { isLoading, errors, isAuth, isSignInForm } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate();

    const changeForm = (e: any) => {
        e.preventDefault();
        dispatch(changeAuthForm());
    };

    const signIn = async (e: any) => {
        try {
            e.preventDefault();
            await dispatch(signInAsync({
                email: e.target.email.value,
                password: e.target.password.value
            })).unwrap();
            navigate('/personal');
        } catch (e) {
        }
    };

    const signUp = async (e: any) => {
        try {
            e.preventDefault();
            await dispatch(signUpAsync({
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                password: e.target.password.value,
            })).unwrap();
            navigate('/personal');
        } catch (e) {
        }
    };

    return (
        isAuth ? <Navigate to={'/personal'} replace={true} /> :
            <Container className={css.wrap}>
                <Card className={css.card}>
                    <Card.Title style={{ margin: 'auto', marginBottom: '20px' }}>{isSignInForm ? 'Sign in' : 'Sign up'}</Card.Title>
                    <Form
                        className={css.form}
                        onSubmit={(e) => {
                            isSignInForm ? signIn(e) : signUp(e);
                        }}
                    >
                        { !isSignInForm && <div style={{display: 'flex', gap: '20px'}}>
                            <Form.Group className='mb-3' controlId='firstName'>
                                <Form.Label>????`??</Form.Label>
                                <Form.Control type='text' placeholder='???????? ????`??' />
                                <Form.Text style={{ 'color': 'chocolate' }}>{errors && errors[0].firstName}</Form.Text>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='lastName'>
                                <Form.Label>????????????????</Form.Label>
                                <Form.Control type='text' placeholder='???????? ????????????????' />
                                <Form.Text style={{ 'color': 'chocolate' }}>{errors && errors[0].lastName}</Form.Text>
                            </Form.Group>
                        </div> }
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='???????? email :)' />
                            <Form.Text style={{ 'color': 'chocolate' }}>{errors && errors[0].email}</Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>????????????</Form.Label>
                            <Form.Control type='password' placeholder='???????? ???????????? :)' />
                            <Form.Text style={{ 'color': 'chocolate' }}>{errors && errors[0].password}</Form.Text>
                        </Form.Group>
                        {/*{ !isSignInForm &&*/}
                        {/*    <Form.Group className='mb-3' controlId='formBasicEmail'>*/}
                        {/*        <Form.Label>?????????????????????? ????????????</Form.Label>*/}
                        {/*        <Form.Control type='password' placeholder='?????????????????? ???????????? :)' />*/}
                        {/*    </Form.Group>*/}
                        {/*}*/}
                        <Container className={'d-flex align-items-center justify-content-between p-0'}>
                            {isSignInForm ? (
                                <p className='align-self-end' style={{ margin: '0' }}>
                  ???? ???????????????????????????
                                    <a href={''} onClick={changeForm}>
                                        {' '}
                    ??????????????????????????????
                                    </a>
                                </p>
                            ) : (
                                <p className='align-self-end' style={{ margin: '0' }}>
                                    <a href={''} onClick={changeForm}>
                    ????????????????????????????
                                    </a>
                                </p>
                            )}
                            {isLoading ? (
                                <Spinner animation='border' variant='secondary' style={{ marginLeft: '120px' }} />
                            ) : null}
                            <Button variant='outline-success' type='submit' className='align-self-end'>
                                {isSignInForm ? '????????????' : '??????????????????????????????'}
                            </Button>
                        </Container>
                    </Form>
                </Card>
            </Container>
    );
};
