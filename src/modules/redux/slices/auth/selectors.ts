import { createRootSelector } from '../root.selector';

export const AuthSelectors = {
    getToken: createRootSelector((state) => state.auth.token),
    getUser: createRootSelector((state) => state.auth.user),
    getUserId: createRootSelector((state) => state.auth.user?.id ?? ''),
};
