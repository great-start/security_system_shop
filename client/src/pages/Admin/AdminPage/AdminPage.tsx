import React, { FC, useEffect, useState } from 'react';
import { Spinner, Tab, Tabs } from 'react-bootstrap';
import { adminPages, page } from '../../../constants';
import { UserData } from '../../User/UserData/UserData';
import { UserOrders } from '../../User/UserOrders/UserOrders';
import { UserInstallations } from '../../User/UserInstallations/UserInstallations';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';

export const AdminPage: FC = () => {
  const [key, setKey] = useState(adminPages.adminData);
  const { isAuth, isLoading } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.split('/')[2];
    switch (path) {
      case adminPages[path]:
        navigate(adminPages[path]);
        setKey(adminPages[path]);
        break;
      default:
        navigate(adminPages.adminData);
        setKey(adminPages.adminData);
    }
  }, []);

  const changePage = (k: string | null) => {
    console.log(k);
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
      <Tab eventKey={page.orders} title="Категорії та товари">
        {key !== page.userData && key !== page.installations && <UserOrders />}
      </Tab>
      <Tab eventKey={page.installations} title="Статистика">
        {key !== page.userData && key !== page.orders && <UserInstallations />}
      </Tab>
    </Tabs>
  ) : (
    <Navigate to={'/auth'} replace={true} />
  );
};
