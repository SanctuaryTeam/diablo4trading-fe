import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Card, Divider, Typography } from '@mui/material';
import React from 'react';
import { ServiceOffer } from '../components';

export const ServiceOffers: React.FC = () => {
    const { i18n } = useLingui();

    return (
        <Card sx={{ p: 2, pt: 0 }}>
            <Box pt={2}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Notifications`}
                </Typography>
                <Divider />
                <ServiceOffer
                    score={4.3}
                    buyer={'Billybob#0382'}
                    service={'T4 Capstone Dungeon'}
                />
            </Box>
        </Card>
    );
};
