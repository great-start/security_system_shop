import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategory, IType } from '../../interfaces';
import { categoryTypeService } from '../../services';
import { AxiosError } from 'axios';

interface ICategoriesTypesState {
  categories: ICategory[];
  types: IType[];
}

const initialState: ICategoriesTypesState = {
  categories: [],
  types: [],
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
  { action: string; body: string },
  { rejectValue: ErrorsResponse }
>('categoryTypeSlice/addNewAsync', async ({ action, body }, { rejectWithValue }) => {
  try {
    if (action === 'category') {
      await categoryTypeService.addNew.category(body);
    } else {
      await categoryTypeService.addNew.type(body);
    }
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data as ErrorsResponse);
  }
});

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
  // extraReducers: (builder) => {
  //
  //
  // },
});

export const { setAllCategories, setAllTypes } = categoryTypeSlice.actions;

const categoryTypeReducer = categoryTypeSlice.reducer;
export default categoryTypeReducer;
