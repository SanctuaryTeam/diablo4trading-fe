import { AnyAction, combineReducers, Store } from '@reduxjs/toolkit';
/* always needs to use the /slice export, otherwise we get circluar dependencies */
import { AUTH_STATE_INITIAL, AuthSlice } from './auth/slice';
import { BackendSlice } from './backend/slice';
import { SERVICE_STATE_INITIAL, ServiceSlice } from './service/slice';
import { USER_STATE_INITIAL, UserSlice } from './user/slice';

export const rootReducer = combineReducers({
    [AuthSlice.name]: AuthSlice.reducer,
    [BackendSlice.reducerPath]: BackendSlice.reducer,
    [UserSlice.name]: UserSlice.reducer,
    [ServiceSlice.name]: ServiceSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootStore = Store<RootState, AnyAction>;

export const ROOT_STATE_INITIAL: Partial<RootState> = {
    auth: AUTH_STATE_INITIAL,
    user: USER_STATE_INITIAL,
    service: SERVICE_STATE_INITIAL,
};
