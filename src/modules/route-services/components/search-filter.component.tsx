import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestoreIcon from '@mui/icons-material/Restore';
import { Box, Button, Card, Collapse, Divider, Grid } from '@mui/material';
import { API } from '@sanctuaryteam/shared'; // Commented for above reason
import React from 'react';
import { SearchFilterTags } from './search-filter-tags.component';
import { SearchFilterTitle } from './search-filter-title.component';

interface SearchFilterProps {
    onSearch: (query: API.ServiceGetSearchQuery) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
    onSearch,
}) => {
    const { i18n } = useLingui();
    const [serverType, setServerType] = Common.useRouteServerType();
    const [visible, setVisible] = React.useState<boolean>(true);
    const [query, setQuery] = React.useState<API.ServiceGetSearchQuery>({
        serverType,
        title: '',
        tags: 0,
        deleted: false,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(query);
        setVisible(false);
    };

    const handleClear = () => {
        setQuery({
            ...query,
            title: '',
            tags: 0,
        });
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
                                        <SearchFilterTitle
                                            value={query.title}
                                            onChange={(title) =>
                                                setQuery({
                                                    ...query,
                                                    title: title,
                                                })}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SearchFilterTags
                                    //                                  value={query.tags}
                                    onChange={(tags) =>
                                        setQuery({
                                            ...query,
                                            tags: tags,
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
