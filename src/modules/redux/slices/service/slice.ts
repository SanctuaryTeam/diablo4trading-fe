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

                    // Now, append any new results that are not already in the listings.
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
                    // Append the new service.
                    state.listings.push(action.payload);
                    console.log('API Call: Create Service was succesful. Data:\n' + JSON.stringify(action.payload));
                },
            )
            .addMatcher(
                BackendSlice.endpoints.createService.matchRejected,
                (state, action) => {
                    console.log(
                        'API Call: Create Service was **NOT** succesful. Data:\n' + JSON.stringify(action.payload)
                            + '\n\nListings:\n' + JSON.stringify(state.listings),
                    );
                },
            )
            .addMatcher(
                BackendSlice.endpoints.bumpService.matchFulfilled,
                (state, action) => {
                    console.log('API Call: Bump Service started. Data:\n' + JSON.stringify(action.payload));

                    state.listings.map((listing, index) => {
                        if (parseInt(listing.id, 10) == action.payload.id) {
                            console.log(
                                'API Call: Bump Service was succesful. Data:\n' + JSON.stringify(action.payload)
                                    + '\n\nListings:\n' + JSON.stringify(state.listings),
                            );
                            return state.listings[index] = action.payload;
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.bumpService.matchRejected,
                (state, action) => {
                    console.log(
                        'API Call: Bump Service was **NOT** succesful. Data:\n' + JSON.stringify(action.payload)
                            + '\n\nListings:\n' + JSON.stringify(state.listings),
                    );
                },
            )
            .addMatcher(
                BackendSlice.endpoints.buyService.matchFulfilled,
                (state, action) => {
                    console.log('API Call: Buy Service started. Data:\n' + JSON.stringify(action.payload));

                    state.listings.map((listing, index) => {
                        if (parseInt(listing.id, 10) == action.payload.id) {
                            console.log(
                                'API Call: Buy Service was succesful. Data:\n' + JSON.stringify(action.payload)
                                    + '\n\nListings:\n' + JSON.stringify(state.listings),
                            );
                            return state.listings[index] = action.payload;
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.buyService.matchRejected,
                (state, action) => {
                    console.log(
                        'API Call: Buy Service was **NOT** succesful. Data:\n' + JSON.stringify(action.payload)
                            + '\n\nListings:\n' + JSON.stringify(state.listings),
                    );
                },
            )
            .addMatcher(
                BackendSlice.endpoints.softDeleteService.matchFulfilled,
                (state, action) => {
                    console.log('API Call: Soft Delete Service started. Data:\n' + JSON.stringify(action.payload));
                    state.listings.map((listing, index) => {
                        if (parseInt(listing.id, 10) == action.payload.id) {
                            console.log(
                                'API Call: Soft Delete Service was succesful. Data:\n' + JSON.stringify(action.payload)
                                    + '\n\nListings:\n' + JSON.stringify(state.listings),
                            );
                            return state.listings.splice(index, 1);
                        }
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.softDeleteService.matchRejected,
                (state, action) => {
                    console.log(
                        'API Call: Soft Delete Service was **NOT** succesful. Data:\n' + JSON.stringify(action.payload)
                            + '\n\nListings:\n' + JSON.stringify(state.listings),
                    );
                },
            );
    },
});
