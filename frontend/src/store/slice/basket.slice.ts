import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interaces';

interface IBasket {
    productSum: {
        [key: string]: number;
    };
    products: IProduct[];
    sum: number;
}

const initialState: IBasket = {
    productSum: {},
    products: [],
    sum: 0
}

const calculateSum = (state: IBasket) => {
    state.sum = 0;
    state.products.forEach(product => {
        state.sum += product.price;
    })
}

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
            console.log(current(state.productSum));
            calculateSum(state);
        },
        deleteProductInBasket: (state, action: PayloadAction<IProduct>) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
            calculateSum(state);
        },
    }
})

export const { setProductToBasket, deleteProductInBasket } = basketSlice.actions;

const basketReducer = basketSlice.reducer;
export default basketReducer;