import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '@sanctuaryteam/shared'; // Commented for above reason
import { BackendSlice } from './../backend/slice';

interface ServiceState {
    searchListings: API.ServiceDto[];
    userListings: API.ServiceDto[];
    slots: API.ServiceSlotDto[];
}

export const SERVICE_STATE_INITIAL: ServiceState = {
    searchListings: [],
    userListings: [],
    slots: [],
};

export const ServiceSlice = createSlice({
    name: 'service',
    initialState: SERVICE_STATE_INITIAL,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) =>
                    BackendSlice.endpoints.serviceSearch.matchFulfilled(action)
                    && !action.meta.arg.originalArgs.isUserSearch,
                (state, action: PayloadAction<API.ServiceDto[]>) => {
                    state.searchListings = [];
                    action.payload.forEach(result => {
                        if (!state.searchListings.find(listing => listing.id === result.id)) {
                            state.searchListings.push(result);
                        }
                    });
                },
            )
            .addMatcher(
                (action) =>
                    BackendSlice.endpoints.serviceSearch.matchFulfilled(action)
                    && action.meta.arg.originalArgs.isUserSearch === true,
                (state, action: PayloadAction<API.ServiceDto[]>) => {
                    state.userListings = state.userListings.map(listing => {
                        const updatedResult = action.payload.find(result => result.id === listing.id);
                        return updatedResult ? updatedResult : listing;
                    });
                    action.payload.forEach(result => {
                        if (!state.userListings.find(listing => listing.id === result.id)) {
                            state.userListings.push(result);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.createService.matchFulfilled,
                (state, action) => {
                    state.userListings.push(action.payload);
                },
            )
            .addMatcher(
                BackendSlice.endpoints.bumpService.matchFulfilled,
                (state, action) => {
                    const { id: serviceId } = action.meta.arg.originalArgs;
                    state.userListings.map((listing, index) => {
                        if (listing.id === serviceId) {
                            return state.userListings[index].updatedAt = new Date().toISOString();
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.softDeleteService.matchFulfilled,
                (state, action) => {
                    const { id: serviceId } = action.meta.arg.originalArgs;
                    state.userListings.map((listing, index) => {
                        if (listing.id === serviceId) {
                            return state.userListings.splice(index, 1);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.buyService.matchFulfilled,
                (state, action) => {
                    state.slots.push(action.payload);
                },
            )
            .addMatcher(
                BackendSlice.endpoints.editSlotState.matchFulfilled,
                (state, action) => {
                    const { id: slotId, state: newState } = action.meta.arg.originalArgs;
                    state.slots.map((slot, index) => {
                        if (slot.id === slotId) {
                            return state.slots[index].state = newState;
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.serviceSlotSearch.matchFulfilled,
                (state, action) => {
                    state.slots = state.slots.map(slot => {
                        const updatedResult = action.payload.find(result => result.id === slot.id);
                        return updatedResult ? updatedResult : slot;
                    });

                    action.payload.forEach(result => {
                        if (!state.slots.find(slot => slot.id === result.id)) {
                            state.slots.push(result);
                        }
                    });
                },
            );
    },
});

export default ServiceSlice.reducer;
