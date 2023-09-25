import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import {
    CharacterClassInput,
    ItemAffixInput,
    ItemQualityInput,
    ItemSocketTypeInput,
    ItemTypeInput,
    ItemVariantInput,
    NumberInput,
} from './inputs';
import { ListingNewItemFormValue } from './listing-new-3_item.types';

const Image = styled('div')(({ theme }) => ({
    height: '100%',
    minHeight: 384,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
}));

interface ListingNewItemProps {
    value: ListingNewItemFormValue;
    onChange: (update: (prev: ListingNewItemFormValue) => ListingNewItemFormValue) => void;
    image: string;
    language?: Game.Language;
    serverType?: Game.ServerType;
}

export const ListingNewItem: React.FC<ListingNewItemProps> = ({
    value,
    onChange,
    image,
    language,
    serverType,
}) => {
    const { i18n } = useLingui();

    const handleChange = React.useCallback((next: Partial<ListingNewItemFormValue>) => {
        return onChange(prev => ({ ...prev, ...next }));
    }, [onChange]);

    const isSeasonal = !Common.isSeasonal(serverType, value.type);

    React.useEffect(() => {
        if (isSeasonal) {
            handleChange({ socketType: undefined });
        }
    }, [handleChange, serverType, value.type]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Image style={{ backgroundImage: `url(${image})` }} />
            </Grid>
            <Grid item xs={12} md={8}>
                <Stack gap={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' color='text.secondary'>
                                {t(i18n)`Item`}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item container spacing={1}>
                            <Grid item xs={12} sm={6} md={4}>
                                <ItemVariantInput
                                    value={value.variant}
                                    onChange={variant => handleChange({ variant })}
                                    label={t(i18n)`Variant`}
                                    language={language}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <ItemQualityInput
                                    value={value.quality}
                                    onChange={quality => handleChange({ quality })}
                                    label={t(i18n)`Quality`}
                                    required
                                    language={language}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <ItemTypeInput
                                    value={value.type}
                                    onChange={type => handleChange({ type })}
                                    label={t(i18n)`Type`}
                                    required
                                    language={language}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <NumberInput
                                    value={value.power}
                                    onChange={power => handleChange({ power })}
                                    label={t(i18n)`Power`}
                                    min={0}
                                    max={1000}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={1}>
                            <Grid item xs={12} sm={6} md={4}>
                                <NumberInput
                                    value={value.requiredLevel}
                                    onChange={requiredLevel => handleChange({ requiredLevel })}
                                    label={t(i18n)`Required Level`}
                                    min={0}
                                    max={80}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <CharacterClassInput
                                    value={value.classRestriction}
                                    onChange={classRestriction => handleChange({ classRestriction })}
                                    label={t(i18n)`Class Restriction`}
                                    language={language}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {isSeasonal && (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2' color='text.secondary'>
                                    {t(i18n)`Seasonal`}
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <ItemSocketTypeInput
                                    value={value.socketType}
                                    onChange={socketType => handleChange({ socketType })}
                                    label={t(i18n)`Socket Type`}
                                    required
                                    language={language}
                                />
                            </Grid>
                        </Grid>
                    )}
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' color='text.secondary'>
                                {t(i18n)`Inherent Affixes`}
                            </Typography>
                            <Divider />
                        </Grid>
                        {Array.from({
                            length: 2,
                        }).map((_, i) => {
                            const option = value.inherentAffixes?.[i] || {};
                            const placeholder = isNaN(option.value ?? NaN) ? '?' : `${option.value}`;

                            const handleOptionChange = (index: number, update: Partial<Game.ItemAffix>) => {
                                onChange(prev => {
                                    const inherentAffixes = [...(prev.inherentAffixes || [])];
                                    inherentAffixes[index] = {
                                        ...inherentAffixes[index],
                                        ...update,
                                    };
                                    return { ...prev, inherentAffixes };
                                });
                            };

                            return (
                                <Grid key={i} item container spacing={0.5}>
                                    <Grid item xs={9}>
                                        <ItemAffixInput
                                            value={option.id}
                                            onChange={(id) => handleOptionChange(i, { id })}
                                            label={t(i18n)`Affix ${i + 1}`}
                                            placeholder={placeholder}
                                            language={language}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <NumberInput
                                            value={option.value}
                                            onChange={(value) => handleOptionChange(i, { value })}
                                            label={t(i18n)`Value`}
                                            min={0}
                                            required={option.id !== undefined}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' color='text.secondary'>
                                {t(i18n)`Affixes`}
                            </Typography>
                            <Divider />
                        </Grid>
                        {Array.from({
                            length: 4,
                        }).map((_, i) => {
                            const option = value.affixes?.[i] || {};
                            const placeholder = isNaN(option.value ?? NaN) ? '?' : `${option.value}`;

                            const handleOptionChange = (index: number, update: Partial<Game.ItemAffix>) => {
                                onChange(prev => {
                                    const affixes = [...(prev.affixes || [])];
                                    affixes[index] = {
                                        ...affixes[index],
                                        ...update,
                                    };
                                    return { ...prev, affixes };
                                });
                            };

                            return (
                                <Grid key={i} item container spacing={0.5}>
                                    <Grid item xs={9}>
                                        <ItemAffixInput
                                            value={option.id}
                                            onChange={(id) => handleOptionChange(i, { id })}
                                            label={t(i18n)`Affix ${i + 1}`}
                                            placeholder={placeholder}
                                            language={language}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <NumberInput
                                            value={option.value}
                                            onChange={(value) => handleOptionChange(i, { value })}
                                            label={t(i18n)`Value`}
                                            min={0}
                                            required={option.id !== undefined}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Stack>
            </Grid>
        </Grid>
    );
};
