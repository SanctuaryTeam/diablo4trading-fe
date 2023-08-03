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
    value: Game.Class;
    label?: string;
    disabled?: boolean;
    onChange: (value: Game.Class) => void;
}

export const CharacterClassInput: React.FC<CharacterClassInputProps> = ({
    value,
    label,
    disabled,
    onChange,
}) => {
    const { i18n } = useLingui();
    const { language, translations } = Common.useAssets();

    const options = Object.values(Game.Class).map((characterClass) => ({
        id: characterClass,
        label: Game.getCharacterClassText(characterClass, language, translations),
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
                    : options
            }
            onChange={(_, option) => onChange(option?.id)}
            renderOption={(props, option) => (
                <li {...props}>
                    <ClassIcon
                        src={Common.GAME_CLASS_ICONS[option.id]}
                        alt={t(i18n)`${Game.getCharacterClassText(
                            option.id,
                            language,
                            translations
                        )}'s icon`}
                    />
                    &nbsp;
                    {option.label}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: Common.GAME_CLASS_ICONS[value] ? (
                            <ClassIcon
                                src={Common.GAME_CLASS_ICONS[value]}
                                alt={t(i18n)`${Game.getCharacterClassText(
                                    value,
                                    language,
                                    translations
                                )}'s icon`}
                            />
                        ) : undefined,
                    }}
                />
            )}
            disabled={disabled}
        />
    );
};
