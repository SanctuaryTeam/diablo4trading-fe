import { createSelector as createReselector } from 'reselect';
import { AuthSelectors } from '..';
import { createRootSelector } from '../root.selector';

const getSearchListings = createRootSelector((state) => state.service.searchListings);
const getUserListings = createRootSelector((state) => state.service.userListings);
const getSlots = createRootSelector((state) => state.service.slots);

export const ServiceSelectors = {
    getSearchListings,
    getUserListings,
    getSlots,
    getUserSlots: createReselector(
        AuthSelectors.getUserId,
        getSlots,
        (userId, slots) => {
            return slots.filter(slot => slot.serviceOwnerUserId === userId);
        },
    ),
};
