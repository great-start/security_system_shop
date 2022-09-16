import React, { FC, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Tab, Tabs } from 'react-bootstrap';

import { protectedPages, urls } from '../../constants';
import { useAppSelector } from '../../hooks';
import './PersonalPage.css';
import {
  AdminData,
  Statistic,
  StoreManagement,
  UserData,
  UserInstallations,
  UserOrders,
} from '../../pages';

export const PersonalPage: FC = () => {
  const { isAuth, isLoading, isAdmin } = useAppSelector((state) => state.authReducer);
  const [key, setKey] = useState(isAdmin ? protectedPages.adminData : protectedPages.userData);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(isAuth, isLoading, isAdmin);

  useEffect(() => {
    const path = pathname.split('/')[2] || null;
    if (path && Object.keys(protectedPages).includes(path)) {
      navigate(protectedPages[path]);
      setKey(protectedPages[path]);
      return;
    }
    navigate(isAdmin ? protectedPages.adminData : protectedPages.userData);
  }, []);

  const changePage = (k: string) => {
    switch (k) {
      case protectedPages[k as string]:
        navigate(protectedPages[k as string]);
        setKey(protectedPages[k as string]);
    }
  };

  return isLoading ? (
    <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />
  ) : isAuth ? (
    isAdmin ? (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          changePage(k as string);
        }}
        className="tabs"
      >
        <Tab eventKey={protectedPages.adminData} title="Особист дані">
          {key !== protectedPages.storeManagement && key !== protectedPages.statistic && (
            <AdminData />
          )}
        </Tab>
        <Tab eventKey={protectedPages.storeManagement} title="Керування магазином">
          {key !== protectedPages.adminData && key !== protectedPages.statistic && (
            <StoreManagement />
          )}
        </Tab>
        <Tab eventKey={protectedPages.statistic} title="Статистика">
          {key !== protectedPages.storeManagement && key !== protectedPages.adminData && (
            <Statistic />
          )}
        </Tab>
      </Tabs>
    ) : (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          changePage(k as string);
        }}
        className="tabs"
      >
        <Tab eventKey={protectedPages.userData} title="Особисті дані">
          {key !== protectedPages.orders && key !== protectedPages.installations && <UserData />}
        </Tab>
        <Tab eventKey={protectedPages.orders} title="Замовлення">
          {key !== protectedPages.userData && key !== protectedPages.installations && (
            <UserOrders />
          )}
        </Tab>
        <Tab eventKey={protectedPages.installations} title="Роботи">
          {key !== protectedPages.userData && key !== protectedPages.orders && (
            <UserInstallations />
          )}
        </Tab>
      </Tabs>
    )
  ) : (
    <Navigate to={urls.auth} replace={true} />
  );
};
