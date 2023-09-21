import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Divider, Grid, Typography } from '@mui/material';
import { ServiceTitleInput } from './inputs';

interface SearchFilterTitleProps {
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const SearchFilterTitle: React.FC<SearchFilterTitleProps> = ({
    value,
    onChange,
    disabled,
}) => {
    const { i18n } = useLingui();

    const handleChange = (title: string) => {
        onChange(value = title);
    };
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Service Title`}
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <ServiceTitleInput
                    value={value}
                    label={'Keywords'}
                    onChange={handleChange}
                    disabled={disabled}
                />
            </Grid>
        </Grid>
    );
};
