import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';

import { categoryTypeService, productService } from '../../services';
import { IAddProduct, IProduct } from '../../interfaces';
import { ErrorsResponse } from './category.type.slice';

interface IProductState {
  products: IProduct[];
}

const initialState: IProductState = {
  products: [],
};

export const getAllProductsAsync = createAsyncThunk<void, void, { dispatch: Dispatch }>(
  'productSlice/getAllProductsAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await productService.getAll();
      dispatch(setAllProducts({ data }));
    } catch (e) {}
  },
);

export const getProductsByCategoryAsync = createAsyncThunk<
  void,
  { category: string },
  { dispatch: Dispatch }
>('productSlice/getProductsByCategoryAsync', async ({ category }, { dispatch }) => {
  try {
    const { data } = await categoryTypeService.getProductsByCategory(category);
    dispatch(setAllProducts({ data }));
  } catch (e) {}
});

export const addNewProductAsync = createAsyncThunk<
  void,
  Partial<IAddProduct>,
  { rejectValue: ErrorsResponse }
>('productSlice/addNewProductAsync', async (product, { rejectWithValue }) => {
  try {
    console.log(product);
    await productService.addOne(product);
  } catch (e) {}
});

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
