import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useAssets, useRouteServerType } from '../providers';
import { alpha } from "@mui/material";
import { useLocation } from 'react-router-dom';

const ServerTypeIcon = styled('img')(() => ({
    width: 20,
    height: 20,
}));

export const HeaderServerType: React.FC = () => {
    const location = useLocation();
    const { i18n } = useLingui();
    const { language, translations } = useAssets();

    const [serverType, setServerType] = useRouteServerType();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(undefined);
    }

    const handleServerTypeChange = (serverType: Game.ServerType) => {
        setServerType(serverType, location);
        setAnchorEl(undefined);
    }

    return (
        <React.Fragment>
            <Button
                startIcon={<ServerTypeIcon
                    src={Common.GAME_SERVER_TYPE_ICONS[serverType]}
                    alt={t(i18n)`${Game.getServerTypeText(serverType, language, translations)}'s icon`}
                />}
                sx={{
                    color: (theme) => theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.08)
                    },
                  }}
                onClick={handleClick}
            >
                {Game.getServerTypeText(serverType, language, translations)}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={[{
                    '& .MuiList-root': {
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                    }
                }]}
            >
                {Object.values(Game.ServerType).map((_serverType) => (
                    <MenuItem
                        key={_serverType}
                        onClick={() => handleServerTypeChange(_serverType)}
                        
                    >
                        <ServerTypeIcon
                            src={Common.GAME_SERVER_TYPE_ICONS[_serverType]}
                            alt={t(i18n)`${Game.getServerTypeText(_serverType, language, translations)}'s icon`}
                        />
                        <Typography sx={{ ml: 1 }}>
                            {Game.getServerTypeText(_serverType, language, translations)}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}
