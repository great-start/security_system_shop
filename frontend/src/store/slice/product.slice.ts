import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { productService } from '../../services';
import { IProduct } from '../../interaces';

interface IProductState {
    products: IProduct[]
}

const initialState: IProductState = {
    products: [],
}

export const getAllProductsAsync = createAsyncThunk(
    'productSlice/getAllProductsAsync',
    async (_,{dispatch}) => {
        try {
            const { data } = await productService.getAll();
            dispatch(setAllProducts({ data }));
        } catch (e) {

        }
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setAllProducts:(state, action) => {
            state.products = action.payload.data;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getAllProductsAsync.pending, (state,action) => {
    //
    //     });
    //     builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
    //
    //     });
    //     builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
    //
    //     });
    // }
})

export const { setAllProducts } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;