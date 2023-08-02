import { createRootSelector } from '../root.selector';

export const UserSelectors = {
    getLanguage: createRootSelector((state) => state.user.language),
    getServerType: createRootSelector((state) => state.user.serverType),
};