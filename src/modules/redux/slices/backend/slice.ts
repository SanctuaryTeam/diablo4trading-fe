import { API_ENDPOINT } from '@config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '@sanctuaryteam/shared';
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
        },
    }),
    endpoints: (builder) => ({
        // auth
        authDiscordCallback: builder.query<API.AuthCallbackResponse, API.AuthCallbackParams>({
            query: ({ code }) => ({
                // TODO: should also return user
                url: '/auth/discord/callback',
                method: 'GET',
                params: { code },
            }),
        }),
        tradeSearchCallback: builder.query<API.SearchResponse, API.SearchPayload>({
            query: ({ query }) => ({
                url: '/trade/search',
                method: 'GET',
                params: { ...query.id, ...query.affix },
            }),
        }),
    }),
});

export const { useAuthDiscordCallbackQuery, useLazyTradeSearchCallbackQuery } = BackendSlice;
