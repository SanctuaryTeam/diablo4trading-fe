import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { AuthSelectors, useServiceSlotSearchQuery } from '@modules/redux/slices';
import { Box, Card, Divider, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSelector } from 'react-redux';

export const ServiceNotifications: React.FC = () => {
    const { i18n } = useLingui();
    const userId = useSelector(AuthSelectors.getUserId);
    const serviceSlotGetSearchQuery: API.ServiceSlotGetSearchQuery = {
        userId,
    };

    useServiceSlotSearchQuery(serviceSlotGetSearchQuery);
    const notifications = useSelector(AuthSelectors.getUserNotifications);

    return (
        <Card sx={{ p: 2, pt: 0, borderColor: 'white', borderWidth: '2px', borderStyle: 'solid' }}>
            <Box pt={2}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Notifications`}
                </Typography>
                <Divider />
                {notifications
                    ? notifications.map(notification => (
                        <Common.NotificationCard
                            key={'serv-notification-' + notification.reference.id + '-'
                                + notification.recipient.battleNetTag}
                            entity={notification.reference}
                            message={notification.message}
                            recipient={notification.recipient}
                        />
                    ))
                    : <></>}
            </Box>
        </Card>
    );
};
