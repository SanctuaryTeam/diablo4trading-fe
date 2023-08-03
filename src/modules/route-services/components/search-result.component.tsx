import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import TollIcon from '@mui/icons-material/Toll';
import { Avatar, Box, Button, Card, Collapse, Divider, Typography } from '@mui/material';
import React from 'react';

interface SearchResultProps {
    user: string;
    lastUpdated: string;
    title: string;
    content: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ user, lastUpdated, title, content }) => {
    const { i18n } = useLingui();
    const [visible, setVisible] = React.useState<boolean>(false);

    return (
        <Card
            sx={{
                p: 2,
                mt: 2,
                display: 'flex',
            }}
        >
            <Box flex='1'>
                <Box
                    onClick={() => setVisible(!visible)}
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant='h6'
                        fontWeight='bold'
                    >
                        {title}
                    </Typography>
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={() => setVisible(!visible)}
                        endIcon={visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    >
                        {visible ? t(i18n)`Collapse` : t(i18n)`Expand`}
                    </Button>
                </Box>
                <Collapse in={visible}>
                    <Typography
                        variant='body1'
                        sx={{ mt: 1 }}
                        component='pre'
                    >
                        {content}
                    </Typography>
                </Collapse>
                <Divider sx={{ mt: 2 }} />
                <Box
                    sx={{
                        display: 'flex',
                        mt: 2,
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                    src='https://placekitten.com/40/40'
                                    sx={{ mr: 1 }}
                                />
                                <Box>
                                    <Typography
                                        variant='subtitle1'
                                        fontWeight='bold'
                                    >
                                        {user}
                                    </Typography>
                                    <Common.UserRating
                                        rating={6}
                                        score={456}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Button
                            color='success'
                            variant='outlined'
                            startIcon={<TollIcon />}
                            sx={{ ml: 1 }}
                        >
                            {t(i18n)`Buy Service`}
                        </Button>
                        <Button
                            color='info'
                            variant='outlined'
                            startIcon={<ArrowCircleUpIcon />}
                            sx={{ ml: 1 }}
                        >
                            {t(i18n)`Bump`}
                        </Button>
                        <Button
                            color='error'
                            variant='outlined'
                            startIcon={<ReportGmailerrorredIcon />}
                            sx={{ ml: 1 }}
                        >
                            {t(i18n)`Report`}
                        </Button>
                    </Box>
                    <Box>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                        >
                            {lastUpdated}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default SearchResult;
