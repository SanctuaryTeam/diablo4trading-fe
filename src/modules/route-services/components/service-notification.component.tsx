import { useEditSlotStateMutation } from '@modules/redux/slices';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';

interface ServiceNotificationProps {
    slot: API.ServiceSlot;
    service: API.ServiceListing;
    buyer: string;
    score: number;
}

export const ServiceNotification: React.FC<ServiceNotificationProps> = ({
    slot,
    service,
    buyer,
    score,
}) => {
    const [editSlotState] = useEditSlotStateMutation();
    const handleEdit = (newState: API.ServiceSlotStates) => editSlotState({ id: slot.id, state: newState });

    const [notification, setNotification] = React.useState<string | null>(null);
    const [yes, setYes] = React.useState<API.ServiceSlotStates | null>(null);
    const [no, setNo] = React.useState<API.ServiceSlotStates | null>(null);

    React.useEffect(() => {
        switch (slot.state) {
            case API.ServiceSlotStates.Pending:
                setNotification(`User with a score of (${score}) would like to purchase your service.`);
                setYes(API.ServiceSlotStates.Accepted);
                setNo(API.ServiceSlotStates.Rejected);
                break;
            case API.ServiceSlotStates.Accepted:
                setNotification(`Has the service ended?`);
                setYes(API.ServiceSlotStates.Ended);
                setNo(null);
                break;
            case API.ServiceSlotStates.Rejected:
                setNotification(null);
                setYes(null);
                setNo(null);
                break;
            case API.ServiceSlotStates.Ended:
                setNotification(`Please rate the service with a vouch.`);
                setYes(null);
                setNo(null);
                break;

            default:
                API.ServiceSlotStates.Pending;
                setNotification(`User with a score of (${score}) would like to purchase ${service.title}.`);
                setYes(API.ServiceSlotStates.Accepted);
                setNo(API.ServiceSlotStates.Rejected);
                break;
        }
    });

    if (!service || !buyer || !slot || slot.state == API.ServiceSlotStates.Rejected) {
        return null;
    }

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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h5' fontWeight='bold'>
                                {service.title}
                            </Typography>
                            <Typography variant='subtitle1' fontWeight='bold'>
                                {notification}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='flex-end'>
                            {yes
                                ? (
                                    <Button
                                        color='success'
                                        variant='outlined'
                                        startIcon={<ThumbUpOutlinedIcon />}
                                        onClick={() => handleEdit(yes)}
                                        sx={{ ml: 1 }}
                                    >
                                    </Button>
                                )
                                : <></>}
                            {no
                                ? (
                                    <Button
                                        color='error'
                                        variant='outlined'
                                        startIcon={<ThumbDownOutlinedIcon />}
                                        onClick={() => handleEdit(no)}
                                        sx={{ ml: 1 }}
                                    >
                                    </Button>
                                )
                                : <></>}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Card>
    );
};
