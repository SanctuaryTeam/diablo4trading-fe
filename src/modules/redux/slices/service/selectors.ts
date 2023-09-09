import { createSelector as createReselector } from 'reselect';
import { AuthSelectors } from '..';
import { createRootSelector } from '../root.selector';

const getListings = createRootSelector((state) => state.service.listings);

export const ServiceSelectors = {
    getListings,
    getUserListings: createReselector(
        AuthSelectors.getUserId,
        getListings,
        (userId, listings) => {
            return listings.filter(listing => listing.userId === userId);
        },
    ),
};
