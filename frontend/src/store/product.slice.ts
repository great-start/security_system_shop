import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'ProductSlice',
    initialState: {
        products: []
    },
    reducers: {

    }
})

export const reducer = productSlice.reducer;

const productReducer = productSlice.reducer;
export default productReducer;