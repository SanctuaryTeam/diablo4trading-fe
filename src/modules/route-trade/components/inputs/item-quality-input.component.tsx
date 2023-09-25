import { Game } from '@diablosnaps/common';
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

interface ItemQualityOptions {
    id?: Game.ItemQuality;
    label: string;
}

export const ItemQualityInput: React.FC<ItemQualityInputProps> = ({
    value,
    onChange,
    label,
    required,
    disabled,
    language: formLanguage,
}) => {
    const { language: assetsLanguage, translations } = Common.useAssets();
    const language = formLanguage ?? assetsLanguage;

    const options: ItemQualityOptions[] = [Game.ItemQuality.Common, Game.ItemQuality.Magic, Game.ItemQuality.Rare]
        .map((type) => ({
            id: type,
            label: Game.getItemQualityText(type, language, translations),
        }));

    const selected = options.find((o) => o.id === value) ?? undefined;

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
