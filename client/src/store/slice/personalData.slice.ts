import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { IProduct } from '../../interfaces';

export interface IOrderData {
    id: number;
    status: string;
    orderTime: string;
    Product: [
        {  product: IProduct;
            quantity: number
        }
    ]
}

interface IOrderState {
    orders: IOrderData[] | null;
    isLoading: boolean
}

const initialState: IOrderState = {
  orders: null,
  isLoading: true
}

export const getUserOrdersAsync = createAsyncThunk(
  'personalDataSlice/getAllOrders',
  async (_,{ dispatch} ) => {
    try {
      const { data } = await userService.getAllOrders();
      dispatch(setAllOrders({ data }))
    } catch (e) {
      console.log(e);
    }
  }
)

export const canselOrderAsync = createAsyncThunk(
  'personalDataSlice/canselOrderAsync',
  async (id: string,{ dispatch} ) => {
    try {
      await userService.canselOrder(id);
      const { data } = await userService.getAllOrders();
      dispatch(setAllOrders({ data }))
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
      state.isLoading = false;
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