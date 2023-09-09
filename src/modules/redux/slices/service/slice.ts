import { createSlice } from '@reduxjs/toolkit';
import { API } from '@sanctuaryteam/shared'; // Commented for above reason
import { BackendSlice } from './../backend/slice';

interface ServiceState {
    listings: API.ServiceListing[];
}

export const SERVICE_STATE_INITIAL: ServiceState = {
    listings: [],
};

export const ServiceSlice = createSlice({
    name: 'service',
    initialState: SERVICE_STATE_INITIAL,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                BackendSlice.endpoints.serviceSearch.matchFulfilled,
                (state, action) => {
                    state.listings = state.listings.map(listing => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        return updatedResult ? updatedResult : listing;
                    });

                    action.payload.forEach(result => {
                        if (!state.listings.find(listing => listing.id === result.id)) {
                            state.listings.push(result);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.createService.matchFulfilled,
                (state, action) => {
                    state.listings.push(action.payload);
                },
            )
            .addMatcher(
                BackendSlice.endpoints.bumpService.matchFulfilled,
                (state, action) => {
                    const { id: serviceId } = action.meta.arg.originalArgs;
                    state.listings.map((listing, index) => {
                        if (listing.id === serviceId) {
                            return state.listings[index].updatedAt = new Date().toISOString();
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.buyService.matchFulfilled,
                (state, action) => {
                    state.listings.map((listing, index) => {
                        if (listing.id == action.payload.id) {
                            return state.listings[index] = action.payload;
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.softDeleteService.matchFulfilled,
                (state, action) => {
                    const { id: serviceId } = action.meta.arg.originalArgs;
                    state.listings.map((listing, index) => {
                        if (listing.id === serviceId) {
                            return state.listings.splice(index, 1);
                        }
                    });
                },
            )
    },
});

export default ServiceSlice.reducer;
