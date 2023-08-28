import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { matchSorter } from 'match-sorter';

const ItemSocketTypeIcon = styled('img')(() => ({
    width: 22,
    height: 22,
    marginRight: 4,
}));

interface ItemSocketTypeInputProps {
    value: Game.ItemSocketType;
    onChange: (value: Game.ItemSocketType) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    language?: Game.Language;
}

export const ItemSocketTypeInput: React.FC<ItemSocketTypeInputProps> = ({
    value,
    onChange,
    label,
    required,
    disabled,
    language: formLanguage,
}) => {
    const { i18n } = useLingui();
    const { language: assetsLanguage, translations } = Common.useAssets();
    const language = formLanguage ?? assetsLanguage;

    const options = Object
        .values(Game.ItemSocketType)
        .map((type) => ({
            id: type,
            label: Game.getItemSocketTypeText(type, language, translations),
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
            renderOption={(props, option) => (
                <li {...props}>
                    <ItemSocketTypeIcon
                        src={Common.GAME_ITEM_SOCKET_TYPE_ICONS[option.id]}
                        alt={t(i18n)`${Game.getItemSocketTypeText(option.id, language, translations)}'s icon`}
                    />
                    &nbsp;
                    {option.label}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    required={required}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: Common.GAME_ITEM_SOCKET_TYPE_ICONS[value]
                            ? (
                                <ItemSocketTypeIcon
                                    src={Common.GAME_ITEM_SOCKET_TYPE_ICONS[value]}
                                    alt={t(i18n)`${Game.getItemSocketTypeText(value, language, translations)}'s icon`}
                                />
                            )
                            : undefined,
                    }}
                />
            )}
            disableClearable={required}
            disabled={disabled}
        />
    );
};
