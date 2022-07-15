import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Tab, Tabs } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import './page.css';

export const PersonalPage = () => {

    const [key, setKey] = useState('home');
    const { isAuth } = useAppSelector(state => state.authReducer);

    return (
        isAuth ?
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k as string)}
                className="tabs"
            >
                <Tab eventKey="profile" title="Особист дані">
                    <Container >Особисті дані p rjyntqythe</Container>
                    <Container >Особисті дані p rjyntqythe</Container>
                </Tab>
                <Tab eventKey="home" title="Замовлення">
                    <Container>Замовлення</Container>
                </Tab>
                <Tab eventKey="contact" title="Роботи">
                    <Container>Роботи</Container>
                </Tab>
            </Tabs>
            : <Navigate to={'/auth'} replace={true} />
    );
};
