import React, { FC, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Tab, Tabs } from 'react-bootstrap';

import { protectedUserPages, protectedAdminPage, urls } from '../../constants';
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
  const [key, setKey] = useState(
    isAdmin ? protectedAdminPage.adminData : protectedUserPages.userData,
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.split('/')[2] || null;
    if (
      path &&
      Object.keys(protectedAdminPage).includes(path) &&
      Object.keys(protectedAdminPage).includes(path)
    ) {
      if (isAdmin && Object.keys(protectedAdminPage).includes(path)) {
        navigate(protectedPages.adminData);
        return;
      }
      navigate(protectedPages[path]);
      setKey(protectedPages[path]);
      return;
    }
    navigate(isAdmin ? protectedAdminPage.adminData : protectedPages.userData);
  }, []);

  const changePage = (k: string) => {
    switch (k) {
      case isAdmin ? protectedAdminPage[k as string] : protectedUserPages[k as string]:
        navigate(isAdmin ? protectedAdminPage[k as string] : protectedUserPages[k as string]);
        setKey(isAdmin ? protectedAdminPage[k as string] : protectedUserPages[k as string]);
    }
  };

  return isAuth ? (
    isLoading ? (
      <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />
    ) : isAdmin ? (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          changePage(k as string);
        }}
        className="tabs"
      >
        <Tab eventKey={protectedAdminPage.adminData} title="Особист дані">
          {key !== protectedAdminPage.storeManagement && key !== protectedAdminPage.statistic && (
            <AdminData />
          )}
        </Tab>
        <Tab eventKey={protectedAdminPage.storeManagement} title="Керування магазином">
          {key !== protectedAdminPage.adminData && key !== protectedAdminPage.statistic && (
            <StoreManagement />
          )}
        </Tab>
        <Tab eventKey={protectedAdminPage.statistic} title="Статистика">
          {key !== protectedAdminPage.storeManagement && key !== protectedAdminPage.adminData && (
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
        <Tab eventKey={protectedPages.orders} title="Мої замовлення">
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
