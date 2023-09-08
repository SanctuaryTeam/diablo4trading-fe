import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import { handleSnackbarTimeout, isRejectedActionWithMessage } from '../slices';
import { BackendSlice } from '../slices/backend/slice';
import { ROOT_STATE_INITIAL, rootReducer } from '../slices/root';
import { retrieveLanguageFromNavigator, UserLanguage } from '../slices/user';
import { STORAGE } from '../utils';

interface StoreProviderProps {
    children: React.ReactNode;
}

const rejectedActionMiddleware = (store) => (next) => (action) => {
    if (isRejectedActionWithMessage(action)) {
        store.dispatch(handleSnackbarTimeout());
    }
    return next(action);
};

export const StoreProvider: React.FC<StoreProviderProps> = ({
    children,
}) => {
    const store = React.useMemo(() => {
        const preloadedState = {
            ...ROOT_STATE_INITIAL,
        };
        preloadedState.auth = {
            ...preloadedState.auth,
            ...(STORAGE.get('auth') || {}),
        };
        preloadedState.user = {
            ...preloadedState.user,
            ...(STORAGE.get('user') || {}),
        };
        if (!preloadedState.user.language) {
            preloadedState.user.language = retrieveLanguageFromNavigator(UserLanguage.English);
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
