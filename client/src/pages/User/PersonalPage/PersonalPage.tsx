import React, { FC, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Tab, Tabs } from 'react-bootstrap';

import { useAppSelector } from '../../../hooks';
import { page } from '../../../constants';
import { UserData } from '../UserData/UserData';
import { UserOrders } from '../UserOrders/UserOrders';
import { UserInstallations } from '../UserInstallations/UserInstallations';
import './PersonalPage.css';

export const PersonalPage: FC = () => {
  const [key, setKey] = useState(page.userData);
  const { isAuth, isLoading } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname.split('/')[2]) {
      case page.userData:
        navigate(page.userData);
        setKey(page.userData);
        break;
      case page.orders:
        navigate(page.orders);
        setKey(page.orders);
        break;
      case page.installations:
        navigate(page.installations);
        setKey(page.installations);
        break;
      default:
        navigate(page.userData);
        setKey(page.userData);
    }
  }, []);

  const changePage = (k: string | null) => {
    switch (k) {
      case page.userData:
        navigate(page.userData);
        setKey(page.userData);
        break;
      case page.orders:
        navigate(page.orders);
        setKey(page.orders);
        break;
      case page.installations:
        navigate(page.installations);
        setKey(page.installations);
        break;
    }
  };

  return isLoading ? (
    <Spinner animation="border" variant="success" style={{ marginLeft: '120px' }} />
  ) : isAuth ? (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => {
        changePage(k);
      }}
      className="tabs"
    >
      <Tab eventKey={page.userData} title="Особист дані">
        {key !== page.orders && key !== page.installations && <UserData />}
      </Tab>
      <Tab eventKey={page.orders} title="Замовлення">
        {key !== page.userData && key !== page.installations && <UserOrders />}
      </Tab>
      <Tab eventKey={page.installations} title="Роботи">
        {key !== page.userData && key !== page.orders && <UserInstallations />}
      </Tab>
    </Tabs>
  ) : (
    <Navigate to={'/auth'} replace={true} />
  );
};
