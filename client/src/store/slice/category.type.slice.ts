import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ErrorsResponse, ICategory, IType } from '../../interfaces';
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

export const addNewCategoryAsync = createAsyncThunk<
  void,
  { newCategory: string },
  { rejectValue: ErrorsResponse }
>('categoryTypeSlice/addNewCategoryAsync', async ({ newCategory }, { rejectWithValue }) => {
  try {
    await categoryTypeService.addNew.category(newCategory);
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data as ErrorsResponse);
  }
});

export const addNewTypeAsync = createAsyncThunk<
  void,
  { typeName: string; relatedCategoryId: number },
  { rejectValue: ErrorsResponse }
>(
  'categoryTypeSlice/addNewTypeAsync',
  async ({ typeName, relatedCategoryId }, { rejectWithValue }) => {
    try {
      await categoryTypeService.addNew.type(typeName, relatedCategoryId);
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
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setAllCategories, setAllTypes } = categoryTypeSlice.actions;

const categoryTypeReducer = categoryTypeSlice.reducer;
export default categoryTypeReducer;
