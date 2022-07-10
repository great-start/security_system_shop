import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from '../Header/Header';

export const Layout: FC = () => {
    return (
        <div>
            <Header/>
            <Container className="mt-5">
                <Outlet/>
            </Container>
        </div>
    );
};
