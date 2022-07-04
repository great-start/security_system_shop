import React from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import css from './Auth.module.css';

export const AuthPage = () => {
    return (
        <Container className={css.wrap}>
            <Card className={css.card}>
                <Form className={css.form}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>
                    <Button variant="outline-success" type="submit" className="mt-3 align-self-end">
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};
