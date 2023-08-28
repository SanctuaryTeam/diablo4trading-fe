import logo from '@assets/logo.webp';
import { Grid, styled } from '@mui/material';
import React from 'react';
import { FeedbackForm } from '../components'

const Logo = styled('img')(() => ({
    width: 50,
    height: 'auto',
}));
Logo.defaultProps = {
    src: logo,
};

export const VouchPage: React.FC = () => {

    return (
        <React.Fragment>
            <Grid container display={'flex'} justifyContent={'center'} alignContent={'center'}>
                <Grid item xs={12} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                    <FeedbackForm onSubmit={null} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
