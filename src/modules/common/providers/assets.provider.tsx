import { Assets } from '@diablosnaps/assets';
import { Game } from '@diablosnaps/common';
import { Redux } from '@modules/redux';
import React, { useEffect } from 'react';
import { AssetsContext, defaultAssetContext } from './assets.context';
import { useRouteLanguage } from './route-language.context';

interface AssetsProviderProps {
    children: (loading: boolean) => React.ReactNode;
}

export const AssetsProvider: React.FC<AssetsProviderProps> = ({
    children,
}) => {
    const [routeLanguage] = useRouteLanguage();

    const [loading, setLoading] = React.useState<boolean>(true);

    const [affixes, setAffixes] = React.useState<Game.Affixes>(defaultAssetContext.affixes);

    const [translations, setTranslations] = React.useState<Game.Translations>(defaultAssetContext.translations);

    const language = React.useMemo(() => {
        switch (routeLanguage) {
            case Redux.UserLanguage.German:
                return Game.Language.German;
            case Redux.UserLanguage.English:
                return Game.Language.English;
            case Redux.UserLanguage.Spanish:
                return Game.Language.Spanish;
            case Redux.UserLanguage.French:
                return Game.Language.French;
            case Redux.UserLanguage.Italian:
                return Game.Language.Italian;
            case Redux.UserLanguage.Japanese:
                return Game.Language.Japanese;
            case Redux.UserLanguage.Korean:
                return Game.Language.Korean;
            case Redux.UserLanguage.Polish:
                return Game.Language.Polish;
            case Redux.UserLanguage.Portuguese:
                return Game.Language.Portuguese;
            case Redux.UserLanguage.Russian:
                return Game.Language.Russian;
            case Redux.UserLanguage.Turkish:
                return Game.Language.Turkish;
            case Redux.UserLanguage.SimplifiedChinese:
                return Game.Language.SimplifiedChinese;
            case Redux.UserLanguage.TraditionalChinese:
                return Game.Language.TraditionalChinese;
            default:
                return Game.Language.English;
        }
    }, [routeLanguage]);

    const value = React.useMemo(() => {
        const ctx: AssetsContext = {
            loading,
            affixes,
            translations,
            language,
        };
        return ctx;
    }, [loading, affixes, translations, language]);

    useEffect(() => {
        if (!loading) {
            return;
        }
        Promise.all([
            Assets.loadAffixes(),
            Assets.loadTranslations(),
        ])
            .then(([affixes, translations]) => {
                setAffixes(affixes);
                setTranslations(translations);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [loading]);

    return (
        <AssetsContext.Provider value={value}>
            {children(loading)}
        </AssetsContext.Provider>
    );
};
