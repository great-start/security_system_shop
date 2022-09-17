import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces';
import { categoryService } from '../../services';

interface ICategoryState {
  categories: ICategory[];
}

const initialState: ICategoryState = {
  categories: [],
};

export const getAllCategoryAsync = createAsyncThunk(
  'categorySlice/getCategoryAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await categoryService.getAll();
      dispatch(setAllCategory({ data }));
    } catch (e) {}
  },
);

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    setAllCategory: (state, action) => {
      state.categories = action.payload.data;
    },
  },
  // extraReducers: (builder) => {
  //
  //
  // },
});

export const { setAllCategory } = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
