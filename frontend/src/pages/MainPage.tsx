import React from 'react';
import Header from '../components/Header/Header';
import { Container } from 'react-bootstrap';
import CategoryList from '../components/CategoryLIst/CategoryList';
import Install from '../components/Install/Install';

const MainPage = () => {
    return (
        <Container className='mt-5'>
            <CategoryList />
            <Install />
        </Container>
    );
};

export default MainPage;