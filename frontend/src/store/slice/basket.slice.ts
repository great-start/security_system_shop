import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interaces';

interface IBasket {
    products: IProduct[];
    sum: number
}

const initialState: IBasket = {
    products: [],
    sum: 0
}

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {
        setProductToBasket: (state, action: PayloadAction<IProduct>) => {
            state.products.push(action.payload);
            state.sum = 0;
            state.products.forEach(product => {
                state.sum += product.price;
            })
        }
    }
})

export const { setProductToBasket } = basketSlice.actions;

const basketReducer = basketSlice.reducer;
export default basketReducer;