import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services';

interface IAuthState {
    user: string | null;
    isAuth: boolean
}

const initialState: IAuthState = {
    user: null,
    isAuth: false
}

export const signInAsync = createAsyncThunk(
    'authSlice/signInAsync',
    async ({ email, password }: {email: string, password: string}, {dispatch, rejectWithValue}) => {
        try {
            const { data } = await userService.signIn(email, password);
            localStorage.setItem('profile', JSON.stringify(data));
            dispatch(setCredentials({ data }))
        } catch (e) {
            rejectWithValue(e);
        }
    }
)

export const AuthSlice = createSlice({
    name: 'authSLice',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.isAuth = true;
        },
        logout: (state, action) => {

        }
    }
})

export const { setCredentials, logout } = AuthSlice.actions;

const authReducer = AuthSlice.reducer;
export default authReducer;