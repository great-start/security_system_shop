import {configureStore} from '@reduxjs/toolkit';
import productReducer from './product.slice';

const store = configureStore({
    reducer: {
        productReducer
    }
})

export default store;