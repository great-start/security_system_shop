import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Install, Layout, Shop } from './components';
import { AuthPage, MainPage, ProductPage } from './pages';

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
