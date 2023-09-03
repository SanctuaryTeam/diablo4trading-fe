import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { PosNegRatingInput } from '@modules/common/components/posneg-rating.component';
import { StarRatingInput } from '@modules/common/components/star-rating.component';
import { Avatar, Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

interface VouchData {
    starRating: number;
    goodRating: boolean;
    notes: string;
}

export const VouchPage: React.FC = () => {
    const { i18n } = useLingui();

    const [vouchData, setVouchData] = React.useState<VouchData>({
        starRating: 3,
        goodRating: true,
        notes: '',
    });

    const handleRatingChange = (newRating: number) => {
        setVouchData({ ...vouchData, starRating: newRating });
    };

    const handleThumbChange = () => {
        setVouchData({ ...vouchData, goodRating: !vouchData.goodRating });
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVouchData({ ...vouchData, notes: event.target.value });
    };

    return (
        <React.Fragment>
            <Grid container spacing={1} mt={2} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                <Grid xs={9} mt={2} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid
                            container
                            spacing={2}
                            m={2}
                            display={'flex'}
                            justifyContent={'center'}
                            alignContent={'center'}
                        >
                            <Grid xs={12}>
                                <Card sx={{ m: 3 }} elevation={0}>
                                    <Grid container display={'flex'}>
                                        <Grid
                                            xs={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <Typography variant='h6' fontWeight='bold'>
                                                {'⭐WTS T100⭐GLYPH XP UNIQUE⭐SPEEDRUNS⭐5m/RUN'}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
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
                                                                        <Typography
                                                                            variant='subtitle1'
                                                                            fontWeight='bold'
                                                                        >
                                                                            {'SparkyOnyx#1187'}
                                                                        </Typography>
                                                                        <Common.UserRating user={'SparkyOnyx#1187'} rating={6} score={456} />
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <Typography variant='h6'>
                                    {t(i18n)`Please rate the product/service.`}
                                </Typography>
                            </Grid>
                            <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <Typography variant='h6' pt={1}>
                                    {t(i18n)`Is this a positive or negative review?`}
                                </Typography>
                            </Grid>
                            <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <StarRatingInput value={vouchData.starRating} onChange={handleRatingChange} />
                            </Grid>
                            <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <PosNegRatingInput value={vouchData.goodRating} onChange={handleThumbChange} />
                            </Grid>
                            <Grid xs={12} m={3} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <TextField
                                    id='outlined-textarea'
                                    label={t(i18n)`Any comments?`}
                                    placeholder='Notes'
                                    multiline
                                    value={vouchData.notes}
                                    onChange={handleNotesChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={null}
                                >
                                    {t(i18n)`Submit`}
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
