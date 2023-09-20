import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import {
    AuthSelectors,
    useBumpServiceMutation,
    useBuyServiceMutation,
    useSoftDeleteServiceMutation,
} from '@modules/redux/slices';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import TollIcon from '@mui/icons-material/Toll';
import { Box, Button, Card, Chip, Collapse, Divider, Grid, Typography, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const ServerTypeIcon = styled('img')(() => ({
    paddingTop: 2,
    // backgroundColor: 'red',
    width: 15,
    height: 15,
}));

interface ServiceListingProps {
    realmType: string;
    battleNetTag: string;
    userId: string;
    id: string;
    lastUpdated: string;
    title: string;
    content: string;
    tags: string[];
    vouchRating: number;
    vouchScore: number;
}

export const ServiceListing: React.FC<ServiceListingProps> = ({
    realmType,
    battleNetTag,
    id,
    userId,
    lastUpdated,
    title,
    content,
    tags,
    vouchRating,
    vouchScore,
}) => {
    const { i18n } = useLingui();
    const matches = useMediaQuery('(min-width:600px)');
    const [visible, setVisible] = React.useState<boolean>(false);
    const [bumpService] = useBumpServiceMutation();
    const [softDeleteService] = useSoftDeleteServiceMutation();
    const [buyService] = useBuyServiceMutation();

    const handleBuy = () => buyService({ id });
    const handleBump = () => bumpService({ id });
    const handleSoftDelete = () => softDeleteService({ id });
    const handleReport = () => null;

    const currentUserId = useSelector(AuthSelectors.getUser)?.id;

    const isServiceOwner = currentUserId == userId;

    if (!battleNetTag || !id || !title || !content) {
        return null;
    }

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
                        
                    [&nbsp;<ServerTypeIcon
                        src={Common.GAME_SERVER_TYPE_ICONS[realmType]}
                        alt={`${realmType}'s icon`}
                    />&nbsp;] {title}
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
                    <Common.UserRating user={battleNetTag} rating={vouchRating} score={vouchScore} />
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Typography variant='body2' color='textSecondary'>
                                    {lastUpdated}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {!isServiceOwner
                                    ? (
                                        <Button
                                            color='success'
                                            variant='outlined'
                                            startIcon={<TollIcon />}
                                            sx={{ ml: 1 }}
                                            onClick={handleBuy}
                                        >
                                            {t(i18n)`Buy Service`}
                                        </Button>
                                    )
                                    : <></>}
                                {isServiceOwner
                                    ? (
                                        <Button
                                            color='info'
                                            variant='outlined'
                                            startIcon={<ArrowCircleUpOutlinedIcon />}
                                            sx={{ ml: 1 }}
                                            onClick={handleBump}
                                        >
                                            {t(i18n)`Bump`}
                                        </Button>
                                    )
                                    : <></>}
                                {isServiceOwner
                                    ? (
                                        <Button
                                            color='error'
                                            variant='outlined'
                                            startIcon={<DeleteForeverIcon />}
                                            sx={{ ml: 1 }}
                                            onClick={handleSoftDelete}
                                        >
                                            {t(i18n)`Delete Service`}
                                        </Button>
                                    )
                                    : <></>}
                                <Button
                                    color='error'
                                    variant='outlined'
                                    startIcon={<ReportGmailerrorredIcon />}
                                    sx={{ ml: 1 }}
                                    onClick={handleReport}
                                >
                                    {t(i18n)`Report`}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};
