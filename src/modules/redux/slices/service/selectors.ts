import { createSelector as createReselector } from 'reselect';
import { AuthSelectors } from '..';
import { createRootSelector } from '../root.selector';

const getListings = createRootSelector((state) => state.service.listings);
const getSlots = createRootSelector((state) => state.service.slots);

export const ServiceSelectors = {
    getListings,
    getSlots,
    getUserListings: createReselector(
        AuthSelectors.getUserId,
        getListings,
        (userId, listings) => {
            return listings.filter(listing => listing.userId === userId);
        },
    ),
    getUserSlots: createReselector(
        AuthSelectors.getUserId,
        getSlots,
        (userId, slots) => {
            return slots.filter(slot => slot.serviceOwnerUserId === userId);
        },
    ),
};
