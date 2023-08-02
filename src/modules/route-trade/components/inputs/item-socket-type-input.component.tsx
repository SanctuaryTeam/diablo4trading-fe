import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Autocomplete, TextField } from '@mui/material';
import { matchSorter } from 'match-sorter';

interface ItemSocketTypeInputProps {
    value: Game.ItemSocketType;
    label?: string;
    disabled?: boolean;
    onChange: (value: Game.ItemSocketType) => void;
}

export const ItemSocketTypeInput: React.FC<ItemSocketTypeInputProps> = ({
    value,
    label,
    disabled,
    onChange,
}) => {
    const { i18n } = useLingui();
    const { language, translations } = Common.useAssets();

    const options = Object
        .values(Game.ItemSocketType)
        .map(type => ({
            id: type,
            label: Game.getItemSocketTypeText(type, language, translations)
        }));
    let selected = value === undefined ? null : options.find(x => x.id === value);
    if (selected === undefined) {
        options.push({
            id: value,
            label: t(i18n)`Unknown: ${value}`
        })
        selected = options[options.length - 1];
    }

    return (
        <Autocomplete
            value={selected}
            options={options}
            filterOptions={(options, { inputValue }) => inputValue.length >= 1
                ? matchSorter(options, inputValue, {
                    keys: ['label']
                })
                : options
            }
            onChange={(_, option) => onChange(option?.id)}
            renderInput={(params) => <TextField {...params} label={label} />}
            disabled={disabled}
        />
    )
}