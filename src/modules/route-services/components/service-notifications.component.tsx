import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { AuthSelectors, ServiceSelectors, useServiceSlotSearchQuery } from '@modules/redux/slices';
import { Box, Card, Divider, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSelector } from 'react-redux';

export const ServiceNotifications: React.FC = () => {
    const { i18n } = useLingui();
    const serviceSlotGetSearchQuery: API.ServiceSlotGetSearchQuery = {
        userId: useSelector(AuthSelectors.getUserId),
    };

    useServiceSlotSearchQuery(serviceSlotGetSearchQuery);
    const slots = useSelector(ServiceSelectors.getUserSlots);
    // TODO: Change to use notifications once seeded with notifications set to be created too.

    return (
        <Card sx={{ p: 2, pt: 0 }}>
            <Box pt={2}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Notifications`}
                </Typography>
                <Divider />
                {slots
                    ? slots.map(slot => (
                        // <ServiceNotification
                        //     key={slot?.id}
                        //     slot={slot}
                        //     service={slot?.service}
                        //     score={4.3}
                        //     buyer={slot?.client?.battleNetTag}
                        // />
                        <Common.NotificationCard
                            key={slot?.id}
                            entity={slot}
                            message={slot?.service?.title}
                            recipient={slot?.client}
                        />
                    ))
                    : <></>}
            </Box>
        </Card>
    );
};
