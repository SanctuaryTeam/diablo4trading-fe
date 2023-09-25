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
    affixes: {
        definitions: {
            basic: {},
            legendary: {},
            unique: {},
        },
        attributes: {},
        descriptions: {
            deDE: {},
            enUS: {},
            esES: {},
            esMX: {},
            frFR: {},
            itIT: {},
            jaJP: {},
            koKR: {},
            plPL: {},
            ptBR: {},
            ruRU: {},
            trTR: {},
            zhCN: {},
            zhTW: {},
        },
    },
    translations: {
        deDE: {},
        enUS: {},
        esES: {},
        esMX: {},
        frFR: {},
        itIT: {},
        jaJP: {},
        koKR: {},
        plPL: {},
        ptBR: {},
        ruRU: {},
        trTR: {},
        zhCN: {},
        zhTW: {},
    },
});

export const useAssets = () => {
    return React.useContext(AssetsContext);
};
