import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategory, IType } from '../../interfaces';
import { categoryTypeService } from '../../services';
import { AxiosError } from 'axios';

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
      await setTimeout(async () => {
        const { data } = await categoryTypeService.getAll.category();
        dispatch(setAllCategories({ data }));
      }, 1000);
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
    if (action === 'newCategory') {
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
