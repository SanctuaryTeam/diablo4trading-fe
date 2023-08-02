import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import { api } from './api.service';

// Define the state type of your root reducer
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer, // Add the RTK-Query API reducer to the store
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store;
