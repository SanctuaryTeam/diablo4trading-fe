import { Game, RPC } from '@diablosnaps/common';
import { RPCClient, TransportError, TransportErrorCode } from '@diablosnaps/rpc';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import React from 'react';

const DEBOUNCE = 200;

const QUALITIES = [
    Game.ItemQuality.Common,
    Game.ItemQuality.Magic,
    Game.ItemQuality.Rare,
];

interface ListingNewImportSnapSearchProps {
    client: RPCClient;
    onItemImport: (image: string, item: Game.Item) => void;
    onBack: () => void;
}

export const ListingNewImportSnapSearch: React.FC<ListingNewImportSnapSearchProps> = ({
    client,
    onItemImport,
    onBack,
}) => {
    const { i18n } = useLingui();

    const [viewValue, setViewValue] = React.useState<string>('');
    const [value, setValue] = React.useState<string>('');

    React.useEffect(() => {
        const timeout = window.setTimeout(() => {
            setValue(viewValue);
        }, viewValue.length > 2 ? DEBOUNCE : 1);
        return () => {
            window.clearTimeout(timeout);
        };
    }, [viewValue]);

    const [result, setResult] = React.useState<RPC.GetBackpackItemsResult>(null);

    const executeSearch = React.useCallback(async (search: string) => {
        try {
            // filter by quality here
            const result = await client.getBackpackItems({
                page: 0,
                search,
            });
            setResult(result);
        } catch (error) {
            if (
                error instanceof TransportError
                && error.code === TransportErrorCode.ConnectionError
            ) {
                onBack();
                return;
            }
        }
    }, [client, onBack]);

    React.useEffect(() => {
        void executeSearch(value);
    }, [executeSearch, value]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setViewValue(value);
    };

    const handleClick = (id: string, item: Game.Item) => {
        void client.getBackpackImage({ id })
            .then(({ dataURL: image }) => {
                onItemImport(image, item);
            });
    };

    return (
        <Stack
            spacing={1}
            direction='column'
            sx={theme => ({
                width: theme.breakpoints.values.lg,
                maxWidth: '100%',
            })}
        >
            <TextField
                value={viewValue}
                onChange={handleValueChange}
                placeholder={t(i18n)`Search...`}
                hiddenLabel
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                    ),
                }}
            />
            <Grid
                container
                spacing={1}
                sx={{
                    overflowY: 'auto',
                    height: 'calc(100vh - 186px)',
                }}
            >
                {result?.hits
                    .filter(x => QUALITIES.includes(x.value.quality))
                    .map(x => (
                        <Grid
                            key={x.id}
                            item
                            sm={12}
                            md={6}
                            lg={4}
                            display='flex'
                            justifyContent='center'
                        >
                            <Box
                                display='flex'
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleClick(x.id, x.value)}
                            >
                                <Common.ItemTooltip
                                    item={x.value}
                                />
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Stack>
    );
};
