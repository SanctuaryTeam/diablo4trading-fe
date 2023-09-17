import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Autocomplete, TextField } from '@mui/material';
import { matchSorter } from 'match-sorter';

interface ItemQualityInputProps {
    value?: Game.ItemQuality;
    onChange: (value?: Game.ItemQuality) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    language?: Game.Language;
}

export const ItemQualityInput: React.FC<ItemQualityInputProps> = ({
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

    const options = [Game.ItemQuality.Common, Game.ItemQuality.Magic, Game.ItemQuality.Rare]
        .map((type) => ({
            id: type,
            label: Game.getItemQualityText(type, language, translations),
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
            renderInput={(params) => <TextField {...params} label={label} required={required} />}
            disableClearable={required}
            disabled={disabled}
        />
    );
};
