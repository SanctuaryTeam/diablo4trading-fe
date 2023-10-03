import { API_ENDPOINT } from '@config';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API } from '@sanctuaryteam/shared';
import { AuthSelectors } from '../auth/selectors';
import { AuthSlice } from '../auth/slice';
import { RootState } from '../root';

const baseQuery = fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = AuthSelectors.getToken(state);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        api.dispatch(AuthSlice.actions.logout());
    }
    return result;
};

export const BackendSlice = createApi({
    reducerPath: 'backend',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        // auth
        authDiscordCallback: builder.query<API.AuthCallbackResponse, API.AuthCallbackParams>({
            query: ({ code }) => ({
                url: '/auth/discord/callback',
                method: 'GET',
                params: { code },
            }),
        }),
        // trade
        tradeSearch: builder.query<API.TradeGetSearchResponse, API.TradeGetSearchQuery>({
            query: params => ({
                url: '/listings/search',
                method: 'GET',
                params,
            }),
        }),
        // service-search
        serviceSearch: builder.query<
            API.ServiceGetSearchResponse,
            { params: API.ServiceGetSearchQuery; isUserSearch?: boolean }
        >({
            query: ({ params }) => ({
                url: '/services',
                method: 'GET',
                params,
            }),
        }),
        // service-slot-search
        serviceSlotSearch: builder.query<API.ServiceSlotGetSearchResponse, API.ServiceSlotGetSearchQuery>({
            query: params => ({
                url: '/service-slots',
                method: 'GET',
                params,
            }),
        }),
        // service-create
        createService: builder.mutation({
            query: (serviceData) => ({
                url: '/services',
                method: 'POST',
                body: serviceData,
            }),
        }),
        // service-bump
        bumpService: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/services/${id}/bump`,
                method: 'POST',
                body: id,
            }),
        }),
        // service-delete
        softDeleteService: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/services/${id}/soft-delete`,
                method: 'DELETE',
                body: id,
            }),
        }),
        // service-buy
        buyService: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/services/${id}/claim-slot/`,
                method: 'POST',
                body: { id },
            }),
        }),
        // service-slot-state
        editSlotState: builder.mutation({
            query: ({ id, state }: { id: string; state: API.ServiceSlotStates }) => ({
                url: `/service-slots/${id}/state/${state}`,
                method: 'PUT',
                body: { id, state },
            }),
        }),
        // user-notifications search
        searchNotifications: builder.query<API.UserNotificationDto[], { recipientId: string }>({
            query: params => ({
                url: '/users/notifications',
                method: 'GET',
                params,
            }),
        }),

        closeVouch: builder.mutation({
            query: (vouchData) => ({
                url: '/user/vouch/close',
                method: 'POST',
                body: vouchData,
            }),
        }),
        // Close vouch
        // closeVouchs: builder.query<
        //     API.UserVouchDto,
        //     { id: string; rating: number; isPositive: boolean; description: string }
        // >({
        //     query: params => ({
        //         url: '/user/vouch',
        //         method: 'POST',
        //         params,
        //     }),
        // }),
    }),
});

export const {
    // auth
    useAuthDiscordCallbackQuery,
    useLazySearchNotificationsQuery,
    useSearchNotificationsQuery,
    // vouch
    useCloseVouchMutation,
    // useCloseVouchQuery,
    // useLazyCloseVouchQuery,
    // trade
    useTradeSearchQuery,
    useLazyTradeSearchQuery,
    // service
    useServiceSearchQuery,
    useServiceSlotSearchQuery,
    useBuyServiceMutation,
    useBumpServiceMutation,
    useEditSlotStateMutation,
    useCreateServiceMutation,
    useLazyServiceSearchQuery,
    useLazyServiceSlotSearchQuery,
    useSoftDeleteServiceMutation,
} = BackendSlice;
