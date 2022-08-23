import React, { FC, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container, Nav, Spinner } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import css from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOutAsync } from '../../store';
import { urls } from '../../constants';
import { API } from '../../services';
import { IExchangeRate } from '../../interfaces';

export const Header: FC = () => {
  const { products, sum } = useAppSelector((state) => state.basketReducer);
  const { isAuth, user, isLoading } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate | null>(null);

  const logOut = (e: any) => {
    e.preventDefault();
    dispatch(logOutAsync());
  };

  useEffect(() => {
    const getExchangeRates = async () => {
      const { data } = await API.get(urls.exchangeRates);
      setExchangeRate(data);
    };
    getExchangeRates();
  }, []);

  return (
    <div className={css.header}>
      <Container className={css.exchangeRate}>
        <p>{exchangeRate ? `USD ${exchangeRate[0].buy.slice(0, 5)}` : null}</p>
        <p>{exchangeRate ? `EUR ${exchangeRate[1].buy.slice(0, 5)}` : null}</p>
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
            <NavLink
              to={'/'}
              className={css.navLink}
              style={{ marginRight: 50, color: 'rgba(5,71,129,0.6)', fontSize: 'large' }}
            >
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
            {isLoading ? (
              <Spinner animation="grow" variant="primary" style={{ marginLeft: '120px' }} />
            ) : null}
            <div className="m-auto" style={{ marginRight: 50, color: 'rgba(15,71,128,0.6)' }}>
              {isAuth && user.email}
            </div>
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
            <Button
              style={{ color: 'black' }}
              className="ml-10"
              variant={'outline-primary'}
              onClick={(e) => {
                e.preventDefault();
                navigate('/personal/userData');
              }}
            >
              Кабінет
            </Button>
            {isAuth && (
              <Button
                style={{ color: 'black' }}
                className="ml-10"
                variant={'outline-secondary'}
                onClick={logOut}
              >
                Вийти
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
