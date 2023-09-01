import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Redux } from '@modules/redux';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import TollIcon from '@mui/icons-material/Toll';
import { Box, Button, Card, Chip, Collapse, Divider, Grid, Snackbar, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface SearchResultProps {
    user: string;
    id: string;
    lastUpdated: string;
    title: string;
    content: string;
    tags: string[];
}

export const SearchResult: React.FC<SearchResultProps> = ({
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
    const [isError, setIsError] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [bumpService] = Redux.useBumpServiceMutation();
    const [buyService] = Redux.useBuyServiceMutation();
    const userId = parseInt(useSelector(Redux.AuthSelectors.getUser).id, 10);

    async function handleBump() {
        await bumpService(id).unwrap()
            .then(payload => {
                console.log('Service bumped successfully!');
                console.log('Fulfilled: ' + JSON.stringify(payload));
            })
            .catch(error => {
                setError(error ? error.data?.message : error.data?.message?.message);
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                }, 5000);
            });
    }

    async function handleBuy() {
        buyService({ id, userId }).unwrap()
            .then(payload => {
                console.log('Service purchased successfully!');
                console.log('Fulfilled: ' + JSON.stringify(payload));
            })
            .catch(error => {
                setError(error.data?.message ? error.data?.message : error.data?.message?.message);
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                }, 5000);
            });
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
                    {matches // Browser View
                        ? (
                            <Grid container>
                                <Grid item xs={9} alignContent='flex-start' justifyContent='flex-start'>
                                    <Typography variant='h6' fontWeight='bold'>
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} alignContent='flex-end' justifyContent='flex-end'>
                                    <Button
                                        variant='outlined'
                                        color='secondary'
                                        onClick={() => setVisible(!visible)}
                                        endIcon={visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    >
                                        {visible ? t(i18n)`Collapse` : t(i18n)`Expand`}
                                    </Button>
                                </Grid>
                            </Grid>
                        )
                        : ( // Mobile View
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Typography variant='h6' fontWeight='bold'>
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant='outlined'
                                        color='secondary'
                                        onClick={() => setVisible(!visible)}
                                        endIcon={visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    >
                                        {visible ? t(i18n)`Collapse` : t(i18n)`Expand`}
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                </Box>
                <Collapse in={visible}>
                    {tags.map(t => <Chip label={t} key={t} sx={{ mr: 1 }}></Chip>)}
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
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Common.UserRating user={user} rating={6} score={456} />
                        <Button
                            color='success'
                            variant='outlined'
                            startIcon={<TollIcon />}
                            sx={{ ml: 1 }}
                            onClick={handleBuy} // TODO: Implement Buy Service
                        >
                            {t(i18n)`Buy Service`}
                        </Button>
                        <Button
                            color='info'
                            variant='outlined'
                            startIcon={<ArrowCircleUpIcon />}
                            sx={{ ml: 1 }}
                            onClick={handleBump}
                        >
                            {t(i18n)`Bump`}
                        </Button>
                        <Button
                            color='error'
                            variant='outlined'
                            startIcon={<ReportGmailerrorredIcon />}
                            sx={{ ml: 1 }}
                            // onClick={handleReport} // TODO: Implement Report Service
                        >
                            {t(i18n)`Report`}
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant='body2' color='textSecondary'>
                            {lastUpdated}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={isError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity='error'>
                    {error}
                </Alert>
            </Snackbar>
        </Card>
    );
};
