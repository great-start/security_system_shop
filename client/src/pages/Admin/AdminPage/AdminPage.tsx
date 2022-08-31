import React, { FC, useEffect, useState } from 'react';
import { Spinner, Tab, Tabs } from 'react-bootstrap';
import { adminPages } from '../../../constants';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { AdminData } from '../AdminData/AdminData';
import { Statistic } from '../Statistic/Statistic';
import { StoreManagement } from '../ManageProducts/StoreManagement';

export const AdminPage: FC = () => {
  const [key, setKey] = useState(adminPages.adminData);
  const { isAuth, isLoading } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.split('/')[2] || null;
    if (path) {
      Object.keys(adminPages).includes(path) ? navigate(adminPages[path]) : null;
      return;
    }
    navigate(adminPages.adminData);
  }, []);

  const changePage = (k: string) => {
    switch (k) {
      case adminPages[k as string]:
        navigate(adminPages[k as string]);
        setKey(adminPages[k as string]);
    }
  };

  return isLoading ? (
    <Spinner animation="border" variant="success" style={{ marginLeft: '120px' }} />
  ) : isAuth ? (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => {
        changePage(k as string);
      }}
      className="tabs"
    >
      <Tab eventKey={adminPages.adminData} title="Особист дані">
        {key !== adminPages.storeManagement && key !== adminPages.statistic && <AdminData />}
      </Tab>
      <Tab eventKey={adminPages.storeManagement} title="Категорії та товари">
        {key !== adminPages.adminData && key !== adminPages.statistic && <StoreManagement />}
      </Tab>
      <Tab eventKey={adminPages.statistic} title="Статистика">
        {key !== adminPages.storeManagement && key !== adminPages.adminData && <Statistic />}
      </Tab>
    </Tabs>
  ) : (
    <Navigate to={'/auth'} replace={true} />
  );
};
