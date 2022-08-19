import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Tab, Tabs } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import './PersonalPage.css';
import { getUserOrdersAsync } from '../../store';

export const PersonalPage = () => {

    const [key, setKey] = useState('profile');
    const { isAuth } = useAppSelector(state => state.authReducer);
    const { orders } = useAppSelector(state => state.personalDataReducer);
    const dispatch = useAppDispatch();

    const changePage = (k: string | null) => {
        if (k === 'home') {
            dispatch(getUserOrdersAsync())
        }
    }

    return (
        isAuth ?
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => { setKey(k as string); changePage(k) }}
                className="tabs">
                <Tab eventKey="profile" title="Особист дані">
                    <Container >Особисті дані p rjyntqythe</Container>
                    <Container >Особисті дані p rjyntqythe</Container>
                </Tab>
                <Tab eventKey="home" title="Замовлення">
                    <Container>
                        {orders && orders.map(order => 
                            <p>{JSON.stringify(order)}</p>
                        )}
                    </Container>
                </Tab>
                <Tab eventKey="contact" title="Роботи">
                    <Container>Роботи</Container>
                </Tab>
            </Tabs>
            : <Navigate to={'/auth'} replace={true} />
    );
};
