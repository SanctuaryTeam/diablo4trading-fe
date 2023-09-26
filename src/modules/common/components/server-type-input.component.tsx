import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { matchSorter } from 'match-sorter';
import { GAME_SERVER_TYPE_ICONS } from '../constants';
import { useAssets } from '../providers';

const ServerTypeIcon = styled('img')(() => ({
    width: 22,
    height: 22,
    marginRight: 4,
}));

interface ServerTypeOption {
    id: Game.ServerType;
    label: string;
}

interface ServerTypeInputProps {
    value?: Game.ServerType;
    onChange: (value: Game.ServerType) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
}

export const ServerTypeInput: React.FC<ServerTypeInputProps> = ({
    value,
    onChange,
    label,
    required,
    disabled,
}) => {
    const onChangeHandler = (value?: Game.ServerType) => {
        if (!value) {
            return;
        }

        onChange(value);
    };

    const { i18n } = useLingui();
    const { language, translations } = useAssets();
    const options: ServerTypeOption[] = Object
        .values(Game.ServerType)
        .map((type) => ({
            id: type,
            label: Game.getServerTypeText(type, language, translations),
        }));

    const selected = options.find((x) => x.id === value)
        ?? {
            id: Game.ServerType.Seasonal,
            label: Game.getServerTypeText(Game.ServerType.Seasonal, language, translations),
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
                <li {...props}>
                    <ServerTypeIcon
                        src={GAME_SERVER_TYPE_ICONS[option.id]}
                        alt={t(i18n)`${Game.getServerTypeText(option.id, language, translations)}'s icon`}
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
                    hiddenLabel={!label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: value && <ServerTypeIcon src={GAME_SERVER_TYPE_ICONS[value]} />,
                    }}
                />
            )}
            disableClearable={required}
            disabled={disabled}
        />
    );
};
