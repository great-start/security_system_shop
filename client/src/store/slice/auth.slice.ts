import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { AxiosError } from 'axios';

interface IAuthState {
    user: string | null;
    isAuth: boolean;
    errors: null | [{
        [key: string]: string
    }];
    isLoading: boolean;
}

interface ErrorsResponse {
    error: string;
    message: [{}];
    statusCode: number;
}

const initialState: IAuthState = {
    user: null,
    isAuth: false,
    errors: null,
    isLoading: false
}

export const signInAsync = createAsyncThunk<void, { email: string, password: string }, { rejectValue: ErrorsResponse}>(
    'authSlice/signInAsync',
    async ({ email, password }, { dispatch,rejectWithValue }) => {
        try {
            const { data } = await userService.signIn(email, password);
            localStorage.setItem('profile', JSON.stringify(data));
            dispatch(setCredentials({ data }));
        } catch (err) {
            const error = err as AxiosError;
            return rejectWithValue(error.response?.data as ErrorsResponse);
        }
    }
)

export const checkIsAuth = createAsyncThunk<void, void,{ rejectValue: ErrorsResponse}>(
  'authSlice/checkIsAuth',
  async (_:void,{dispatch, rejectWithValue }) => {
      try {
          await userService.checkAuth();
          dispatch(setIsAuthTrue());
          console.log('checking');
      } catch (err) {
          const error = err as AxiosError;
          return rejectWithValue(error.response?.data as ErrorsResponse);
      }
  }
)

export const logOutAsync = createAsyncThunk<void, void,{ rejectValue: ErrorsResponse}>(
  'authSlice/logOutAsync',
  async (_:void,{ dispatch, rejectWithValue }) => {
     try {
      await userService.logOut();
      dispatch(logout());
     } catch (err) {
      const error = err as AxiosError;
       return rejectWithValue(error.response?.data as ErrorsResponse);
     }
  }
)

export const AuthSlice = createSlice({
    name: 'authSLice',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(action.payload.user);
            state.user = action.payload.user;
            state.isAuth = true;
        },
        logout: (state) => {
          localStorage.removeItem('profile');
          state.isAuth = false;
        },
        setIsAuthTrue: (state) => {
            state.isAuth = true;
        }
    },
    extraReducers: (builder => {
        builder
          .addCase(signInAsync.pending, (state, action) => {
              state.isLoading = true;
          })
          .addCase(signInAsync.rejected, (state, action) => {
              if (action.payload) {
                  state.errors = action.payload?.message;
                  state.isLoading = false;
              }
          })
          .addCase(signInAsync.fulfilled, (state, action) => {
              state.isLoading = false;
          })
          .addCase(checkIsAuth.rejected, (state, action) => {
            if (action.payload) {
              console.log(action.payload?.message);
              state.isAuth = false;
            }
          });
    })
})

export const { setCredentials, logout, setIsAuthTrue } = AuthSlice.actions;

const authReducer = AuthSlice.reducer;
export default authReducer;