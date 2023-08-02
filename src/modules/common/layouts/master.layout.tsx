import background from '@assets/background.webp';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { FOOTER_HEIGHT, Footer, HEADER_HEIGHT, Header } from '../components';

const Main = styled('main')(() => ({
    display: 'flex',
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'top center',
    backgroundSize: 'cover',
}));

interface MasterLayoutProps {
    children?: React.ReactNode;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({
    children
}) => {
    return (
        <React.Fragment>
            {!hideHeader && <Header />}
            <Main sx={{
                minHeight: `calc(100vh - ${hideHeader ? 0 : HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
            }}>
                <Container
                    maxWidth='xl'
                    sx={{
                        pt: 4,
                        pb: 2
                    }}
                >
                    {children}
                </Container>
            </Main>
            <Footer />
        </React.Fragment>
    )
}