import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Install, Layout, Shop } from './components';
import { AuthPage, MainPage, ProductDetails, Basket, AdminPage, PersonalPage } from './pages';
import RequireAuth from './features/RequireAuth';

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

                {/*protected routes*/}
                <Route element={<RequireAuth />}>
                    <Route path={'personal'} element={<PersonalPage />} />
                    <Route path={'admin'} element={<AdminPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
