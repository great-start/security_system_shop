import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Shop from './components/Shop/Shop';
import Install from './components/Install/Install';
import MainPage from './pages/MainPage';

const App: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route index element={<MainPage />}/>
                <Route path={'shop'} element={<Shop />}>
                    <Route path={':category'} element={<Shop />} />
                </Route>
                <Route path={'install'} element={<Install />} />
            </Route>
        </Routes>
    );
};

export default App;
