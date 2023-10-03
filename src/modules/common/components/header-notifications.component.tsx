import { Redux } from '@modules/redux';
import { AuthSelectors, useSearchNotificationsQuery } from '@modules/redux/slices';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Card, IconButton, Menu, MenuItem } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Common } from '..';

export const HeaderNotifications: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const user = useSelector(Redux.AuthSelectors.getUser) ?? null;
    user && useSearchNotificationsQuery({ recipientId: user.id });
    const notifications = useSelector(AuthSelectors.getUserNotifications);

    if (user) {
        return (
            <React.Fragment>
                <IconButton
                    onClick={handleOpenMenu}
                >
                    <NotificationsActiveIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    sx={{ maxWidth: '25%' }}
                >
                    <Card
                        elevation={2}
                        sx={{ outlineColor: 'error', borderColor: 'white', borderWidth: '2px', borderStyle: 'solid' }}
                    >
                        {notifications
                            ? notifications.map(notification => (
                                <MenuItem
                                    key={'navbar-notification-' + notification.reference?.id + '-'
                                        + notification.recipient?.id}
                                >
                                    <Common.NotificationCard
                                        entity={notification.reference as API.UserVouchDto}
                                        message={notification.message}
                                        recipient={notification.recipient}
                                    />
                                </MenuItem>
                            ))
                            : <></>}
                    </Card>
                </Menu>
            </React.Fragment>
        );
    }
};
