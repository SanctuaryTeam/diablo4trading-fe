import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { matchSorter } from 'match-sorter';

const ItemTypeIcon = styled('img')(() => ({
    width: 'auto',
    height: 24,
    marginRight: 4,
}));

interface ItemTypeInputProps {
    value?: Game.ItemType;
    onChange: (value?: Game.ItemType) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    language?: Game.Language;
}

export const ItemTypeInput: React.FC<ItemTypeInputProps> = ({
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
        .values(Game.ItemType)
        .map((type) => ({
            id: type,
            label: Game.getItemTypeText(type, language, translations),
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
                    <ItemTypeIcon
                        src={Common.GAME_ITEM_TYPE_TOOLTIP_ICONS[option.id]}
                        alt={t(i18n)`${Game.getItemTypeText(option.id, language, translations)}'s icon`}
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
                        startAdornment: Common.GAME_ITEM_TYPE_TOOLTIP_ICONS[value]
                            ? (
                                <ItemTypeIcon
                                    src={Common.GAME_ITEM_TYPE_TOOLTIP_ICONS[value]}
                                    alt={t(i18n)`${Game.getItemTypeText(value, language, translations)}'s icon`}
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
