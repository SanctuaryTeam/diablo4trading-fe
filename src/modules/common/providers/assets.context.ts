import { Game } from '@diablosnaps/common';
import React from 'react';

export interface AssetsContext {
    loading: boolean;
    affixes: Game.Affixes;
    items: Game.Items;
    translations: Game.Translations;
    language: Game.Language;
}

export const AssetsContext = React.createContext<AssetsContext>(undefined);

export const useAssets = () => {
    return React.useContext(AssetsContext);
}