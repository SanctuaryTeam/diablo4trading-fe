import { API_ENDPOINT } from '@config';
import React, { useEffect } from 'react';

export const DiscordAuthRedirectPage: React.FC = () => {
    useEffect(() => {
        const redirectUrl = new URL('/auth/discord', API_ENDPOINT)
        window.location.replace(redirectUrl);
    }, []);
    return null;
};
