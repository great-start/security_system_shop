import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { userService } from '../../services';
import { ITokenData } from '../../interfaces';
import { Role } from '../../constants';

interface IAuthState {
  user: {
    id: string;
    email: string;
  };
  isAdmin: boolean;
  isAuth: boolean;
  errors: null | [Record<string, any>];
  error401: null | string;
  isSignInForm: boolean;
  authChecking: boolean;
}

interface ErrorsResponse {
  error: string;
  message: [Record<string, any>];
  statusCode: number;
}

interface Error401Response {
  message: string;
  statusCode: number;
}

export interface ISignUp extends ISignIn {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ISignIn {
  email: string;
  password: string;
}

const initialState: IAuthState = {
  user: {
    id: '',
    email: '',
  },
  isAdmin: false,
  isAuth: false,
  errors: null,
  error401: null,
  isSignInForm: true,
  authChecking: true,
};

export const signInAsync = createAsyncThunk<
  void,
  ISignIn,
  { rejectValue: ErrorsResponse | Error401Response }
>('authSlice/signInAsync', async ({ email, password }, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await userService.signIn(email, password);
    localStorage.setItem('profile', JSON.stringify(data));
    dispatch(setCredentials({ data }));
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data as ErrorsResponse | Error401Response);
  }
});

export const signUpAsync = createAsyncThunk<void, ISignUp, { rejectValue: ErrorsResponse }>(
  'authSlice/signUpAsync',
  async ({ firstName, lastName, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await userService.signUp({ firstName, lastName, email, password });
      localStorage.setItem('profile', JSON.stringify(data));
      dispatch(setCredentials({ data }));
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as ErrorsResponse);
    }
  },
);

export const checkIsAuthAsync = createAsyncThunk<void, void, { rejectValue: ErrorsResponse }>(
  'authSlice/checkIsAuthAsync',
  async (_: void, { dispatch, rejectWithValue }) => {
    try {
      if (localStorage.getItem('profile')) {
        console.log('checkIsAuthAsync');
        await userService.checkAuth();
        const data = JSON.parse(localStorage.getItem('profile') as string) as ITokenData;
        dispatch(setCredentials({ data }));
      }
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as ErrorsResponse);
    }
  },
);

export const logOutAsync = createAsyncThunk<void, void, { rejectValue: ErrorsResponse }>(
  'authSlice/logOutAsync',
  async (_: void, { dispatch, rejectWithValue }) => {
    try {
      await userService.logOut();
      dispatch(logout());
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as ErrorsResponse);
    }
  },
);

export const authWithGoogle = createAsyncThunk<void, string, { rejectValue: ErrorsResponse }>(
  'authSlice/authWithGoogle',
  async (token, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await userService.googleAuth(token);
      localStorage.setItem('profile', JSON.stringify(data));
      dispatch(setCredentials({ data }));
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data as ErrorsResponse);
    }
  },
);

export const AuthSlice = createSlice({
  name: 'authSLice',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.data.user;
      state.isAuth = true;
      if (action.payload.data.user.role === Role.ADMIN) {
        state.isAdmin = true;
      }
      state.authChecking = false;
    },
    logout: (state) => {
      localStorage.removeItem('profile');
      state.isAuth = false;
      state.errors = null;
      state.error401 = null;
      state.isAdmin = false;
    },
    changeAuthForm: (state) => {
      state.isSignInForm = !state.isSignInForm;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.authChecking = true;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        if (action.payload) {
          if (action.payload.statusCode !== 401) {
            state.errors = action.payload?.message as [Record<string, any>];
            state.error401 = null;
            state.authChecking = false;
            return;
          }
          state.errors = null;
          state.error401 = action.payload?.message as string;
          state.authChecking = false;
        }
      })
      .addCase(signInAsync.fulfilled, (state) => {
        state.authChecking = false;
      })
      .addCase(checkIsAuthAsync.pending, (state) => {
        state.authChecking = true;
      })
      .addCase(checkIsAuthAsync.rejected, (state) => {
        state.authChecking = false;
      })
      .addCase(checkIsAuthAsync.fulfilled, (state) => {
        state.authChecking = false;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.authChecking = true;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload?.message as [Record<string, any>];
          state.authChecking = false;
        }
      })
      .addCase(signUpAsync.fulfilled, (state) => {
        state.authChecking = false;
      });
  },
});

export const { setCredentials, logout, changeAuthForm } = AuthSlice.actions;

const authReducer = AuthSlice.reducer;
export default authReducer;
