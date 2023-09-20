import { Game } from '@diablosnaps/common';
import React from 'react';

export interface AssetsContext {
    loading: boolean;
    affixes: Game.Affixes;
    // items: Game.Items;
    translations: Game.Translations;
    language: Game.Language;
}

export const AssetsContext = React.createContext<AssetsContext>({
    loading: true,
    language: Game.Language.English,
    affixes: null as unknown as Game.Affixes,
    translations: null as unknown as Game.Translations,
});

export const useAssets = () => {
    return React.useContext(AssetsContext);
};
