import { Game } from '@diablosnaps/common';
import React from 'react';

export type RouteServerTypeContext = [Game.ServerType, (serverType: Game.ServerType) => void];
export const RouteServerTypeContext = React.createContext<RouteServerTypeContext>(undefined);

export const useRouteServerType = () => {
    return React.useContext(RouteServerTypeContext);
};
