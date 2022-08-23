import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { categoryService, productService } from '../../services';
import { IProduct } from '../../interfaces';

interface IProductState {
  products: IProduct[];
}

const initialState: IProductState = {
  products: [],
};

export const getAllProductsAsync = createAsyncThunk(
  'productSlice/getAllProductsAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await productService.getAll();
      dispatch(setAllProducts({ data }));
    } catch (e) {}
  },
);

export const getProductsByCategoryAsync = createAsyncThunk(
  'productSlice/getProductsByCategoryAsync',
  async (category: string, { dispatch }) => {
    try {
      const { data } = await categoryService.getProductsByCategory(category);
      dispatch(setAllProducts({ data }));
    } catch (e) {}
  },
);

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload.data;
    },
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
});

export const { setAllProducts } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
