import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout, PersonalPage } from './components';
import {
  AuthPage,
  MainPage,
  ProductDetails,
  Basket,
  Order,
  UserData,
  UserInstallations,
  UserOrders,
  AdminData,
  Statistic,
  StoreManagement,
  Shop,
  Install,
} from './pages';

const App: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        {/*public routes*/}
        <Route index element={<MainPage />} />
        <Route path={'shop'} element={<Shop />}>
          <Route path={':category'} element={<Shop />} />
        </Route>
        <Route path={'product/:id'} element={<ProductDetails />} />
        <Route path={'install'} element={<Install />} />
        <Route path={'basket'} element={<Basket />} />
        <Route path={'order'} element={<Order />} />
        <Route path={'auth'} element={<AuthPage />} />

        {/*protected routes*/}
        <Route path={'personal'} element={<PersonalPage />}>
          {/* user */}
          <Route path={'userData'} element={<UserData />} />
          <Route path={'installations'} element={<UserInstallations />} />
          <Route path={'orders'} element={<UserOrders />} />
          {/* admin */}
          <Route path={'adminData'} element={<AdminData />} />
          <Route path={'storeManagement'} element={<StoreManagement />} />
          <Route path={'statistic'} element={<Statistic />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
