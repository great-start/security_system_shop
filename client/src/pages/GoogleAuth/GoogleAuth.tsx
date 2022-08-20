import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCredentialsAfterGoogleAuth } from '../../store';

export const GoogleAuth: FC = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function setCredentials () {
            await dispatch(setCredentialsAfterGoogleAuth(location.search));
        }

        setCredentials().then(() => window.close());
    },[])

    return (
        <div>
            'Thanks you for logging in'
        </div>
    );
};
