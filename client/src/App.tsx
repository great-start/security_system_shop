import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Install, Layout, Shop } from './components';
import { AuthPage, MainPage, ProductDetails, Basket, AdminPage, PersonalPage } from './pages';
import Order from './pages/Order/Order';
import GoogleAuth from './pages/GoogleAuth/GoogleAuth';
import UserData from './pages/UserData/UserData';
import UserInstallations from './pages/UserInstallations/UserInstallations';
import UserOrders from './pages/UserOrders/UserOrders';

const App: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>

                {/*public routes*/}
                <Route index element={<MainPage />} />
                <Route path={'shop'} element={<Shop />}>
                    <Route path={':category'} element={<Shop />} />
                </Route>
                <Route path={'product/:id'} element={<ProductDetails />} />
                <Route path={'install'} element={<Install />} />
                <Route path={'basket'} element={<Basket />} />
                <Route path={'auth'} element={<AuthPage />} />
                <Route path={'google-auth'} element={<GoogleAuth />} />
                <Route path={'order'} element={<Order />} />

                {/*protected routes*/}
                <Route path={'personal'} element={<PersonalPage />} >
                    <Route path={'userData'} element={<UserData />} />
                    <Route path={'installations'} element={<UserInstallations />} />
                    <Route path={'orders'} element={<UserOrders />} />
                </Route>
                <Route path={'admin'} element={<AdminPage />} />
            </Route>
        </Routes>
    );
};

export default App;
