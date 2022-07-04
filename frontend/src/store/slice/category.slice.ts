import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../interaces';
import { categoryService } from '../../services';

interface ICategoryState {
    category: ICategory[]
}

const initialState: ICategoryState = {
    category: [],
}

export const getAllCategoryAsync = createAsyncThunk(
    'carSlice/getCategoryAsync',
    async (_,{dispatch}) => {
        try {
            const { data } = await categoryService.getAll();
            dispatch(setAllCategory({ data }));
        } catch (e) {

        }
    }
)

const categorySlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setAllCategory: (state, action) => {
            state.category = action.payload.data;
        }
    },
    extraReducers: (builder) => {


    },
})

export const { setAllCategory } = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
