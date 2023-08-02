import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import React from 'react';
import { English, French, German, Italian, Japanese, Korean, Polish, Portuguese, Russian, SimplifiedChinese, Spanish, TraditionalChinese, Turkish } from '../i18n';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
i18n.load(Language.German, German);
i18n.load(Language.English, English);
i18n.load(Language.Spanish, Spanish);
i18n.load(Language.French, French);
i18n.load(Language.Italian, Italian);
i18n.load(Language.Japanese, Japanese);
i18n.load(Language.Korean, Korean);
i18n.load(Language.Polish, Polish);
i18n.load(Language.Portuguese, Portuguese);
i18n.load(Language.Russian, Russian);
i18n.load(Language.Turkish, Turkish);
i18n.load(Language.SimplifiedChinese, SimplifiedChinese);
i18n.load(Language.TraditionalChinese, TraditionalChinese);
/* eslint-enable @typescript-eslint/no-unsafe-argument */

interface LanguageSwitchProps {
    children?: React.ReactNode;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
    children
}) => {
    const { language } = useLanguage();
    const [current, setCurrent] = React.useState<Language>();

    React.useEffect(() => {
        if (current !== language) {
            setCurrent(language);
            i18n.activate(language);
        }
    }, [current, language]);

    if (!current) {
        return null;
    }

    return (
        <I18nProvider i18n={i18n}>
            {children}
        </I18nProvider>
    )
}