import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Autocomplete, TextField } from '@mui/material';
import { matchSorter } from 'match-sorter';

// TODO: can we make this reusable?
const formatLanguage = (language: Game.Language) => {
    switch (language) {
        case Game.Language.German:
            return 'Deutsch';
        case Game.Language.English:
            return 'English';
        case Game.Language.Spanish:
            return 'Español';
        case Game.Language.French:
            return 'Français';
        case Game.Language.Italian:
            return 'Italiano';
        case Game.Language.Japanese:
            return '日本語';
        case Game.Language.Korean:
            return '한국어';
        case Game.Language.Polish:
            return 'Polski';
        case Game.Language.Portuguese:
            return 'Português';
        case Game.Language.Russian:
            return 'Pусский';
        case Game.Language.Bulgarian:
            return 'Български';
        case Game.Language.Turkish:
            return 'Türkçe';
        case Game.Language.SimplifiedChinese:
            return '简体中文';
        case Game.Language.TraditionalChinese:
            return '中國傳統的';
        default:
            return language;
    }
};

interface LanguageInputProps {
    value: Game.Language;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    onChange: (value: Game.Language) => void;
}

export const LanguageInput: React.FC<LanguageInputProps> = ({
    value,
    label,
    disabled,
    required,
    onChange,
}) => {
    const { i18n } = useLingui();

    const options = Object
        .values(Game.Language)
        .map((language) => ({
            id: language,
            label: formatLanguage(language),
        }));
    let selected = value === undefined ? null : options.find((x) => x.id === value);
    if (selected === undefined) {
        options.push({
            id: value,
            label: t(i18n)`Unknown: ${value}`,
        });
        selected = options[options.length - 1];
    }

    return (
        <Autocomplete
            value={selected}
            options={options}
            filterOptions={(options, { inputValue }) =>
                inputValue.length >= 1
                    ? matchSorter(options, inputValue, {
                        keys: ['label'],
                    })
                    : options}
            onChange={(_, option) => onChange(option?.id)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    required={required}
                />
            )}
            disableClearable={required}
            disabled={disabled}
        />
    );
};
