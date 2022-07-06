import {configureStore, combineReducers} from '@reduxjs/toolkit';

import productReducer from './slice/product.slice';
import categoryReducer from './slice/category.slice';
import basketReducer from './slice/basket.slice';

const rootReducer = combineReducers({
    productReducer,
    categoryReducer,
    basketReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof storeSetup>
// export type AppDispatch = AppStore['dispatch']

export type AppDispatch = typeof store.dispatch;
