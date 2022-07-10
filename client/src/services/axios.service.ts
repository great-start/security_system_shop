import axios from 'axios';

import { baseURL } from '../constants';

export const axiosService = axios.create({ baseURL });