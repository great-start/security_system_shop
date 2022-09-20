import React, { FC, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Tab, Tabs } from 'react-bootstrap';

import { protectedUserPages, protectedAdminPages, urls } from '../../constants';
import { useAppSelector } from '../../hooks';
import './Personal.Page.css';
import {
  AdminData,
  Statistic,
  StoreManagement,
  UserData,
  UserInstallations,
  UserOrders,
} from '../../pages';

export const PersonalPage: FC = () => {
  const { isAuth, isAdmin, authChecking } = useAppSelector((state) => state.authReducer);
  const [key, setKey] = useState<string>(
    isAdmin ? protectedAdminPages.adminData : protectedUserPages.userData,
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(isAdmin, isAuth, authChecking);
    if (!authChecking && isAuth) {
      const path = pathname.split('/')[2] || null;

      if (path) {
        if (isAdmin && Object.values(protectedUserPages).includes(path)) {
          navigate(protectedAdminPages.adminData);
          setKey(protectedAdminPages.adminData);
          return;
        }

        if (!isAdmin && !Object.values(protectedUserPages).includes(path)) {
          navigate(protectedUserPages.userData);
          setKey(protectedUserPages.userData);
          return;
        }

        navigate(isAdmin ? protectedAdminPages[path] : protectedUserPages[path]);
        setKey(isAdmin ? protectedAdminPages[path] : protectedUserPages[path]);
      }
    }
  }, [authChecking, pathname]);

  const changePage = (k: string) => {
    switch (k) {
      case isAdmin ? protectedAdminPages[k as string] : protectedUserPages[k as string]:
        navigate(isAdmin ? protectedAdminPages[k as string] : protectedUserPages[k as string]);
        setKey(isAdmin ? protectedAdminPages[k as string] : protectedUserPages[k as string]);
    }
  };

  if (authChecking)
    return <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />;

  if (!isAuth) return <Navigate to={urls.auth} replace={true} />;

  return isAdmin ? (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => {
        changePage(k as string);
      }}
      className="tabs"
    >
      <Tab eventKey={protectedAdminPages.adminData} title="Особист дані">
        {key !== protectedAdminPages.storeManagement && key !== protectedAdminPages.statistic && (
          <AdminData />
        )}
      </Tab>
      <Tab eventKey={protectedAdminPages.storeManagement} title="Керування магазином">
        {key !== protectedAdminPages.adminData && key !== protectedAdminPages.statistic && (
          <StoreManagement />
        )}
      </Tab>
      <Tab eventKey={protectedAdminPages.statistic} title="Статистика">
        {key !== protectedAdminPages.storeManagement && key !== protectedAdminPages.adminData && (
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
      <Tab eventKey={protectedUserPages.userData} title="Особисті дані">
        {key !== protectedUserPages.orders && key !== protectedUserPages.installations && (
          <UserData />
        )}
      </Tab>
      <Tab eventKey={protectedUserPages.orders} title="Мої замовлення">
        {key !== protectedUserPages.userData && key !== protectedUserPages.installations && (
          <UserOrders />
        )}
      </Tab>
      <Tab eventKey={protectedUserPages.installations} title="Роботи">
        {key !== protectedUserPages.userData && key !== protectedUserPages.orders && (
          <UserInstallations />
        )}
      </Tab>
    </Tabs>
  );
};
