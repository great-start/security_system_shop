import React from 'react';
import { Outlet } from 'react-router-dom';

const RequireAuth = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default RequireAuth;