import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services';



const initialState = {
    orders: [],
}

export const getUserOrdersAsync = createAsyncThunk(
    'personalDataSlice/getAllOrders',
    async (_,{ dispatch} ) => {
        try {
            const { data } = await userService.getAllOrders();
            dispatch(setAllOrders({data}))                   
        } catch (e) {
            console.log(e);
        }
    }
)

const personalDataSlice = createSlice({
    name: 'personalDataSlice',
    initialState,
    reducers: {
        setAllOrders: (state, action) => {
            state.orders = action.payload.data;
        }
    },
    // extraReducers: builder => {
    //
    // }
})

export const { setAllOrders } = personalDataSlice.actions;

const personalDataReducer = personalDataSlice.reducer;
export default personalDataReducer;