import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';

import { productService } from '../../services';
import { ErrorsResponse, IAddProduct, IProduct } from '../../interfaces';
import { AxiosError } from 'axios';

interface IProductState {
  products: IProduct[];
  errors: null | [Record<string, any>] | Record<string, any>;
  isLoading: boolean;
  successfulResponce: boolean;
}

const initialState: IProductState = {
  products: [],
  errors: null,
  isLoading: false,
  successfulResponce: false,
};

export const getAllProductsOrSortedBy = createAsyncThunk<
  void,
  { [key: string]: number },
  { dispatch: Dispatch; rejectValue: ErrorsResponse }
>(
  'productSlice/getProductsByCategoryAsync',
  async ({ typeId, categoryId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await productService.getAllProductsOrSortedBy(typeId, categoryId);
      dispatch(setAllProducts({ data }));
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as ErrorsResponse);
    }
  },
);

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
      state.errors = null;
    });
    builder.addCase(addNewProductAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addNewProductAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message as [Record<string, any>];
    });
    builder.addCase(getAllProductsOrSortedBy.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(getAllProductsOrSortedBy.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload?.statusCode === 404) {
        state.products = [];
        state.errors = action.payload?.message as Record<string, any>;
      }
    });
  },
});

export const { setAllProducts, successfulResponce, clearState } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
