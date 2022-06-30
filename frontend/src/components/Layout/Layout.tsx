import React, { FC } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Layout;