import { AuthSelectors } from '../auth';
import { createRootSelector } from '../root.selector';

export const ServiceSelectors = {
    getListings: createRootSelector((state) => state.service.listings),
    getUserListings: createRootSelector((state) => {
        const userId = parseInt(AuthSelectors.getUser(state).id, 10);
        return state.service.listings.filter(listing => listing.userId === userId);
    }),
};
