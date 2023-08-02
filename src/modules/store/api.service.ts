// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import configuration from '../../config';

// Define your API base URL
const BASE_URL = configuration.apiEndpoint;

// Define a selector to get the token from the Redux store
const selectToken = (state: RootState) => state.auth.token; // Replace 'auth' with the appropriate slice name in your Redux store

// Define your endpoints
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the Redux store
      const state = getState() as RootState;
      const token = selectToken(state);
      if (token) {
        // Add the JWT token to the request headers
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserInfo: builder.query<any, void>({
      query: () => '/auth/status',
    }),
    discordAuthCallback: builder.query<{ token: string }, string>({
      query: (code) => ({
        url: '/auth/discord/callback',
        method: 'GET',
        params: { code }
      }),
    }),
  }),
});

export const discordAuthRedirectUrl = BASE_URL + '/auth/discord';

// Export hooks for each endpoint
export const {
  useLazyFetchUserInfoQuery,
  useDiscordAuthCallbackQuery,
} = api;
