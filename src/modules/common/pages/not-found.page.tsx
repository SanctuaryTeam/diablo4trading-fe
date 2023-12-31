import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Typography } from '@mui/material';
import { FloatingPanel } from '../components';

export const NotFoundPage: React.FC = () => {
    const { i18n } = useLingui();
    return (
        <FloatingPanel>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4' component='h1'>
                    {t(i18n)`Not Found`}
                </Typography>
                <Typography variant='subtitle1'>
                    {t(i18n)`The page you are looking for does not exist.`}
                </Typography>
            </Box>
        </FloatingPanel>
    );
};
