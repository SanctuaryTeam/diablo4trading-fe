import logo from '@assets/logo.webp';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { PosNegRatingInput } from '@modules/common/components/posneg-rating.component';
import { StarRatingInput } from '@modules/common/components/star-rating.component';
import { Button, Card, Grid, TextField, Typography, styled } from '@mui/material';
import React from 'react';

const Logo = styled('img')(() => ({
    width: 50,
    height: 'auto',
}));
Logo.defaultProps = {
    src: logo,
};

interface VouchData {
    starRating: number;
    goodRating: boolean;
    notes: string;
}

interface ServiceCreateFormProps {
    onSubmit: (vouchData: VouchData) => void;
}

export const FeedbackForm: React.FC<ServiceCreateFormProps> = ({
    onSubmit,
}) => {
    const { i18n } = useLingui();
    const [isError, setIsError] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    // const user = useSelector(Redux.AuthSelectors.getUser);
    // const [submitVouch] = Redux.useSubmitVouchMutation();

    const [vouchData, setVouchData] = React.useState<VouchData>({
        starRating: 5,
        goodRating: true,
        notes: ""
    });

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVouchData({ ...vouchData, starRating: parseInt(event.target.value, 10) });
    };

    const handleThumbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVouchData({ ...vouchData, goodRating: Boolean(event.target.value) });
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVouchData({ ...vouchData, notes: event.target.value });
    };

    return (
        <React.Fragment>
            <Grid container spacing={1} mt={2} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                <Grid xs={12} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                    <Card sx={{ maxWidth: 50 }}>
                        <Logo />
                    </Card>
                </Grid>
                <Grid xs={9} mt={2} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container spacing={2} m={2} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <Grid xs={12} >
                                    <Card elevation={2} sx={{ m: 3, backgroundColor: 'grey' }}>
                                        <Grid container display={'flex'} >
                                            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography variant='h6' m={1}>
                                                {t(i18n)`We value your feedback.`}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography variant='subtitle1' m={1}>
                                                {t(i18n)`Please complete the following form and help us improve our quality of service.`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                    <Typography variant='h6'>
                                    {t(i18n)`Please rate the product/service.`}
                                    </Typography>
                                    <StarRatingInput value={vouchData.starRating} onChange={handleRatingChange} />
                                </Grid>
                                <Grid xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                    <Typography variant='h6' pt={1}>
                                    {t(i18n)`Is this a positive or negative review?`}
                                    </Typography>
                                    <PosNegRatingInput value={vouchData.goodRating} onChange={handleThumbChange} />
                                </Grid>
                                <Grid xs={12} m={3} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                    <TextField
                                        id="outlined-textarea"
                                        label={t(i18n)`Any comments?`}
                                        placeholder="Notes"
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
