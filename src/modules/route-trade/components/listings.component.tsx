import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Redux } from '@modules/redux';
import { Button, Card, Stack } from '@mui/material';
import { ListingsDataGrid } from './listings-data-grid.component';

interface ListingsProps {
    onNewClick: () => void;
    onDetailClick: (id: string) => void;
}

export const Listings: React.FC<ListingsProps> = ({
    onNewClick,
    onDetailClick,
}) => {
    const { i18n } = useLingui();

    // TODO: use listings query
    const query = Redux.useTradeSearchQuery({
        page: 1,
        pageSize: 30,
        payload: '',
        // no server type filter
        serverType: Game.ServerType.Eternal,
    });

    return (
        <Card sx={{ p: 2 }}>
            <Stack gap={1}>
                <Stack alignItems='flex-end'>
                    <Button
                        onClick={onNewClick}
                        variant='contained'
                    >
                        {t(i18n)`Create New Listing`}
                    </Button>
                </Stack>
                <ListingsDataGrid
                    results={query?.data?.results ?? []}
                    onResultClick={onDetailClick}
                />
            </Stack>
        </Card>
    );
};
