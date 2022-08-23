import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { IProduct } from '../../interfaces';
import { AxiosError } from 'axios';

export interface IOrderData {
    id: number;
    status: string;
    orderTime: string;
    Product: [
        {  product: IProduct;
           quantity: number
        }
    ],
}

export interface IPersonalData {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface IOrderState {
  personalData: IPersonalData | null;
  orders: IOrderData[] | null;
  isLoading: boolean,
  error: string | null;
}

const initialState: IOrderState = { 
  personalData: null, 
  orders: null, 
  isLoading: false,
  error: null,
}

export const getUserOrdersAsync = createAsyncThunk(
  'personalDataSlice/getUserOrdersAsync',
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
      dispatch(setAllOrders({ data }));
    } catch (e) {
      console.log(e);
    }
  }
)

export const getPersonalDataAsync = createAsyncThunk<void, void, { rejectValue: string }>(
  'personalDataSlice/getPersonalDataAsync',
  async (_, { dispatch, rejectWithValue } ) => {
    try {
      const { data } = await userService.getPersonalData();
      dispatch(setPersonalData({ data }));
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as string);
    }
  }
)

export const changePersonalDataAsync = createAsyncThunk<void, Partial<IPersonalData>, { rejectValue: string }>(
  'personalDataSlice/changePersonalDataAsync',
  async ({ firstName, lastName}, { dispatch, rejectWithValue } ) => {
    try {
      const { data } = await userService.changePersonalData({ firstName, lastName });
      dispatch(setPersonalData({ data }));
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as string);
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
    },
    setPersonalData: (state, action) => {
      state.isLoading = false;
      state.personalData = action.payload.data;
    },
  },

  extraReducers: builder => {
    builder.addCase(getPersonalDataAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPersonalDataAsync.fulfilled, (state) => {
      state.isLoading = false;
      });
    builder.addCase(getPersonalDataAsync.rejected, (state,action) => {
      state.isLoading = false;
      state.error = action.error as string;
    })
  }
})

export const { setAllOrders, setPersonalData } = personalDataSlice.actions;

const personalDataReducer = personalDataSlice.reducer;
export default personalDataReducer;