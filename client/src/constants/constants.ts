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
  personalData: '/user/personal',
  getAllOrders: '/user/order',
  makeOrder: '/user/make-order',
  canselOrder: '/user/order',
  exchangeRates: '/exchange-rate',
  GOOGLE_AUTH_URL: 'http://localhost:5000/auth/google',
};

export const protectedPages: IPages = {
  userData: 'userData',
  orders: 'orders',
  installations: 'installations',
  adminData: 'adminData',
  storeManagement: 'storeManagement',
  statistic: 'statistic',
};

interface IPages {
  [index: string]: string;
}
