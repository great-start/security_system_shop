import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ICategory, IType } from '../../interfaces';
import { categoryTypeService } from '../../services';

interface ICategoriesTypesState {
  categories: ICategory[];
  types: IType[];
  isLoading: boolean;
}

const initialState: ICategoriesTypesState = {
  categories: [],
  types: [],
  isLoading: false,
};

interface ErrorsResponse {
  error: string;
  message: [Record<string, any>];
  statusCode: number;
}

export const getAllCategoriesAsync = createAsyncThunk(
  'categoryTypeSlice/getAllCategoriesAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await categoryTypeService.getAll.category();
      dispatch(setAllCategories({ data }));
    } catch (e) {}
  },
);

export const getAllTypesAsync = createAsyncThunk(
  'categoryTypeSlice/getAllTypesAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await categoryTypeService.getAll.type();
      dispatch(setAllTypes({ data }));
    } catch (e) {}
  },
);

export const addNewAsync = createAsyncThunk<
  void,
  { action: string; body: string | undefined },
  { rejectValue: ErrorsResponse }
>('categoryTypeSlice/addNewAsync', async ({ action, body }, { rejectWithValue }) => {
  try {
    await categoryTypeService.addNew.category(body);
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data as ErrorsResponse);
  }
});

export const addNewTypeAsync = createAsyncThunk<
  void,
  { attachedToCategory: string; type: string },
  { rejectValue: ErrorsResponse }
>(
  'categoryTypeSlice/addNewTypeAsync',
  async ({ attachedToCategory, type }, { rejectWithValue }) => {
    try {
      await categoryTypeService.addNew.type(attachedToCategory, type);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as ErrorsResponse);
    }
  },
);

const categoryTypeSlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload.data;
    },
    setAllTypes: (state, action) => {
      state.types = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesAsync.pending, (state, action) => {
        state.isLoading = true;
        console.log('pending');
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('fulfilled');
      });
  },
});

export const { setAllCategories, setAllTypes } = categoryTypeSlice.actions;

const categoryTypeReducer = categoryTypeSlice.reducer;
export default categoryTypeReducer;
