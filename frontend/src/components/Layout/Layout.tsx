import React, { FC } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Layout: FC = () => {
    return (
        <div>
            <Header/>
            <Container className="mt-5">
                <Outlet />
            </Container>
        </div>
    );
};

export default Layout;