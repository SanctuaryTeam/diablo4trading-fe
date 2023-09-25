import { Game } from '@diablosnaps/common';
import { Common } from '@modules/common';
import { Autocomplete, TextField } from '@mui/material';
import { matchSorter } from 'match-sorter';

interface ItemVariantInputProps {
    value?: Game.ItemVariant;
    onChange: (value?: Game.ItemVariant) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    language?: Game.Language;
}

interface ItemVariantOptions {
    id?: Game.ItemVariant;
    label: string;
}

export const ItemVariantInput: React.FC<ItemVariantInputProps> = ({
    value,
    onChange,
    label,
    required,
    disabled,
    language: formLanguage,
}) => {
    const { language: assetsLanguage, translations } = Common.useAssets();
    const language = formLanguage ?? assetsLanguage;

    const options: ItemVariantOptions[] = Object
        .values(Game.ItemVariant)
        .map<ItemVariantOptions>((type) => ({
            id: type,
            label: Game.getItemVariantText(type, language, translations),
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
