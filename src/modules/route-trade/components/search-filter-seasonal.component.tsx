import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Divider, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import { ItemSocketTypeInput } from './inputs';

interface SearchFilterSeasonalProps {
    value: API.TradeSeasonalFilter;
    onChange: (value: API.TradeSeasonalFilter) => void;
    disabled?: boolean;
}

export const SearchFilterSeasonal: React.FC<SearchFilterSeasonalProps> = ({
    value = {} as API.TradeSeasonalFilter,
    onChange,
    disabled,
}) => {
    const { i18n } = useLingui();
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography
                    variant='subtitle2'
                    color='text.secondary'
                >
                    {t(i18n)`Seasonal`}
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12} lg={6}>
                <ItemSocketTypeInput
                    value={value.socketType}
                    onChange={(socketType) => onChange({ ...value, socketType })}
                    label={t(i18n)`Socket Type`}
                    disabled={disabled}
                />
            </Grid>
        </Grid>
    );
};
