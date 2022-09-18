import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from '../Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkIsAuthAsync } from '../../store';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();
  const { authChecking } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(checkIsAuthAsync());
  }, []);

  return (
    <>
      {!authChecking && (
        <>
          <Header />
          <Container className="mt-5">
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
};
