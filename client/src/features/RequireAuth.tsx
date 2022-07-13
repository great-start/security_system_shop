import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const RequireAuth: FC = () => {

    const { isAuth } = useAppSelector(state => state.authReducer);
    const location = useLocation();

    return (
        isAuth ?
            <div>
                <Outlet />
            </div> : <Navigate to={'/auth'} state={{ from: location }} replace={true} />
    );
};

export default RequireAuth;