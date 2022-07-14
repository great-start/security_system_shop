import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { AxiosError } from 'axios';
import { IToken } from '../../interaces';

interface IAuthState {
    user: {
        id: string;
        email: string
    };
    isAuth: boolean;
    errors: null | [{
        [key: string]: string
    }];
    isLoading: boolean;
    isSignInForm: boolean;
}

interface ErrorsResponse {
    error: string;
    message: [Record<string, any>];
    statusCode: number;
}

interface ISignUp {
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
    isAuth: false,
    errors: null,
    isLoading: false,
    isSignInForm: true,
}

export const signInAsync = createAsyncThunk<void, ISignIn, { rejectValue: ErrorsResponse}>(
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

export const signUpAsync = createAsyncThunk<void, ISignUp, { rejectValue: ErrorsResponse}>(
    'authSlice/signUpAsync',
    async ({ firstName, lastName,email,password}, { dispatch,rejectWithValue }) => {
        try {
            const { data } = await userService.signUp(firstName, lastName, email, password);
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
            if (localStorage.getItem('profile')) {
                const data = JSON.parse(localStorage.getItem('profile') as string) as IToken;
                dispatch(setCredentials({ data }));
            }
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
            state.user = action.payload.data.user;
            state.isAuth = true;
        },
        logout: (state) => {
            localStorage.removeItem('profile');
            state.isAuth = false;
        },
        changeAuthForm: state => {
            state.isSignInForm = !state.isSignInForm;
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(signInAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signInAsync.rejected, (state, action) => {
                if (action.payload) {
                    state.errors = action.payload?.message;
                    state.isLoading = false;
                }
            })
            .addCase(signInAsync.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(checkIsAuth.rejected, (state, action) => {
                if (action.payload) {
                    console.log(action.payload?.message);
                    state.isAuth = false;
                }
            })
            .addCase(signUpAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUpAsync.rejected, (state, action) => {
                if (action.payload) {
                    state.errors = action.payload?.message;
                    state.isLoading = false;
                }
            })
            .addCase(signUpAsync.fulfilled, (state) => {
                state.isLoading = false;
            })
    })
})

export const { setCredentials, logout, changeAuthForm } = AuthSlice.actions;

const authReducer = AuthSlice.reducer;
export default authReducer;