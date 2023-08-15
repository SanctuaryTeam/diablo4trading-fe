import { Redux } from '@modules/redux';
import React from 'react';
import { useStore } from 'react-redux';
import { Location, useNavigate, useParams } from 'react-router-dom';
import { RouteLanguageContext } from './route-language.context';

const ROUTE_MAPPING: Record<Redux.UserLanguage, string> = {
    [Redux.UserLanguage.German]: 'de',
    [Redux.UserLanguage.English]: 'en',
    [Redux.UserLanguage.Spanish]: 'es',
    [Redux.UserLanguage.French]: 'fr',
    [Redux.UserLanguage.Italian]: 'it',
    [Redux.UserLanguage.Japanese]: 'ja',
    [Redux.UserLanguage.Korean]: 'ko',
    [Redux.UserLanguage.Polish]: 'pl',
    [Redux.UserLanguage.Portuguese]: 'pt',
    [Redux.UserLanguage.Russian]: 'ru',
    [Redux.UserLanguage.Turkish]: 'tr',
    [Redux.UserLanguage.SimplifiedChinese]: 'zh-cn',
    [Redux.UserLanguage.TraditionalChinese]: 'zh-tw',
};

const ROUTE_MAPPING_REVERSE: Record<string, Redux.UserLanguage> = Object.fromEntries(
    Object.entries(ROUTE_MAPPING).map(([key, value]) => [value, key as Redux.UserLanguage]),
);

interface RouteLanguageProviderParams {
    language?: string;
}

interface RouteLanguageProviderProps {
    indexPath: string;
    children: React.ReactNode;
}

export const RouteLanguageProvider: React.FC<RouteLanguageProviderProps> = ({
    indexPath,
    children,
}) => {
    const store = useStore();
    const navigate = useNavigate();

    const params: RouteLanguageProviderParams = useParams();

    const routeLanguage = ROUTE_MAPPING_REVERSE[params.language ?? ''];
    const setRouteLanguage = React.useCallback(
        (language: Redux.UserLanguage, location: Location) => {
            store.dispatch(Redux.UserSlice.actions.setLanguage(language));
            const pathname = ROUTE_MAPPING[language];
            navigate({
                ...location,
                pathname: location.pathname.replace(/^\/[^/]*/, `/${pathname}`),
            });
        },
        [navigate, store],
    );

    const routeIncludesLanguage = !!routeLanguage;

    React.useEffect(() => {
        if (!routeIncludesLanguage) {
            const state = store.getState() as Redux.RootState;
            const language = Redux.UserSelectors.getLanguage(state);
            const pathname = ROUTE_MAPPING[language];
            navigate(`/${pathname}/${indexPath}`, { replace: true });
        }
    }, [routeIncludesLanguage, navigate, store, indexPath]);

    const value = React.useMemo<RouteLanguageContext>(() => {
        return [routeLanguage, setRouteLanguage];
    }, [routeLanguage, setRouteLanguage]);

    if (!routeIncludesLanguage) {
        return null;
    }

    return (
        <RouteLanguageContext.Provider value={value}>
            {children}
        </RouteLanguageContext.Provider>
    );
};
