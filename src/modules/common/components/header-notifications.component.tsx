import { Redux } from '@modules/redux';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Card, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserRating } from '.';

export const HeaderNotifications: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const user = useSelector(Redux.AuthSelectors.getUser) ?? null;
    if (user) {
        return (
            <React.Fragment>
                <IconButton
                    onMouseEnter={handleOpenMenu}
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
                        sx={{ outlineColor: 'error', boxShadow: '0 0 10px #d32f2f' }}
                    >
                        <MenuItem
                            onClick={handleCloseMenu}
                        >
                            <Grid
                                container
                                spacing={1}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Grid xs={6} display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'}>
                                    <UserRating rating={6} score={200} />
                                </Grid>
                                <Grid xs={6} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                                    <Typography
                                        variant='body2'
                                        sx={{ ml: 5 }}
                                    >
                                        Has bought your service
                                    </Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </Card>
                </Menu>
            </React.Fragment>
        );
    }
};
