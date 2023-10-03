import { Game } from '@diablosnaps/common';
import { AnyAction, configureStore, Middleware, ThunkDispatch } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import { handleSnackbarTimeout, isRejectedActionWithMessage } from '../slices';
import { BackendSlice } from '../slices/backend/slice';
import { ROOT_STATE_INITIAL, rootReducer, RootState } from '../slices/root';
import { retrieveLanguageFromNavigator, UserLanguage } from '../slices/user';
import { STORAGE } from '../utils';

interface StoreProviderProps {
    children: React.ReactNode;
}

const rejectedActionMiddleware: Middleware<
    {},
    RootState,
    ThunkDispatch<RootState, {
        timeout: number;
    }, AnyAction>
> = store => next => (action: AnyAction) => {
    if (isRejectedActionWithMessage(action)) {
        store.dispatch(handleSnackbarTimeout());
    }
    return next(action);
};

export const StoreProvider: React.FC<StoreProviderProps> = ({
    children,
}) => {
    const language = retrieveLanguageFromNavigator(UserLanguage.English);

    const store = React.useMemo(() => {
        const preloadedState = {
            ...ROOT_STATE_INITIAL,
        };
        preloadedState.auth = {
            ...preloadedState.auth,
            ...(STORAGE.get('auth') || { token: '', user: undefined, notifications: [] }),
        };
        preloadedState.user = {
            ...preloadedState.user,
            ...(STORAGE.get('user') || {
                language,
                serverType: Game.ServerType.Seasonal,
            }),
        };
        if (!preloadedState.user.language) {
            preloadedState.user.language = language;
        }
        const store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(BackendSlice.middleware, rejectedActionMiddleware),
            preloadedState,
        });
        let next = { ...store.getState() };
        store.subscribe(() => {
            const prev = { ...next };
            next = store.getState();
            if (prev.auth !== next.auth) {
                STORAGE.set('auth', next.auth);
            } else if (prev.user !== next.user) {
                STORAGE.set('user', next.user);
            }
        });
        return store;
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
