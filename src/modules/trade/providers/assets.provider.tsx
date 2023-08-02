import { Assets } from '@diablosnaps/assets';
import { Game } from '@diablosnaps/common';
import { I18n } from '@modules/i18n';
import React, { useEffect } from 'react';
import { AssetsContext } from './assets.context';

interface AssetsProviderProps {
    children?: (loading: boolean) => React.ReactNode;
}

export const AssetsProvider: React.FC<AssetsProviderProps> = ({
    children
}) => {
    const i18n = I18n.useLanguage();

    const [loading, setLoading] = React.useState<boolean>(true);

    const [affixes, setAffixes] = React.useState<Game.Affixes>();
    const [items, setItems] = React.useState<Game.Items>();
    const [translations, setTranslations] = React.useState<Game.Translations>();

    const language = React.useMemo(() => {
        switch (i18n.language) {
            case I18n.Language.German: return Game.Language.German;
            case I18n.Language.English: return Game.Language.English;
            case I18n.Language.Spanish: return Game.Language.Spanish;
            case I18n.Language.French: return Game.Language.French;
            case I18n.Language.Italian: return Game.Language.Italian;
            case I18n.Language.Japanese: return Game.Language.Japanese;
            case I18n.Language.Korean: return Game.Language.Korean;
            case I18n.Language.Polish: return Game.Language.Polish;
            case I18n.Language.Portuguese: return Game.Language.Portuguese;
            case I18n.Language.Russian: return Game.Language.Russian;
            case I18n.Language.Turkish: return Game.Language.Turkish;
            case I18n.Language.SimplifiedChinese: return Game.Language.SimplifiedChinese;
            case I18n.Language.TraditionalChinese: return Game.Language.TraditionalChinese;
            default: return Game.Language.English;
        }
    }, [i18n.language]);

    const value = React.useMemo(() => {
        const ctx: AssetsContext = {
            loading,
            affixes,
            items,
            translations,
            language,
        };
        return ctx;
    }, [loading, affixes, items, translations, language]);

    useEffect(() => {
        if (!loading) {
            return;
        }
        Promise.all([
            Assets.loadAffixes(),
            Assets.loadItems(),
            Assets.loadTranslations(),
        ]).then(([affixes, items, translations]) => {
            setAffixes(affixes);
            setItems(items);
            setTranslations(translations);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
        });
    }, [loading])

    return (
        <AssetsContext.Provider value={value}>
            {children(loading)}
        </AssetsContext.Provider>
    )
}