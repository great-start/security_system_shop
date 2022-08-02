import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces';
import { userService } from '../../services';
import { AxiosError } from 'axios';

export interface IOrder {
    productSum: {
        [key: string]: number;
    };
    products: IProduct[];
}

export interface IBasket extends IOrder {
    productSum: {
        [key: string]: number;
    };
    products: IProduct[];
    sum: number;
    orderStatus: boolean;
}

interface ErrorsResponse {
    error: string;
    message: [Record<string, any>];
    statusCode: number;
}

const initialState: IBasket = {
    productSum: {},
    products: [],
    sum: 0,
    orderStatus: false,
}

const calculateSum = (state: IBasket) => {
    state.sum = 0;
    state.products.forEach(product => {
        state.sum += product.price * state.productSum[product.id];
    })
}

export const makeAnOrderAsync = createAsyncThunk<void, IOrder, { rejectValue: ErrorsResponse}>(
    'basketSlice/makeAnOrderAsync',
    async ({productSum, products},{ dispatch, rejectWithValue }) => {
        try {
            await userService.makeAnOrder(productSum, products);
            // dispatch(logout());
        } catch (err) {
            const error = err as AxiosError;
            return rejectWithValue(error.response?.data as ErrorsResponse);
        }
    }
)


const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {
        setProductToBasket: (state, action: PayloadAction<IProduct>) => {
            if (!state.products.some(item => item.id === action.payload.id)) {
                state.products.push(action.payload);
                state.productSum[action.payload.id] = 1;
            } else {
                state.productSum[action.payload.id] += 1;
            }
            calculateSum(state);
        },
        plusProduct: (state, action: PayloadAction<IProduct>) => {
            state.productSum[action.payload.id] += 1;
            calculateSum(state);
        },
        minusProduct: (state, action:PayloadAction<IProduct>) => {
            state.productSum[action.payload.id] ? state.productSum[action.payload.id] -= 1 : deleteProductInBasket(action.payload);
            calculateSum(state);
        },
        deleteProductInBasket: (state, action: PayloadAction<IProduct>) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
            calculateSum(state);
        },
        changeOrderStatus: (state) => {
            state.orderStatus = true;
        }
    }
})

export const { setProductToBasket, deleteProductInBasket, plusProduct, minusProduct } = basketSlice.actions;

const basketReducer = basketSlice.reducer;
export default basketReducer;