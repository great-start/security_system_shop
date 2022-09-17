import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategory, IType } from '../../interfaces';
import { categoryTypeService } from '../../services';

interface ICategoriesTypesState {
  categories: ICategory[];
  types: IType[];
}

const initialState: ICategoriesTypesState = {
  categories: [],
  types: [],
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

const categoryReducer = categoryTypeSlice.reducer;
export default categoryReducer;
