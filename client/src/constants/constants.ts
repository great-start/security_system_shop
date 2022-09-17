export const baseURL = 'http://localhost:5000';

export const urls = {
  product: '/product',
  categories: '/category',
  auth: '/auth',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  googleAuth: '/auth/google',
  logout: '/auth/logout',
  authCheck: '/auth/check',
  refresh: '/auth/refresh',
  user: '/user',
  userPersonal: '/user/personal',
  getAllOrders: '/user/order',
  makeOrder: '/user/make-order',
  canselOrder: '/user/order',
  adminPersonal: '/admin/personal',
  exchangeRates: '/exchange-rate',
};

export const protectedPages: IPages = {
  userData: 'userData',
  orders: 'orders',
  installations: 'installations',
  adminData: 'adminData',
  storeManagement: 'storeManagement',
  statistic: 'statistic',
};

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

interface IPages {
  [index: string]: string;
}
