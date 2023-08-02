import { Redux } from '@modules/redux';
import LanguageIcon from '@mui/icons-material/Language';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRouteLanguage } from '../providers';

export const HeaderLanguage: React.FC = (

) => {
    const location = useLocation();
    const [routeLanguage, setRouteLanguage] = useRouteLanguage();

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(undefined);
    }

    const handleLanguageChange = (language: Redux.UserLanguage) => {
        setRouteLanguage(language, location);
        setAnchorEl(undefined);
    };

    return (
        <React.Fragment>
            <Button
                startIcon={<LanguageIcon />}
                color='secondary'
                onClick={handleClick}
            >
                {Redux.getLanguageName(routeLanguage)}
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
                {Object.values(Redux.UserLanguage).map((language) => (
                    <MenuItem
                        key={language}
                        onClick={() => handleLanguageChange(language)}
                        sx={{ color: language === routeLanguage ? 'secondary.main' : undefined }}
                    >
                        {Redux.getLanguageName(language)}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}