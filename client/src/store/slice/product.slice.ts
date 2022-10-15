import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';

import { categoryTypeService, productService } from '../../services';
import { ErrorsResponse, IAddProduct, IProduct } from '../../interfaces';
import { AxiosError } from 'axios';

interface IProductState {
  products: IProduct[];
  errors: null | [Record<string, any>];
  isLoading: boolean;
  successfulResponce: boolean;
}

const initialState: IProductState = {
  products: [],
  errors: null,
  isLoading: false,
  successfulResponce: false,
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

export const getProductsSortedByType = createAsyncThunk<
  void,
  { typeId: number },
  { dispatch: Dispatch }
>('productSlice/getProductsByCategoryAsync', async ({ typeId }, { dispatch }) => {
  try {
    const { data } = await categoryTypeService.getProductsSortedByType(typeId);
    dispatch(setAllProducts({ data }));
  } catch (e) {}
});

export const addNewProductAsync = createAsyncThunk<
  void,
  Partial<IAddProduct>,
  { rejectValue: ErrorsResponse }
>('productSlice/addNewProductAsync', async (product, { rejectWithValue, dispatch }) => {
  try {
    const axiosResponse = await productService.addOne(product);
    axiosResponse.status === 201 ? dispatch(successfulResponce()) : null;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data as ErrorsResponse);
  }
});

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload.data;
    },
    successfulResponce: (state) => {
      state.successfulResponce = true;
    },
    clearState: (state) => {
      state.successfulResponce = false;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewProductAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewProductAsync.fulfilled, (state, payload) => {
      state.isLoading = false;
    });
    builder.addCase(addNewProductAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message as [Record<string, any>];
    });
  },
});

export const { setAllProducts, successfulResponce, clearState } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
