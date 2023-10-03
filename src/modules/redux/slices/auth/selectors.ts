import { createSelector as createReselector } from 'reselect';
import { createRootSelector } from '../root.selector';

// Custom comparison function to sort by the nested date
// function orderByUpdatedAt(a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) {
//     const dateA = new Date(a.createdAt);
//     const dateB = new Date(b.createdAt);

//     if (dateA < dateB) {
//         return -1;
//     }
//     if (dateA > dateB) {
//         return 1;
//     }
//     return 0;
// }

// const getSearchListings = createRootSelector((state) => state.service.searchListings);
// const getUserListings = createRootSelector((state) => state.service.userListings);
// const getSlots = createRootSelector((state) => state.service.slots);

// export const ServiceSelectors = {
//     getSearchListings,
//     getUserListings,
//     getSlots,
//     getUserSlots: createReselector(
//         AuthSelectors.getUserId,
//         getSlots,
//         (userId, slots) => {
//             return slots.filter(slot => slot.serviceOwnerUserId === userId);
//         },
//     ),
// };

const getToken = createRootSelector((state) => state.auth.token);
const getUser = createRootSelector((state) => state.auth.user);
const getNotifications = createRootSelector((state) => state.auth.notifications);

export const AuthSelectors = {
    getToken,
    getUser,
    getNotifications,
    getUserNotifications: createReselector(
        getNotifications,
        (notifications) => {
            return notifications;
        },
    ),

    getUserId: createRootSelector((state) => state.auth.user?.id),
};
