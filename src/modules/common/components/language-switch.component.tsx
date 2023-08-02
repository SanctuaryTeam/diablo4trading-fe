import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Redux } from '@modules/redux';
import React from 'react';
import { useSelector } from 'react-redux';
import { English, French, German, Italian, Japanese, Korean, Polish, Portuguese, Russian, SimplifiedChinese, Spanish, TraditionalChinese, Turkish } from '../i18n';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
i18n.load(Redux.UserLanguage.German, German);
i18n.load(Redux.UserLanguage.English, English);
i18n.load(Redux.UserLanguage.Spanish, Spanish);
i18n.load(Redux.UserLanguage.French, French);
i18n.load(Redux.UserLanguage.Italian, Italian);
i18n.load(Redux.UserLanguage.Japanese, Japanese);
i18n.load(Redux.UserLanguage.Korean, Korean);
i18n.load(Redux.UserLanguage.Polish, Polish);
i18n.load(Redux.UserLanguage.Portuguese, Portuguese);
i18n.load(Redux.UserLanguage.Russian, Russian);
i18n.load(Redux.UserLanguage.Turkish, Turkish);
i18n.load(Redux.UserLanguage.SimplifiedChinese, SimplifiedChinese);
i18n.load(Redux.UserLanguage.TraditionalChinese, TraditionalChinese);
/* eslint-enable @typescript-eslint/no-unsafe-argument */

interface LanguageSwitchProps {
    children?: React.ReactNode;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
    children
}) => {
    const language = useSelector(Redux.UserSelectors.getLanguage);
    const [active, setActive] = React.useState<Redux.UserLanguage>();

    React.useEffect(() => {
        if (active !== language) {
            setActive(language);
            i18n.activate(language);
        }
    }, [active, language]);

    if (!active) {
        return null;
    }

    return (
        <I18nProvider i18n={i18n}>
            {children}
        </I18nProvider>
    )
}