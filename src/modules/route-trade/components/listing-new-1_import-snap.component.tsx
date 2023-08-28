import { Game } from '@diablosnaps/common';
import { RPCClient, TransportError, TransportErrorCode } from '@diablosnaps/rpc';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Alert, Button, Snackbar, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { ListingNewImportSnapSearch } from './listing-new-1_import-snap-search.component';

interface ListingNewImportSnapProps {
    onItemImport: (image: string, item: Game.Item) => void;
    onBack: () => void;
}

export const ListingNewImportSnap: React.FC<ListingNewImportSnapProps> = ({
    onItemImport,
    onBack,
}) => {
    const { i18n } = useLingui();

    const client = React.useMemo(() => {
        return new RPCClient();
    }, []);

    const [connecting, setConnecting] = React.useState(true);
    const [missing, setMissing] = React.useState(false);

    useEffect(() => {
        void (async () => {
            setConnecting(true);
            setMissing(false);
            try {
                await client.connect();
            } catch (error) {
                if (
                    error instanceof TransportError
                    && error.code === TransportErrorCode.ConnectionError
                ) {
                    setMissing(true);
                    return;
                }
            } finally {
                setConnecting(false);
            }
        })();
    }, [client]);

    const handleStartClick = () => {
        RPCClient.start();
        onBack();
    };

    const handleDownloadClick = () => {
        RPCClient.download();
        onBack();
    };

    if (connecting || missing) {
        return (
            <>
                <Common.Spinner />
                <Snackbar
                    open={missing}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        severity='error'
                        action={
                            <Stack
                                direction='row'
                                spacing={1}
                            >
                                <Button
                                    color='secondary'
                                    onClick={handleStartClick}
                                >
                                    {t(i18n)`Start`}
                                </Button>
                                <Button
                                    variant='contained'
                                    onClick={handleDownloadClick}
                                >
                                    {t(i18n)`Download`}
                                </Button>
                            </Stack>
                        }
                    >
                        {t(i18n)`${'DIABLOSNAPS'} is either not running or not installed!`}
                    </Alert>
                </Snackbar>
            </>
        );
    }

    return (
        <ListingNewImportSnapSearch
            client={client}
            onItemImport={onItemImport}
            onBack={onBack}
        />
    );
};
