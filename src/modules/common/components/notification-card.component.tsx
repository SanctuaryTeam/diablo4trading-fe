import { useEditSlotStateMutation } from '@modules/redux/slices';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { Common } from '..';
import { VouchForm } from './vouch-form.component';

interface NotificationCardProps {
    recipient: API.UserDto;
    entity: API.ServiceSlotDto | API.UserVouchDto; // | API.ItemListingBidDto ? (when we start refactoring to include trades)
    message: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
    recipient,
    entity,
    message,
}) => {
    const [editSlotState] = useEditSlotStateMutation();
    const handleEdit = (newState: API.ServiceSlotStates) => editSlotState({ id: entity.id, state: newState });
    const handleOpenVouch = () => setOpenVouch(true);
    const handleCloseVouch = () => setOpenVouch(false);

    const [yes, setYes] = React.useState<API.ServiceSlotStates | null>(null);
    const [yesText, setYesText] = React.useState<string | null>('Yes');
    const [no, setNo] = React.useState<API.ServiceSlotStates | null>(null);
    const [noText, setNoText] = React.useState<string | null>('No');
    const [openVouch, setOpenVouch] = React.useState(false);
    const userVouch = entity as API.UserVouchDto;
    const [recip, setRecip] = React.useState<API.UserDto>(userVouch.recipient ? userVouch.recipient : userVouch.author);
    const [description, setDescription] = React.useState<string>('');

    // Define a type guard function to check if an object is of type ServiceSlotDto
    function isServiceDto(obj: any): obj is API.ServiceDto {
        return obj && obj.tags;
    }
    // Define a type guard function to check if an object is of type ServiceSlotDto
    function isServiceSlotDto(obj: any): obj is API.ServiceSlotDto {
        return obj && obj.client;
    }
    // Define a type guard function to check if an object is of type ServiceSlotDto
    function isUserVouchDto(obj: any): obj is API.UserVouchDto {
        return obj && obj.recipient;
    }

    React.useEffect(() => {
        switch (entity != undefined) {
            case isServiceSlotDto(entity):
                break;

            default:
                break;
        }
        if (isServiceSlotDto(entity)) {
            if (recipient.id === entity?.serviceOwnerUserId) {
                setRecip(entity.client);
            } else if (recipient.id === entity.clientUserId) {
                setRecip(entity.serviceOwner);
            }

            switch (entity.state) {
                case API.ServiceSlotStates.Accepted:
                    setYes(API.ServiceSlotStates.Ended);
                    setYesText('End');
                    setNoText(null);
                    setNo(null);
                    break;
                case API.ServiceSlotStates.Rejected:
                    setYesText(null);
                    setNoText(null);
                    setYes(null);
                    setNo(null);
                    break;
                default:
                    API.ServiceSlotStates.Pending;
                    setYes(API.ServiceSlotStates.Accepted);
                    setYesText('Accept');
                    setNo(API.ServiceSlotStates.Rejected);
                    setNoText('Reject');
                    break;
            }
        } else if (isUserVouchDto(entity)) {
            if (isServiceDto(entity.reference)) {
                if (recipient.id === entity.authorId) {
                    setDescription('Please rate the client.');
                } else {
                    setDescription('Please rate the service.');
                }
                setYesText('Vouch');
                setNoText(null);
                setYes(null);
                setNo(null);
            }
        }
    });

    if (!recipient || !message || !entity || entity.state == API.ServiceSlotStates.Rejected) {
        return null;
    }

    return (
        <Card sx={{ p: 2, mt: 2, display: 'flex' }} elevation={3}>
            <Box flex='1'>
                {isUserVouchDto(entity) && (
                    <Dialog open={openVouch} onClose={handleCloseVouch} maxWidth={'md'}>
                        <DialogContent>
                            <VouchForm
                                vouch={entity}
                                entity={entity.reference}
                                recipient={recip}
                                description={description}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseVouch}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                )}
                <Box
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={1}>
                        {isUserVouchDto(entity)
                            ? (
                                <Grid item xs={12}>
                                    <Typography variant='h5' fontWeight='bold'>
                                        {entity.reference?.title}
                                    </Typography>
                                </Grid>
                            )
                            : (
                                <Grid item xs={12}>
                                    <Typography variant='h5' fontWeight='bold'>
                                        {entity.service?.title}
                                    </Typography>
                                </Grid>
                            )}
                        <Grid item xs={12} sx={{ wordBreak: 'break-word' }}>
                            <Common.UserRating
                                user={recip.battleNetTag}
                                rating={recip.vouchRating}
                                score={recip.vouchScore}
                            />
                            <Typography
                                variant='subtitle2'
                                fontWeight='bold'
                                sx={{ wordWrap: 'break-word', display: 'inline-block', whiteSpace: 'pre-line' }}
                            >
                                {message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='flex-end'>
                            {yes
                                && (
                                    <Button
                                        color='success'
                                        variant='outlined'
                                        onClick={() => handleEdit(yes)}
                                        sx={{ ml: 1 }}
                                    >
                                        {yesText}
                                    </Button>
                                )}
                            {isUserVouchDto(entity)
                                && (
                                    <Button
                                        color='success'
                                        variant='outlined'
                                        onClick={handleOpenVouch}
                                        sx={{ ml: 1 }}
                                    >
                                        {yesText}
                                    </Button>
                                )}
                            {no
                                && (
                                    <Button
                                        color='error'
                                        variant='outlined'
                                        onClick={() => handleEdit(no)}
                                        sx={{ ml: 1 }}
                                    >
                                        {noText}
                                    </Button>
                                )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Card>
    );
};
