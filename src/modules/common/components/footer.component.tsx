import { ReactComponent as DiscordIcon } from '@assets/discord.svg';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import RedditIcon from '@mui/icons-material/Reddit';
import { Link as MuiLink, Stack, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { APP_NAME } from '../constants';

const Link = styled(MuiLink)(() => ({
    display: 'inline-flex',
}));

const Root = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    textAlign: 'center',
    padding: theme.spacing(2, 0),
}));

export const FOOTER_HEIGHT = 136;

export const Footer: React.FC = () => {
    const navigate = useNavigate();

    const { i18n } = useLingui();

    const year = new Date().getFullYear();

    const handleInternalLinkClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
    ) => {
        event.preventDefault();
        const url = new URL(event.currentTarget.href);
        navigate(url.pathname);
    };

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
            </Stack>
            <Stack
                mt={1}
                direction='row'
                justifyContent='center'
                spacing={1}
            >
                <Link
                    href={useResolvedPath("cookies").pathname}
                    color='text.secondary'
                    onClick={handleInternalLinkClick}
                >
                    {t(i18n)`Cookies`}
                </Link>
                <Link
                    href={useResolvedPath("contact").pathname}
                    color='text.secondary'
                    onClick={handleInternalLinkClick}
                >
                    {t(i18n)`Contact`}
                </Link>
                <Link
                    href={useResolvedPath("privacy").pathname}
                    color='text.secondary'
                    onClick={handleInternalLinkClick}
                >
                    {t(i18n)`Privacy`}
                </Link>
            </Stack>
        </Root>
    );
};
