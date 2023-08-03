import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Divider, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import { CharacterClassInput, ItemTypeInput, NumberInput } from './inputs';

interface SearchFilterItemProps {
    value: API.ItemFilter;
    onChange: (value: API.ItemFilter) => void;
}

export const SearchFilterItem: React.FC<SearchFilterItemProps> = ({
    value = {} as API.ItemFilter,
    onChange,
}) => {
    const { i18n } = useLingui();
    return (
        <Grid
            container
            spacing={1}
        >
            <Grid
                item
                xs={12}
            >
                <Typography
                    variant='subtitle2'
                    color='text.secondary'
                >
                    {t(i18n)`Item`}
                </Typography>
                <Divider />
            </Grid>
            <Grid
                item
                xs={12}
                lg={6}
            >
                <ItemTypeInput
                    value={value.type}
                    onChange={(type) => onChange({ ...value, type })}
                    label={t(i18n)`Type`}
                />
            </Grid>
            <Grid
                item
                xs={12}
                lg={6}
            >
                <NumberInput
                    value={value.minPower}
                    onChange={(minPower) => onChange({ ...value, minPower })}
                    min={0}
                    max={850}
                    label={t(i18n)`Min Power`}
                />
            </Grid>
            <Grid
                item
                xs={12}
                lg={6}
            >
                <CharacterClassInput
                    value={value.classRestriction}
                    onChange={(classRestriction) => onChange({ ...value, classRestriction })}
                    label={t(i18n)`Class Restriction`}
                />
            </Grid>
            <Grid
                item
                xs={12}
                lg={6}
            >
                <NumberInput
                    value={value.maxRequiredLevel}
                    onChange={(maxRequiredLevel) => onChange({ ...value, maxRequiredLevel })}
                    min={0}
                    max={80}
                    label={t(i18n)`Max Required Level`}
                />
            </Grid>
        </Grid>
    );
};
