import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { LanguageInput } from './inputs';
import { ListingNewParamsFormValue } from './listing-new-2_params.types';

interface ListingNewParamsProps {
    value: ListingNewParamsFormValue;
    onChange: (update: (prev: ListingNewParamsFormValue) => ListingNewParamsFormValue) => void;
}

export const ListingNewParams: React.FC<ListingNewParamsProps> = ({
    value,
    onChange,
}) => {
    const { i18n } = useLingui();

    const handleChange = React.useCallback((next: Partial<ListingNewParamsFormValue>) => {
        return onChange(prev => ({ ...prev, ...next }));
    }, [onChange]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Params`}
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <LanguageInput
                    value={value.language}
                    label={t(i18n)`Language`}
                    required
                    onChange={language => handleChange({ language })}
                />
            </Grid>
            <Grid item xs={12}>
                <Common.ServerTypeInput
                    value={value.serverType}
                    label={t(i18n)`Server`}
                    required
                    onChange={serverType => handleChange({ serverType })}
                />
            </Grid>
        </Grid>
    );
};
