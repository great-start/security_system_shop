import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Install, Layout, Shop } from './components';
import {
  AuthPage,
  MainPage,
  ProductDetails,
  Basket,
  AdminPage,
  PersonalPage,
  GoogleAuth,
  Order,
  UserData,
  UserInstallations,
  UserOrders,
  AdminData,
  ManageCategoriesTypes,
  Statistic,
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
          <Route path={'userData'} element={<UserData />} />
          <Route path={'installations'} element={<UserInstallations />} />
          <Route path={'orders'} element={<UserOrders />} />
        </Route>

        {/*protected admin routes*/}
        <Route path={'admin'} element={<AdminPage />}>
          <Route path={'adminData'} element={<AdminData />} />
          <Route path={'categories-types'} element={<ManageCategoriesTypes />} />
          <Route path={'statistic'} element={<Statistic />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
