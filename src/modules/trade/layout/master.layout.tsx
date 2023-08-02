import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useNavigate, useResolvedPath } from 'react-router';
import { matchPath, useMatches } from 'react-router-dom';
import { useAssets, useServerType } from '../providers';

const ServerTypeIcon = styled('img')(() => ({
    width: 48,
    height: 48,
}));

interface MasterLayoutProps {
    children?: React.ReactNode;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({
    children
}) => {
    const { i18n } = useLingui();
    const { language, translations } = useAssets();

    const [serverType, setServerType] = useServerType();
    const handleServerTypeClick = (offset: number) => {
        const serverTypes = Object.values(Game.ServerType);
        const index = serverTypes.indexOf(serverType);
        const next = serverTypes[(index + offset + serverTypes.length) % serverTypes.length];
        setServerType(next);
    };

    const navigate = useNavigate();

    const matches = useMatches();
    const searchPath = useResolvedPath('./search');
    const listingsPath = useResolvedPath('./listings');

    const paths = [
        searchPath,
        listingsPath
    ];

    const tabValue = Math.max(0, paths.findIndex(p => {
        const match = matchPath({
            path: p.pathname,
            end: false
        }, matches[matches.length - 1].pathname);
        return match !== null;
    }));
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        navigate(paths[newValue]);
    };

    return (
        <>
            <Box
                pt={4}
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Stack direction='row' alignItems='center' gap={1}>
                    <IconButton color='primary' onClick={() => handleServerTypeClick(-1)}>
                        <ArrowBackIosIcon fontSize='large' />
                    </IconButton>
                    <ServerTypeIcon
                        src={Common.GAME_SERVER_TYPE_ICONS[serverType]}
                        alt={t(i18n)`${Game.getServerTypeText(serverType, language, translations)}'s icon`}
                    />
                    <IconButton color='primary' onClick={() => handleServerTypeClick(1)}>
                        <ArrowForwardIosIcon fontSize='large' />
                    </IconButton>
                </Stack>
                <Typography mt={1} variant='h4' component='h1'>
                    {Game.getServerTypeText(serverType, language, translations)}
                </Typography>
            </Box>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
            >
                <Tab label={t(i18n)`Search for items`} />
                <Tab label={t(i18n)`My Listings`} />
            </Tabs>
            <Box pt={1} pb={2}>
                {children}
            </Box>
        </>
    )
}