import React, { FC, useEffect, useState } from 'react';
import { Spinner, Tab, Tabs } from 'react-bootstrap';
import { adminPages, page } from '../../../constants';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { AdminData } from '../AdminData/AdminData';
import { ManageCategoriesTypes } from '../ManageCategoriesTypes/ManageCategoriesTypes';
import { Statistic } from '../Statistic/Statistic';

export const AdminPage: FC = () => {
  const [key, setKey] = useState(adminPages.adminData);
  const { isAuth, isLoading } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(isAuth);

  useEffect(() => {
    const path = pathname.split('/')[2] || null;
    if (path) {
      Object.keys(adminPages).includes(path) ? navigate(adminPages[path]) : null;
      return;
    }
    navigate(adminPages.adminData);
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
      <Tab eventKey={adminPages.adminData} title="Особист дані">
        {key !== adminPages.categories_types && key !== adminPages.statistic && <AdminData />}
      </Tab>
      <Tab eventKey={adminPages.categories_types} title="Категорії та товари">
        {key !== adminPages.adminData && key !== adminPages.statistic && <ManageCategoriesTypes />}
      </Tab>
      <Tab eventKey={adminPages.statistic} title="Статистика">
        {key !== adminPages.categories_types && key !== adminPages.adminData && <Statistic />}
      </Tab>
    </Tabs>
  ) : (
    <Navigate to={'/auth'} replace={true} />
  );
};
