import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Box, Button, Grid, Stack } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';

interface ListingDetailProps {
    id: string;
    onCancel: () => void;
}

export const ListingDetail: React.FC<ListingDetailProps> = ({
    id,
    onCancel,
}) => {
    const { i18n } = useLingui();
    // TODO: use listing query

    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [id]);

    if (loading) {
        return <Common.Spinner />;
    }

    const result: API.TradeSearchResult = {
        item: {
            language: Game.Language.English,
            quality: Game.ItemQuality.Rare,
            variant: Game.ItemVariant.Ancestral,
            type: Game.ItemType.Crossbow,
            power: 949,
            requiredLevel: 86,
            classRestriction: Game.Class.Druid,
            inherentAffixes: [
                { id: '1322036', value: 1 },
            ],
            affixes: [
                { id: '761190', value: 2 },
                { id: '577073', value: 3 },
                { id: '1295786', value: 4 },
                { id: '1318304', value: 5 },
            ],
        },
        listing: {
            id: '1',
        },
    };

    const isValid = false;

    const handleSave = () => {
        // TODO
    };

    return (
        <Box
            sx={theme => ({
                p: 2,
                width: theme.breakpoints.values.md,
                maxWidth: '100%',
            })}
        >
            <Stack height='100%' gap={1}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        display='flex'
                        justifyContent='center'
                    >
                        <Common.ItemTooltip
                            item={result.item}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>{'<< MOCK'}</div>
                    </Grid>
                </Grid>
                <Stack
                    direction='row'
                    justifyContent='flex-end'
                    spacing={1}
                >
                    <Button
                        onClick={onCancel}
                        color='secondary'
                    >
                        {t(i18n)`Cancel`}
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!isValid}
                        variant='contained'
                    >
                        {t(i18n)`Save`}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};
