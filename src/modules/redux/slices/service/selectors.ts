import { createRootSelector } from '../root.selector';

export const ServiceSelectors = {
    getListings: createRootSelector((state) => state.service.listings),
    getUserListings: createRootSelector((state) => {
        const userId = state.auth.user.id ?? null;
        return state.service.listings.filter(listing =>
            listing.userId === parseInt(userId, 10) && listing.realmType === state.user.serverType
        );
    }),
};
