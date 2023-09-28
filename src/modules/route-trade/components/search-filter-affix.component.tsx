import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { ItemAffixInput, NumberInput } from './inputs';

const ITEM_AFFIX_MAX_COUNT = 4;

const AFFIX_MIN_COUNT = 4;
const AFFIX_MAX_COUNT = 8;

function getValidOptionsCount(options: API.TradeAffixOption[]) {
    return options.filter((option) => option?.id !== undefined).length;
}

function getCountRange(options: API.TradeAffixOption[]) {
    const count = getValidOptionsCount(options);
    const min = count >= 1 ? 1 : undefined;
    const max = count >= 1 ? Math.min(count, ITEM_AFFIX_MAX_COUNT) : undefined;
    return { min, max, count };
}

interface SearchFilterAffixProp {
    value?: API.TradeAffixFilter;
    onChange: (value: API.TradeAffixFilter) => void;
    disabled?: boolean;
}

export const SearchFilterAffix: React.FC<SearchFilterAffixProp> = ({
    value = {} as API.TradeAffixFilter,
    onChange,
    disabled,
}) => {
    const { i18n } = useLingui();

    const { options = [], count } = value;

    const getNewCount = (newOptions: API.TradeAffixOption[]) => {
        const range = getCountRange(newOptions);
        let newCount: number | undefined = undefined;
        if (range.count >= 1) {
            newCount = Math.min(range.count, ITEM_AFFIX_MAX_COUNT - 1);
            const valueCount = value.count ?? NaN;
            const rangeMax = range.max ?? 0;
            if (!isNaN(valueCount)) {
                if (valueCount > newCount && valueCount <= rangeMax) {
                    newCount = value.count;
                }
            }
        }
        return newCount;
    };

    const handleOptionChange = (index: number, update: Partial<API.TradeAffixOption>) => {
        const newOptions = [...options];
        newOptions[index] = {
            ...newOptions[index],
            ...update,
        };
        onChange({
            ...value,
            count: getNewCount(newOptions),
            options: newOptions,
        });
    };

    const handleAddAffixClick = () => {
        const length = Math.max(options.length, AFFIX_MIN_COUNT) + 1;
        const newOptions = Array.from({ length }).map((_, i) => options[i]);
        onChange({
            ...value,
            options: newOptions,
        });
    };

    const handleRemoveAffixClick = (index: number) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        onChange({
            ...value,
            count: getNewCount(newOptions),
            options: newOptions,
        });
    };

    const range = getCountRange(options);
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography
                    variant='subtitle2'
                    color='text.secondary'
                >
                    {t(i18n)`Affixes`}
                </Typography>
                <Divider />
            </Grid>
            {Array.from({
                length: Math.max(AFFIX_MIN_COUNT, Math.min(options.length ?? 0, AFFIX_MAX_COUNT)),
            }).map((_, i) => {
                const option = options[i] || {
                    id: undefined,
                };
                const placeholder = isNaN(option.minValue ?? NaN) ? '#' : `${option.minValue}`;
                return (
                    <Grid key={i} item xs={12}>
                        <Grid container spacing={0.5}>
                            <Grid item xs={9}>
                                <Stack direction='row' alignItems='center'>
                                    {options.length > AFFIX_MIN_COUNT && (
                                        <IconButton
                                            onClick={() => handleRemoveAffixClick(i)}
                                            disabled={disabled}
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                    <ItemAffixInput
                                        value={option.id}
                                        onChange={(id) => handleOptionChange(i, { id })}
                                        label={t(i18n)`Affix ${i + 1}`}
                                        placeholder={placeholder}
                                        disabled={disabled}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <NumberInput
                                    value={option.minValue}
                                    onChange={(minValue) => handleOptionChange(i, { minValue })}
                                    min={0}
                                    label={t(i18n)`Value`}
                                    disabled={disabled}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}
            {range.count >= 2 && (
                <Grid item xs={12}>
                    <Grid item container spacing={1}>
                        <Grid item xs={9}>
                            <Divider />
                        </Grid>
                        <Grid item xs={3} />
                        <Grid item xs={6}>
                            <NumberInput
                                value={count}
                                onChange={(count) => onChange({ ...value, count })}
                                min={range.min}
                                max={range.max}
                                disabled={disabled || range.min === undefined || range.max === undefined}
                                label={t(i18n)`Minimum Affixes Required`}
                                helperText={count && count >= 1 && range.count !== count
                                    ? t(i18n)`At least ${count} of the ${range.count} affixes will be present`
                                    : undefined}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            {range.count >= AFFIX_MIN_COUNT && (
                                <Button
                                    onClick={handleAddAffixClick}
                                    disabled={disabled || options.length >= AFFIX_MAX_COUNT}
                                    sx={{ mt: '4px' }}
                                    fullWidth
                                >
                                    {t(i18n)`Add New Affix`}
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};
