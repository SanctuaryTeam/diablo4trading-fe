import { Redux } from '@modules/redux';
import React from 'react';
import { Location } from 'react-router-dom';

export type RouteLanguageContext = [
    Redux.UserLanguage,
    (language: Redux.UserLanguage, location: Location) => void,
];
export const RouteLanguageContext = React.createContext<RouteLanguageContext>([Redux.UserLanguage.English, () => null]);

export const useRouteLanguage = () => {
    return React.useContext(RouteLanguageContext);
};
