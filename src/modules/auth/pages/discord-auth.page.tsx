import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Redux } from '@modules/redux';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const DiscordAuthPage: React.FC = (

) => {
    const { i18n } = useLingui();
    const navigate = useNavigate();

    const [params] = useSearchParams({
        code: ''
    });
    const code = params.get('code');

    const { isFetching, isError, isSuccess } = Redux.useAuthDiscordCallbackQuery(code);

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
        if (isError) {
            const timeout = window.setTimeout(() => {
                navigate('/');
            }, 1000 * 5)
            return () => {
                window.clearTimeout(timeout);
            }
        }
    }, [isSuccess, isError, navigate])

    if (isFetching) {
        return (
            <Common.FloatingPanel>
                <Common.Spinner />
            </Common.FloatingPanel>
        )
    }

    if (isError) {
        return (
            <Common.FloatingPanel>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h4' component='h1'>
                        {t(i18n)`Something went wrong.`}
                    </Typography>
                    <Typography variant='subtitle1'>
                        {t(i18n)`Redirecting to home page...`}
                    </Typography>
                </Box>
            </Common.FloatingPanel>
        )
    }

    return null;
};
