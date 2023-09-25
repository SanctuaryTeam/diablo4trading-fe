import { Game } from '@diablosnaps/common';
import React from 'react';

export type RouteServerTypeContext = [Game.ServerType, (serverType: Game.ServerType | undefined) => void];
export const RouteServerTypeContext = React.createContext<RouteServerTypeContext>([
    Game.ServerType.Seasonal,
    () => null,
]);

export const useRouteServerType = () => {
    return React.useContext(RouteServerTypeContext);
};
