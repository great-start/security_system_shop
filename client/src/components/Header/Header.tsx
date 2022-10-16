import React, { FC, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container, Nav, Spinner } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOutAsync } from '../../store';
import { urls } from '../../constants';
import { API } from '../../services';
import { IExchangeRate } from '../../interfaces';
import css from './Header.module.css';

export const Header: FC = () => {
  const { products, sum } = useAppSelector((state) => state.basketReducer);
  const { isAuth, user, isAdmin, authChecking } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate | null>(null);

  useEffect(() => {
    const getExchangeRates = async () => {
      const { data } = await API.get(urls.exchangeRates);
      setExchangeRate(data);
    };
    getExchangeRates();
  }, []);

  const logOut = (e: any) => {
    e.preventDefault();
    dispatch(logOutAsync());
  };

  const logIn = (e: any) => {
    e.preventDefault();
    navigate('/personal');
  };

  return (
    <div className={css.header}>
      <Container className={css.exchangeRate}>
        {exchangeRate ? (
          <>
            <p>{exchangeRate ? `USD ${exchangeRate[0].buy.slice(0, 5)}` : null}</p>
            <p>{exchangeRate ? `EUR ${exchangeRate[1].buy.slice(0, 5)}` : null}</p>
          </>
        ) : (
          <>
            <p>Currency exchange rate loading...</p>
          </>
        )}
      </Container>
      <Navbar
        style={{
          backgroundColor: 'rgba(123, 171, 231, 0.23)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container className="my-2">
          <Nav className={css.navLink}>
            <NavLink to={'/'} className={css.logo}>
              SECSYSTEMS
            </NavLink>
            <NavLink to={'/shop'} className={css.isActive ? css.activeClassName : undefined}>
              Магазин
            </NavLink>
            <NavLink to={'/install'} className={css.isActive ? css.activeClassName : undefined}>
              Послуги
            </NavLink>
          </Nav>
          <Nav className="ml-auto gap-3">
            {authChecking ? (
              <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />
            ) : null}
            <div className="m-auto" style={{ marginRight: 50, color: 'rgba(15,71,128,0.6)' }}>
              {isAuth && !isAdmin ? user.email : null}
            </div>
            {isAdmin ? (
              <div style={{ color: 'rgba(11,82,51,0.6)', alignSelf: 'center', fontWeight: 'bold' }}>
                Admin account
              </div>
            ) : (
              <Button
                style={{ color: 'black' }}
                className="ml-10"
                variant={'outline-secondary'}
                disabled={sum === 0}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/basket');
                }}
              >
                Кошик {sum !== 0 && products.length}
              </Button>
            )}
            {isAuth && (
              <Button
                variant={'outline-success'}
                onClick={(e) => {
                  navigate('/personal');
                }}
              >
                Кабінет
              </Button>
            )}
            <Button
              style={{ color: 'rgb(43,65,89)', fontWeight: 'bold' }}
              className="ml-10"
              variant={'outline-primary'}
              onClick={(e) => {
                !isAuth ? logIn(e) : logOut(e);
              }}
            >
              {!isAuth ? <>Кабінет</> : <>Вийти</>}
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
