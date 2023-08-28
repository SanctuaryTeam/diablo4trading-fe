import logo from '@assets/logo.webp';
import { PosNegRatingInput } from '@modules/common/components/posneg-rating.component';
import { StarRatingInput } from '@modules/common/components/star-rating.component';
import { Card, Grid, TextField, Typography, styled } from '@mui/material';
import React from 'react';

const Logo = styled('img')(() => ({
    width: 50,
    height: 'auto',
}));
Logo.defaultProps = {
    src: logo,
};

export const FeedbackPage: React.FC = () => {
    const [ratingValue, setRatingValue] = React.useState<number>(5);
    const [goodRating, setGoodRating] = React.useState<boolean>(true);
    const [notes, setNotes] = React.useState<string>("");


    const handleRatingChange = (newValue: number) => {
        setRatingValue(newValue);
    };

    const handleThumbsUpChange = () => {
        setGoodRating(!goodRating);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    return (
        <React.Fragment>
            <Grid container spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
                <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ maxWidth: 50 }}>
                        <Logo />
                    </Card>
                </Grid>
                <Grid xs={9} mt={2}>
                    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container m={2}>
                            <Grid xs={12}>
                                <Card elevation={2} sx={{ m: 3, backgroundColor: 'grey' }}>
                                    <Grid container>
                                        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant='h6' m={1}>
                                            We value your feedback.
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant='subtitle1' m={1}>
                                            Please complete the following form and help us improve our customer service.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant='h6' m={1}>
                                Please rate the product/service
                                </Typography>
                                <StarRatingInput value={ratingValue} onChange={handleRatingChange} />
                            </Grid>
                            <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant='h6' m={1}>
                                Is this a positive or negative review?
                                </Typography>
                                <PosNegRatingInput value={goodRating} onChange={handleThumbsUpChange} />
                            </Grid>
                            <Grid xs={12} m={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Any Comments?"
                                    placeholder="Notes"
                                    multiline
                                    value={notes}
                                    onChange={handleNotesChange}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
