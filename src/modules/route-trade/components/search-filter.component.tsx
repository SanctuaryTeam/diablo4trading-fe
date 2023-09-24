import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestoreIcon from '@mui/icons-material/Restore';
import { Box, Button, Card, Collapse, Divider, Grid } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { SearchFilterAffix } from './search-filter-affix.component';
import { SearchFilterItem } from './search-filter-item.component';
import { SearchFilterSeasonal } from './search-filter-seasonal.component';

interface SearchFilterProps {
    payload: API.TradeSearchPayload;
    onSearch: (payload: API.TradeSearchPayload) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
    payload: initialPayload,
    onSearch,
}) => {
    const { i18n } = useLingui();

    const [serverType, setServerType] = Common.useRouteServerType();

    const [visible, setVisible] = React.useState<boolean>(true);
    const [payload, setPayload] = React.useState<API.TradeSearchPayload>(initialPayload);

    const {
        query = {},
    } = payload;

    React.useEffect(() => {
        const itemType = payload?.query?.item?.type;
        if (itemType && !Common.isSeasonal(serverType, itemType)) {
            if (payload.query?.seasonal) {
                setPayload({
                    ...payload,
                    query: { ...payload.query, seasonal: undefined },
                });
            }
        }
    }, [payload, serverType]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(payload);
        setVisible(false);
    };

    const handleClear = () => {
        setPayload({});
        setVisible(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card sx={{ p: 2, pt: 0 }}>
                <Collapse in={visible}>
                    <Box pt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12}>
                                        <SearchFilterItem
                                            value={query.item}
                                            onChange={(item) =>
                                                setPayload({
                                                    ...payload,
                                                    query: { ...query, item },
                                                })}
                                        />
                                    </Grid>
                                    {Common.isSeasonal(serverType, query?.item?.type) && (
                                        <Grid item xs={12}>
                                            <SearchFilterSeasonal
                                                value={query.seasonal}
                                                onChange={(seasonal) =>
                                                    setPayload({
                                                        ...payload,
                                                        query: {
                                                            ...query,
                                                            seasonal,
                                                        },
                                                    })}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SearchFilterAffix
                                    value={query.affix}
                                    onChange={(affix) =>
                                        setPayload({
                                            ...payload,
                                            query: { ...query, affix },
                                        })}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: { md: 'none' } }}>
                                <Divider />
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
                <Box pt={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={3}>
                            <Common.ServerTypeInput
                                value={serverType}
                                onChange={setServerType}
                            />
                        </Grid>
                        <Grid md={1} item sx={{ display: { xs: 'none', md: 'block' } }} />
                        <Grid item xs={12} sm={12} md={4}>
                            <Button
                                variant='outlined'
                                fullWidth
                                onClick={handleSubmit}
                            >
                                {t(i18n)`Search`}
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            display='flex'
                            justifyContent='flex-end'
                            sx={(theme) => ({
                                [theme.breakpoints.down('sm')]: {
                                    justifyContent: 'space-between',
                                },
                            })}
                            gap={1}
                        >
                            <Button
                                variant='outlined'
                                onClick={handleClear}
                                startIcon={<RestoreIcon />}
                            >
                                {t(i18n)`Clear`}
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                onClick={() => setVisible(!visible)}
                                endIcon={visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {visible ? t(i18n)`Hide Filters` : t(i18n)`Show Filters`}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </form>
    );
};
