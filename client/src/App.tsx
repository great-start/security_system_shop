import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Install, Layout, PersonalPage, Shop } from './components';
import {
  AuthPage,
  MainPage,
  ProductDetails,
  Basket,
  GoogleAuth,
  Order,
  UserData,
  UserInstallations,
  UserOrders,
  AdminData,
  Statistic,
  StoreManagement,
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
        <Route path={'auth'} element={<AuthPage />} />
        <Route path={'google-auth'} element={<GoogleAuth />} />
        <Route path={'order'} element={<Order />} />

        {/*protected user routes*/}
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
