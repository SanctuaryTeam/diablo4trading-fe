import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useAssets, useRouteServerType } from '../providers';

const ServerTypeIcon = styled('img')(() => ({
    width: 48,
    height: 48,
}));

export const ServerTypeSelect: React.FC = () => {
    const { i18n } = useLingui();
    const { language, translations } = useAssets();

    const [serverType, setServerType] = useRouteServerType();
    const handleServerTypeClick = (offset: number) => {
        const serverTypes = Object.values(Game.ServerType);
        const index = serverTypes.indexOf(serverType);
        const next = serverTypes[(index + offset + serverTypes.length) % serverTypes.length];
        setServerType(next);
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
        >
            <Stack
                direction='row'
                alignItems='center'
                gap={1}
            >
                <IconButton
                    color='primary'
                    onClick={() => handleServerTypeClick(-1)}
                >
                    <ArrowBackIosIcon fontSize='large' />
                </IconButton>
                <ServerTypeIcon
                    src={Common.GAME_SERVER_TYPE_ICONS[serverType]}
                    alt={t(i18n)`${Game.getServerTypeText(
                        serverType,
                        language,
                        translations
                    )}'s icon`}
                />
                <IconButton
                    color='primary'
                    onClick={() => handleServerTypeClick(1)}
                >
                    <ArrowForwardIosIcon fontSize='large' />
                </IconButton>
            </Stack>
            <Typography
                mt={1}
                variant='h4'
                component='h1'
            >
                {Game.getServerTypeText(serverType, language, translations)}
            </Typography>
        </Box>
    );
};
