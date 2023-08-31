import logo from '@assets/logo.webp';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Container,
    Drawer,
    IconButton,
    Stack,
    Tab as MuiTab,
    Tabs,
    Toolbar,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { matchPath, useMatches, useNavigate, useResolvedPath } from 'react-router-dom';
import { HeaderLanguage, HeaderUser } from '../components';
import { APP_NAME } from '../constants';

const Tab = styled(MuiTab)(({ theme }) => ({
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightMedium,
}));

const Logo = styled('img')(() => ({
    width: 32,
    height: 'auto',
}));
Logo.defaultProps = {
    src: logo,
};

export const HEADER_HEIGHT = 48;

interface HeaderProps {
    hideNavigation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    hideNavigation,
}) => {
    const { i18n } = useLingui();

    const navigate = useNavigate();
    const matches = useMatches();

    // TODO: add routes
    const tradePath = useResolvedPath('trade');
    const servicesPath = useResolvedPath('services');
    const feedbackPath = useResolvedPath('feedback');
    const faqPath = useResolvedPath('./pages/faq');
    const rulesPath = useResolvedPath('./pages/rules');

    const items = [
        { ...tradePath, label: t(i18n)`Trade` },
        { ...servicesPath, label: t(i18n)`Services` },
        { ...feedbackPath, label: t(i18n)`Feedback` },
        { ...faqPath, label: t(i18n)`FAQ` },
    ];

    const handleRootRedirect = () => {
        navigate('/');
    };

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    const tabValue = Math.max(
        0,
        items.findIndex((p) => {
            const match = matchPath(
                {
                    path: p.pathname,
                    end: false,
                },
                matches[matches.length - 1].pathname,
            );
            return match !== null;
        }),
    );

    const handleTabClick = (index: number) => {
        navigate(items[index]);
        setMobileOpen(false);
    };

    return (
        <Box component='header'>
            <AppBar position='sticky' component='nav'>
                <Container maxWidth='xl'>
                    <Toolbar variant='dense' disableGutters>
                        <Stack direction='row' gap={2}>
                            <IconButton
                                edge='start'
                                onClick={handleDrawerToggle}
                                sx={{ display: { md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Box
                                onClick={handleRootRedirect}
                                sx={{
                                    display: { xs: 'none', sm: 'flex' },
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <Logo />
                                <Typography variant='h6' component='div' ml={1}>
                                    {APP_NAME}
                                </Typography>
                            </Box>
                            {!hideNavigation && (
                                <Tabs
                                    value={tabValue}
                                    sx={{ display: { xs: 'none', md: 'flex' } }}
                                >
                                    {items.map((p, i) => (
                                        <Tab
                                            key={p.pathname}
                                            label={p.label}
                                            onClick={() => handleTabClick(i)}
                                        />
                                    ))}
                                </Tabs>
                            )}
                        </Stack>
                        <Box flexGrow={1} />
                        {!hideNavigation && (
                            <Stack direction='row' gap={1}>
                                <HeaderUser />
                                <HeaderLanguage />
                            </Stack>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component='nav'>
                <Drawer
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    variant='temporary'
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 192 },
                    }}
                >
                    <Box
                        onClick={handleRootRedirect}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            p: 2,
                            pb: 1,
                        }}
                    >
                        <Logo />
                        <Typography variant='h6' component='div' ml={1}>
                            {APP_NAME}
                        </Typography>
                    </Box>
                    {!hideNavigation && (
                        <Tabs value={tabValue} orientation='vertical'>
                            {items.map((p, i) => (
                                <Tab
                                    key={p.pathname}
                                    label={p.label}
                                    onClick={() => handleTabClick(i)}
                                />
                            ))}
                        </Tabs>
                    )}
                </Drawer>
            </Box>
        </Box>
    );
};
