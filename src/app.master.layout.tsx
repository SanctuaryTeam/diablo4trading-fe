import background from '@assets/background.webp';
import { Common } from '@modules/common';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

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
    return (
        <React.Fragment>
            {<Common.Header hideNavigation={hideNavigation} />}
            <Main
                sx={{
                    minHeight: `calc(100vh - ${Common.HEADER_HEIGHT}px - ${Common.FOOTER_HEIGHT}px)`,
                }}
            >
                <Container maxWidth='xl' sx={{ pt: 2, pb: 2 }}>
                    {children}
                </Container>
            </Main>
            <Common.Footer />
        </React.Fragment>
    );
};
