import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { matchSorter } from 'match-sorter';

const ClassIcon = styled('img')(() => ({
    width: 22,
    height: 22,
    marginRight: 4,
}));

interface CharacterClassInputProps {
    value?: Game.Class;
    onChange: (value: Game.Class) => void;
    label?: string;
    disabled?: boolean;
    language?: Game.Language;
}

interface CharacterClassOptions {
    id?: Game.Class;
    label: string;
}

export const CharacterClassInput: React.FC<CharacterClassInputProps> = ({
    value,
    onChange,
    label,
    disabled,
    language: formLanguage,
}) => {
    const { i18n } = useLingui();
    const { language: assetsLanguage, translations } = Common.useAssets();
    const language = formLanguage ?? assetsLanguage;

    const options: CharacterClassOptions[] = Object
        .values(Game.Class)
        .map<CharacterClassOptions>((characterClass) => ({
            id: characterClass,
            label: Game.getCharacterClassText(characterClass, language, translations),
        }));

    const selected = options.find((o) => o.id === value) ?? undefined;

    const onChangeHandler = (value?: Game.Class) => {
        if (!value) {
            return;
        }

        onChange(value);
    };

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
            onChange={(_, option) => onChangeHandler(option?.id)}
            renderOption={(props, option) => (
                option.id && (
                    <li {...props}>
                        <ClassIcon
                            src={Common.GAME_CLASS_ICONS[option.id]}
                            alt={t(i18n)`${Game.getCharacterClassText(option.id, language, translations)}'s icon`}
                        />
                        &nbsp;
                        {option.label}
                    </li>
                )
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: value
                            && (
                                <ClassIcon
                                    src={Common.GAME_CLASS_ICONS[value]}
                                    alt={t(i18n)`${Game.getCharacterClassText(value, language, translations)}'s icon`}
                                />
                            ),
                    }}
                />
            )}
            disabled={disabled}
        />
    );
};
