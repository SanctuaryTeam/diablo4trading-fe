import { API_ENDPOINT } from '@config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthSelectors } from '../auth/selectors';
import { RootState } from '../root';

export const BackendSlice = createApi({
    reducerPath: 'backend',
    baseQuery: fetchBaseQuery({
        baseUrl: API_ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = AuthSelectors.getToken(state);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // auth
        authDiscordCallback: builder.query<{ token: string }, string>({
            query: (code) => ({
                // TODO: should also return user
                url: '/auth/discord/callback',
                method: 'GET',
                params: { code }
            }),
        }),
    })
});

export const {
    useAuthDiscordCallbackQuery
} = BackendSlice;