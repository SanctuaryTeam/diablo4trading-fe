import { Redux } from '@modules/redux';
import { AuthSelectors } from '@modules/redux/slices';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Card, IconButton, Menu, MenuItem } from '@mui/material';
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
    const notifications = useSelector(AuthSelectors.getNotifications);
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
                >
                    <Card
                        elevation={2}
                        sx={{ outlineColor: 'error' }}
                    >
                        {notifications
                            ? notifications.map(notification => (
                                <MenuItem
                                    key={'navbar-notification-' + notification?.entity?.id + '-'
                                        + notification?.recipient?.id}
                                    onClick={handleCloseMenu}
                                >
                                    <Common.NotificationCard
                                        entity={notification?.entity}
                                        message={notification?.message}
                                        recipient={notification?.recipient}
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
