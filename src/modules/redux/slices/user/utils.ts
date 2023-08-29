import { UserLanguage } from './types';

export function retrieveLanguageFromNavigator(fallback: UserLanguage): UserLanguage {
    // en-US
    const value = (navigator.language ?? '') as UserLanguage;
    if (Object.values(UserLanguage).includes(value)) {
        return value;
    }
    const [language] = value.split('-');
    const match = Object.entries(UserLanguage).find(([, value]) => {
        return value.split('-')[0] === language;
    });
    if (match) {
        return match[1];
    }
    return fallback;
}

export function getLanguageName(language: UserLanguage): string {
    switch (language) {
        case UserLanguage.German:
            return 'Deutsch';
        case UserLanguage.English:
            return 'English';
        case UserLanguage.Spanish:
            return 'Español';
        case UserLanguage.French:
            return 'Français';
        case UserLanguage.Italian:
            return 'Italiano';
        case UserLanguage.Japanese:
            return '日本語';
        case UserLanguage.Korean:
            return '한국어';
        case UserLanguage.Polish:
            return 'Polski';
        case UserLanguage.Portuguese:
            return 'Português';
        case UserLanguage.Russian:
            return 'Pусский';
        case UserLanguage.Bulgarian:
            return 'Български';
        case UserLanguage.Turkish:
            return 'Türkçe';
        case UserLanguage.SimplifiedChinese:
            return '简体中文';
        case UserLanguage.TraditionalChinese:
            return '中國傳統的';
        default:
            return language;
    }
}
