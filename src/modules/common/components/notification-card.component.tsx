import { useEditSlotStateMutation } from '@modules/redux/slices';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { Common } from '..';

interface NotificationCardProps {
    recipient: API.UserDto;
    entity: API.ServiceSlotDto; // || API.TradeBidDto || API.VouchDto ? (when we start refactoring to include trades/vouches)
    message: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
    recipient,
    entity,
    message,
}) => {
    const [editSlotState] = useEditSlotStateMutation();
    const handleEdit = (newState: API.ServiceSlotStates) => editSlotState({ id: entity.id, state: newState });

    const [yes, setYes] = React.useState<API.ServiceSlotStates>(null);
    const [no, setNo] = React.useState<API.ServiceSlotStates>(null);

    React.useEffect(() => {
        switch (entity.state) {
            case API.ServiceSlotStates.Accepted:
                setYes(API.ServiceSlotStates.Ended);
                setNo(null);
                break;
            case API.ServiceSlotStates.Rejected:
                setYes(null);
                setNo(null);
                break;
            case API.ServiceSlotStates.Ended:
                setYes(null);
                setNo(null);
                break;

            default:
                API.ServiceSlotStates.Pending;
                setYes(API.ServiceSlotStates.Accepted);
                setNo(API.ServiceSlotStates.Rejected);
                break;
        }
    });

    if (!recipient || !message || !entity || entity.state == API.ServiceSlotStates.Rejected) {
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
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='h5' fontWeight='bold'>
                                {entity?.service?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Common.UserRating
                                user={entity?.client?.battleNetTag}
                                rating={entity?.client?.vouchRating}
                                score={entity?.client?.vouchScore}
                            />
                            <Typography variant='subtitle1' fontWeight='bold'>
                                {message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='flex-end'>
                            {yes
                                ? (
                                    <Button
                                        color='success'
                                        variant='outlined'
                                        onClick={() => handleEdit(yes)}
                                        sx={{ ml: 1 }}
                                    >
                                        Yes
                                    </Button>
                                )
                                : <></>}
                            {no
                                ? (
                                    <Button
                                        color='error'
                                        variant='outlined'
                                        onClick={() => handleEdit(no)}
                                        sx={{ ml: 1 }}
                                    >
                                        No
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
