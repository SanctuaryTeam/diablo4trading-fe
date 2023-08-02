import { AnyAction, Store, combineReducers } from '@reduxjs/toolkit';
/* always needs to use the /slice export, otherwise we get circluar dependencies */
import { AUTH_STATE_INITIAL, AuthSlice } from './auth/slice';
import { BackendSlice } from './backend/slice';
import { USER_STATE_INITIAL, UserSlice } from './user/slice';

export const rootReducer = combineReducers({
    [AuthSlice.name]: AuthSlice.reducer,
    [BackendSlice.reducerPath]: BackendSlice.reducer,
    [UserSlice.name]: UserSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootStore = Store<RootState, AnyAction>;

export const ROOT_STATE_INITIAL: Partial<RootState> = {
    auth: AUTH_STATE_INITIAL,
    user: USER_STATE_INITIAL
};