import { ReactComponent as DiscordIcon } from '@assets/discord.svg';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import RedditIcon from '@mui/icons-material/Reddit';
import { Link as MuiLink, Stack, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useResolvedPath } from 'react-router-dom';
import { APP_NAME } from '../constants';

const Link = styled(MuiLink)(() => ({
    display: 'inline-flex',
})) as typeof MuiLink;

const Root = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    textAlign: 'center',
    padding: theme.spacing(2, 0),
}));

export const FOOTER_HEIGHT = 136;

export const Footer: React.FC = () => {
    const { i18n } = useLingui();

    const year = new Date().getFullYear();

    return (
        <Root>
            <Typography variant='body2' fontFamily='monospace'>
                {t(i18n)`This app isn't affiliated with or endorsed by Activision Blizzard in any way.`}
            </Typography>
            <Typography variant='body2' fontFamily='monospace'>
                {t(i18n)`© ${APP_NAME} ${year}. All rights reserved.`}
            </Typography>
            <Stack
                mt={1}
                direction='row'
                justifyContent='center'
                spacing={1}
            >
                <Link target='_blank' href='https://www.reddit.com/r/Diablo4'>
                    <RedditIcon />
                </Link>
                <Link target='_blank' href='https://discord.gg/Diablo4'>
                    <SvgIcon component={DiscordIcon} />
                </Link>
                <Link target='_blank' href='https://github.com/SanctuaryTeam/'>
                    <GitHubIcon />
                </Link>
            </Stack>
            <Stack
                mt={1}
                direction='row'
                justifyContent='center'
                spacing={1}
            >
                <Link
                    component={RouterLink}
                    to={useResolvedPath('./pages/cookies')}
                    color='text.secondary'
                >
                    {t(i18n)`Cookies`}
                </Link>
                <Link
                    component={RouterLink}
                    to={useResolvedPath('./pages/contact')}
                    color='text.secondary'
                >
                    {t(i18n)`Contact`}
                </Link>
                <Link
                    component={RouterLink}
                    to={useResolvedPath('./pages/privacy')}
                    color='text.secondary'
                >
                    {t(i18n)`Privacy`}
                </Link>
            </Stack>
        </Root>
    );
};
