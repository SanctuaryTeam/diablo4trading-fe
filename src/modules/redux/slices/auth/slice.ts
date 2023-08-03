import { createSlice } from '@reduxjs/toolkit';
import { API } from '@sanctuaryteam/shared';
import { BackendSlice } from './../backend/slice';

interface AuthState {
    token: string;
    user: API.User;
}

export const AUTH_STATE_INITIAL: AuthState = {
    token: '',
    user: null,
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: AUTH_STATE_INITIAL,
    reducers: {
        logout: (state) => {
            state.token = '';
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            BackendSlice.endpoints.authDiscordCallback.matchFulfilled,
            (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
            }
        );
    },
});
