import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { useBumpServiceMutation, useSoftDeleteServiceMutation } from '@modules/redux/slices';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Box, Button, Card, Chip, Collapse, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

interface ServiceListingProps {
    user: string;
    id: string;
    lastUpdated: string;
    title: string;
    content: string;
    tags: string[];
}

export const ServiceListing: React.FC<ServiceListingProps> = ({
    user,
    id,
    lastUpdated,
    title,
    content,
    tags,
}) => {
    const { i18n } = useLingui();
    const matches = useMediaQuery('(min-width:600px)');
    const [visible, setVisible] = React.useState<boolean>(false);
    const [bumpService] = useBumpServiceMutation();
    const [softDeleteService] = useSoftDeleteServiceMutation();

    function handleBump() {
        bumpService(id);
        setTimeout(() => {
            return window.location.reload();
        }, 1500);
    }

    function handleSoftDelete() {
        softDeleteService(id);
        setTimeout(() => {
            return window.location.reload();
        }, 1500);
    }

    if (user && id && title && content) {
        return (
            <Card sx={{ p: 2, mt: 2, display: 'flex' }}>
                <Box flex='1'>
                    <Box
                        onClick={() => setVisible(!visible)}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant='h6' fontWeight='bold'>
                            {title}
                        </Typography>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() => setVisible(!visible)}
                            endIcon={visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        >
                            {visible ? t(i18n)`Collapse` : t(i18n)`Expand`}
                        </Button>
                    </Box>
                    <Collapse in={visible}>
                        {tags.map(t => <Chip label={t} key={t} sx={{ mr: 1 }}></Chip>)}
                        <Typography variant='body1' sx={{ mt: 1, display: matches ? 'flex' : 'block' }} component='pre'>
                            {content}
                        </Typography>
                    </Collapse>
                    <Divider sx={{ mt: 2 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 2,
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6}>
                                            <Avatar
                                                src='https://placekitten.com/40/40'
                                                sx={{ mr: 1 }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box>
                                                <Typography variant='subtitle1' fontWeight='bold'>
                                                    {user}
                                                </Typography>
                                                <Common.UserRating rating={6} score={456} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>

                            <Grid container>
                                <Grid item xs={3} md={12}>
                                    <Button
                                        color='info'
                                        variant='outlined'
                                        startIcon={<ArrowCircleUpOutlinedIcon />}
                                        sx={{ ml: matches ? 40 : 3 }}
                                        onClick={handleBump}
                                    >
                                        {t(i18n)`Bump`}
                                    </Button>
                                    <Button
                                        color='error'
                                        variant='outlined'
                                        startIcon={<DeleteForeverIcon />}
                                        sx={{ ml: matches ? 1 : 3, mt: matches ? 0 : 1 }}
                                        onClick={handleSoftDelete}
                                    >
                                        {t(i18n)`Delete Service`}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Typography variant='body2' color='textSecondary'>
                                {lastUpdated}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
        );
    } else {
        return (
            <Card sx={{ p: 2, mt: 2, display: 'flex' }}>
                <Box flex='1'>
                    <Box
                        onClick={() => setVisible(!visible)}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                    </Box>
                    <Collapse in={visible}>
                        <Typography variant='body1' sx={{ mt: 1 }} component='pre'>
                            {content}
                        </Typography>
                    </Collapse>
                    <Divider sx={{ mt: 2 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 2,
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}
                    >
                    </Box>
                </Box>
            </Card>
        );
    }
};
