import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useCreateServiceMutation } from '@modules/redux/slices';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
    Box,
    Button,
    Card,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { ServerTypeInput } from '../../common/components';
import { useRouteServerType } from '../../common/providers';
import { ServiceTags } from '../components';

interface ServiceCreateFormProps {
    onSubmit: (serviceData: ServiceData) => void;
    onCancel: () => void;
    user: API.AuthUser;
}

interface ServiceData {
    realmType: string;
    title: string;
    content: string;
    userId: number;
    tags: number;
    deleted: boolean;
    maxAcceptedSlots: number;
}

export const ServiceCreate: React.FC<ServiceCreateFormProps> = ({ onSubmit, onCancel, user }) => {
    const [createService] = useCreateServiceMutation();
    const [serverType, setServerType] = useRouteServerType();

    const [serviceData, setServiceData] = React.useState<ServiceData>({
        realmType: serverType,
        title: '',
        content: '',
        userId: parseInt(user.id, 10),
        tags: 0,
        deleted: false,
        maxAcceptedSlots: 3,
    });

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceData({ ...serviceData, title: event.target.value });
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceData({ ...serviceData, content: event.target.value });
    };

    const handleSlotsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceData({ ...serviceData, maxAcceptedSlots: parseInt(event.target.value) });
    };

    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);

    const handleTagsSelection = (newTags: number[]) => {
        setSelectedTags(() => newTags);
        setServiceData({ ...serviceData, tags: newTags.reduce((acc, tag) => acc | tag, 0) });
    };

    const handleSubmit = async (e) => {
        onSubmit(serviceData);
        e.preventDefault();

        try {
            await createService(serviceData);
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };

    const { i18n } = useLingui();
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Card sx={{ p: 2, pt: 0 }}>
            <Box pt={2}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Create New Service`}
                </Typography>
                <Divider />

                <Grid container spacing={1} pt={2} rowSpacing={2}>
                    <Grid item xs={6} md={9}>
                        <ServiceTags selectedTags={selectedTags} onSelectTags={handleTagsSelection} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ServerTypeInput
                            value={serverType}
                            onChange={setServerType}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='title-text-field'
                            label='Title'
                            variant='outlined'
                            onChange={handleTitleChange}
                        />
                        <FormHelperText sx={{ ml: 0 }}>{t(i18n)`Please include price/rate in Title.`}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='content-text-field'
                            label='Content'
                            variant='outlined'
                            multiline
                            rows={5}
                            onChange={handleContentChange}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <FormControl variant='filled' sx={{ minWidth: 120 }} size='small'>
                            <InputLabel id='slot-select-field-label'>Slots</InputLabel>
                            <Select
                                labelId='slot-select-field-label'
                                id='slot-select-field'
                                label='Slots'
                                onChange={handleSlotsChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                            <FormHelperText sx={{ ml: 0 }}>Number of slots available (max 3).</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} mt={2} display='flex' alignItems='flex-end'>
                        <Button
                            color='success'
                            variant='outlined'
                            startIcon={<PlaylistAddOutlinedIcon />}
                            sx={{ ml: matches ? 10 : -2 }}
                            onClick={handleSubmit}
                        >
                            {t(i18n)`Create`}
                        </Button>
                        <Button
                            color='error'
                            variant='outlined'
                            startIcon={<RestartAltIcon />}
                            sx={{ ml: matches ? 1 : -1, mt: matches ? 0 : 1 }}
                            onClick={onCancel}
                        >
                            {t(i18n)`Clear`}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};
