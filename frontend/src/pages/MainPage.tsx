import React from 'react';
import { Container } from 'react-bootstrap';
import { CategoryList, Install } from '../components';

export const MainPage = () => {
    return (
        <Container className='mt-5'>
            <CategoryList />
            <Install />
        </Container>
    );
};
