import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';

interface ServiceOfferProps {
    service: string;
    buyer: string;
    score: number;
}

export const ServiceOffer: React.FC<ServiceOfferProps> = ({
    service,
    buyer,
    score,
}) => {
    if (service && buyer) {
        return (
            <Card sx={{ p: 2, mt: 2, display: 'flex' }}>
                <Box flex='1'>
                    <Box
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant='subtitle1' fontWeight='bold'>
                            User with a rating of {score} would like to purchase {service}.
                        </Typography>
                        <Button
                            color='success'
                            variant='outlined'
                            startIcon={<ThumbUpOutlinedIcon />}
                            sx={{ ml: 1 }}
                        >
                        </Button>
                        <Button
                            color='error'
                            variant='outlined'
                            startIcon={<ThumbDownOutlinedIcon />}
                            sx={{ ml: 1 }}
                        >
                        </Button>
                    </Box>
                </Box>
            </Card>
        );
    }
};
