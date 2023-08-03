import { Game } from '@diablosnaps/common';
import { Redux } from '@modules/redux';
import React from 'react';
import { useStore } from 'react-redux';
import { Location, useNavigate, useParams } from 'react-router-dom';
import { RouteServerTypeContext } from './route-server-type.context';

const ROUTE_MAPPING: Record<Game.ServerType, string> = {
    [Game.ServerType.Eternal]: 'eternal',
    [Game.ServerType.Hardcore]: 'hardcore',
    [Game.ServerType.Seasonal]: 'seasonal',
    [Game.ServerType.SeasonalHardcore]: 'seasonal-hardcore',
};

const ROUTE_MAPPING_REVERSE: Record<string, Game.ServerType> = Object.fromEntries(
    Object.entries(ROUTE_MAPPING).map(([key, value]) => [value, key as Game.ServerType])
);

interface RouteServerTypeProviderParams {
    serverType?: string;
}

interface RouteServerTypeProviderProps {
    indexPath: string;
    children: React.ReactNode;
}

export const RouteServerTypeProvider: React.FC<RouteServerTypeProviderProps> = ({
    indexPath,
    children,
}) => {
    const store = useStore();
    const navigate = useNavigate();

    const params: RouteServerTypeProviderParams = useParams();

    console.log(params);

    const routeServerType = ROUTE_MAPPING_REVERSE[params.serverType ?? ''];
    const setRouteServerType = React.useCallback((serverType: Game.ServerType, location: Location) => {
        store.dispatch(Redux.UserSlice.actions.setServerType(serverType));
        const pathname = ROUTE_MAPPING[serverType];
        console.log(location, 'here', { ...location, pathname: location.pathname.replace(/^(\/[^/]*)(\/[^/]*)/, `$1/${pathname}`) })
        navigate({ ...location, pathname: location.pathname.replace(/^\/([^/]*)\/([^/]*)/, `$1/${pathname}`) });
    }, [indexPath, navigate, store]);

    const routeIncludesServerType = !!routeServerType;

    React.useEffect(() => {
        if (!routeIncludesServerType) {
            const state = store.getState() as Redux.RootState;
            const serverType = Redux.UserSelectors.getServerType(state);
            const pathname = ROUTE_MAPPING[serverType];
            console.log(`./${pathname}/${indexPath}`)
            navigate(`./${pathname}/${indexPath}`, { relative: 'path' })
        }
    }, [routeIncludesServerType, navigate, store, indexPath])

    const value = React.useMemo<RouteServerTypeContext>(() => {
        return [routeServerType, setRouteServerType];
    }, [routeServerType, setRouteServerType]);

    if (!routeIncludesServerType) {
        return null;
    }

    return (
        <RouteServerTypeContext.Provider value={value}>
            {children}
        </RouteServerTypeContext.Provider>
    )
}
