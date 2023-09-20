import { createRootSelector } from '../root.selector';

export const AuthSelectors = {
    getToken: createRootSelector((state) => state.auth.token),
    getUser: createRootSelector((state) => state.auth.user),
    getNotifications: createRootSelector((state) => state.auth.notifications),
    getUserId: createRootSelector((state) => state.auth.user?.id),
};
