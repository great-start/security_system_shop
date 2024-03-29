import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { IProduct } from '../../interfaces';
import { AxiosError } from 'axios';

export interface IOrderData {
  id: number;
  status: string;
  orderTime: string;
  Product: [{ product: IProduct; quantity: number }];
}

export interface IPersonalData {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface IOrderState {
  personalData: IPersonalData | null;
  orders: IOrderData[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  personalData: null,
  orders: null,
  isLoading: false,
  error: null,
};

export const getUserOrdersAsync = createAsyncThunk(
  'personalDataSlice/getUserOrdersAsync',
  async (_, { dispatch }) => {
    try {
      const { data } = await userService.getAllOrders();
      dispatch(setAllOrders({ data }));
    } catch (e) {
      console.log(e);
    }
  },
);

export const canselOrderAsync = createAsyncThunk(
  'personalDataSlice/canselOrderAsync',
  async (id: string, { dispatch }) => {
    try {
      await userService.canselOrder(id);
      const { data } = await userService.getAllOrders();
      dispatch(setAllOrders({ data }));
    } catch (e) {
      console.log(e);
    }
  },
);

export const getPersonalDataAsync = createAsyncThunk<
  void,
  { isAdmin: boolean },
  { rejectValue: string }
>('personalDataSlice/getPersonalDataAsync', async ({ isAdmin }, { dispatch, rejectWithValue }) => {
  try {
    const { data } = isAdmin
      ? await userService.getPersonalData.admin()
      : await userService.getPersonalData.user();
    dispatch(setPersonalData({ data }));
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data as string);
  }
});

export const updatePersonalDataAsync = createAsyncThunk<
  void,
  { isAdmin: boolean; personalData: Partial<IPersonalData> },
  { rejectValue: string }
>(
  'personalDataSlice/updatePersonalDataAsync',
  async ({ isAdmin, personalData }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = isAdmin
        ? await userService.updatePersonalData.admin(personalData)
        : await userService.updatePersonalData.user(personalData);
      dispatch(setPersonalData({ data }));
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as string);
    }
  },
);

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

  extraReducers: (builder) => {
    builder.addCase(getPersonalDataAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPersonalDataAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getPersonalDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error as string;
    });
    builder.addCase(updatePersonalDataAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePersonalDataAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setAllOrders, setPersonalData } = personalDataSlice.actions;

const personalDataReducer = personalDataSlice.reducer;
export default personalDataReducer;
