import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Shop from './components/Shop/Shop';
import Install from './components/Install/Install';

const App: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route path={'shop/*'} element={<Shop />} />
                <Route path={'install'} element={<Install />} />
            </Route>
        </Routes>
    );
};

export default App;
