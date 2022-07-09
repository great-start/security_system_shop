import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
    user: string | null;
    tokenPair: {
        accessToken: string | null,
        refreshToken: string | null;
    }
}

const initialState: IAuthState = {
    user: null,
    tokenPair: {
        accessToken: null,
        refreshToken: null,
    }
}

export const AuthSlice = createSlice({
    name: 'authSLice',
    initialState,
    reducers: {
        setCredentials: (state, action) => {

        },
        logout: (state, action) => {

        }
    }
})

export const { setCredentials, logout } = AuthSlice.actions;
export default AuthSlice.reducer;