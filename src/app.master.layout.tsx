import background from '@assets/background.webp';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Redux } from '@modules/redux';
import { Alert, Container, Snackbar as MuiSnackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const Main = styled('main')(() => ({
    display: 'flex',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'top center',
    backgroundSize: 'cover',
}));

interface MasterLayoutProps {
    hideNavigation?: boolean;
    children?: React.ReactNode;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({
    hideNavigation,
    children,
}) => {
    const error = useSelector(Redux.SnackbarSelectors.getError);
    const active = useSelector(Redux.SnackbarSelectors.getActive);
    const message = useSelector(Redux.SnackbarSelectors.getMessage);
    const { i18n } = useLingui();

    const Snackbar = () => (
        <MuiSnackbar
            open={active}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert severity={error ? 'error' : 'success'}>
                {t(i18n)`${message}`}
            </Alert>
        </MuiSnackbar>
    );

    return (
        <React.Fragment>
            {<Common.Header hideNavigation={hideNavigation} />}
            <Main
                sx={{
                    minHeight: `calc(100vh - ${Common.HEADER_HEIGHT}px - ${Common.FOOTER_HEIGHT}px)`,
                }}
            >
                <Container
                    maxWidth='xl'
                    sx={{ pt: 2, pb: 2 }}
                >
                    {children}
                    <Snackbar />
                </Container>
            </Main>
            <Common.Footer />
        </React.Fragment>
    );
};
