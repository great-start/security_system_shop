import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from '../Header/Header';
import { useAppDispatch } from '../../hooks';
import { checkIsAuth } from '../../store/slice/auth.slice';

export const Layout: FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkIsAuth());
    },[])
  
    return (
        <div>
            <Header/>
            <Container className="mt-5">
                <Outlet/>
            </Container>
        </div>
    );
};
