import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import { BackendSlice } from '../slices/backend/slice';
import { ROOT_STATE_INITIAL, rootReducer } from '../slices/root';
import { STORAGE } from '../utils';

interface StoreProviderProps {
    children?: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({
    children
}) => {
    const store = React.useMemo(() => {
        const preloadedState = {
            ...ROOT_STATE_INITIAL
        };
        preloadedState.auth = {
            ...preloadedState.auth,
            ...(STORAGE.get('auth') || {})
        };

        const store = configureStore({
            reducer: rootReducer,
            middleware: getDefaultMiddleware => getDefaultMiddleware()
                .concat(BackendSlice.middleware),
            preloadedState
        });
        let next = { ...store.getState() };
        store.subscribe(() => {
            const prev = { ...next };
            next = store.getState();
            if (prev.auth !== next.auth) {
                STORAGE.set('auth', next.auth);
            }
        });
        return store;
    }, []);
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}