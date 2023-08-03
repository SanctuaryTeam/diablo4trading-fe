import { Game } from '@diablosnaps/common';
import React from 'react';
import { Location } from 'react-router-dom';

export type RouteServerTypeContext = [
    Game.ServerType,
    (serverType: Game.ServerType, location: Location) => void
];
export const RouteServerTypeContext = React.createContext<RouteServerTypeContext>(undefined);

export const useRouteServerType = () => {
    return React.useContext(RouteServerTypeContext);
}
