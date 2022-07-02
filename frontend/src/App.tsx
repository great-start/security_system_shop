import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Shop from './components/Shop/Shop';
import Install from './components/Install/Install';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import AuthPage from './pages/AuthPage';

const App: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route index element={<MainPage />}/>
                <Route path={'shop'} element={<Shop />}>
                    <Route path={':category'} element={<Shop />} />
                </Route>
                <Route path={'product/:id'} element={<ProductPage />}/>
                <Route path={'install'} element={<Install />} />
                <Route path={'auth'} element={<AuthPage />} />
            </Route>
        </Routes>
    );
};

export default App;
