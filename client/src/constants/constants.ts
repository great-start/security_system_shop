export const baseURL = 'http://localhost:5000';

export const urls = {
  product: '/product',
  categories: '/category',
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

export const page: IPages = {
  userData: 'userData',
  orders: 'orders',
  installations: 'installations',
};

export const adminPages: IPages = {
  adminData: 'adminData',
  categories_types: 'categories-types',
  statistic: 'statistic',
};

interface IPages {
  [index: string]: string;
}
