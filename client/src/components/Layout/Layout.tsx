import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from '../Header/Header';
import { useAppDispatch } from '../../hooks';
import { checkIsAuthAsync } from '../../store';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkIsAuthAsync());
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Outlet />
      </Container>
    </>
  );
};
