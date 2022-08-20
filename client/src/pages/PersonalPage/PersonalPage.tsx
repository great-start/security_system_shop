import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate, } from 'react-router-dom';
import { Spinner, Tab, Tabs } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import './PersonalPage.css';
import { page } from '../../constants';

export const PersonalPage = () => {

    const [key, setKey] = useState(page.userData);
    const { isAuth, isLoading } = useAppSelector(state => state.authReducer);
    const { orders } = useAppSelector(state => state.personalDataReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();


    useEffect(() => {
        if (pathname.split('/')[2]) {
            switch (pathname.split('/')[2]) {
            case page.userData: navigate(page.userData); setKey(page.userData); break;
            case page.orders: navigate(page.orders); setKey(page.orders); break;
            case page.installations: navigate(page.installations); setKey(page.installations); break
            }
            return;
        }
        navigate(page.userData);
        setKey(page.userData)
    },[])

    const changePage = (k: string | null) => {
        switch (k) {
        case page.userData: navigate(page.userData); break;
        case page.orders: navigate(page.orders); break;
        case page.installations: navigate(page.installations); break
        }
    }

    if (isLoading) return <Spinner animation='border' variant='success' style={{ marginLeft: '120px' }} />;

    return (
        isAuth ?
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => { setKey(k as string); changePage(k) }}
                className="tabs">
                <Tab eventKey={page.userData} title="Особист дані">
                    <Outlet />
                    {/*<Container >Особисті дані p rjyntqythe</Container>*/}
                    {/*<Container >Особисті дані p rjyntqythe</Container>*/}
                </Tab>
                <Tab eventKey={page.orders} title="Замовлення">
                    <Outlet />
                    {/*<Outlet />*/}
                    {/*<Container>*/}
                    {/*    {orders && orders.map(order => */}
                    {/*        <p>{JSON.stringify(order)}</p>*/}
                    {/*    )}*/}
                    {/*</Container>*/}
                </Tab>
                <Tab eventKey={page.installations} title="Роботи">
                    <Outlet />

                    {/*<Container>Роботи</Container>*/}
                </Tab>
            </Tabs>
            : <Navigate to={'/auth'} replace={true} />
    );
};
