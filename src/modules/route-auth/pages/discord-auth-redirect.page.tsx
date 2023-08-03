import { API_ENDPOINT } from '@config';
import React, { useEffect } from 'react';

// TODO: we should probably explain that the users needs to have battlenet linked to his discord account before redirecting
export const DiscordAuthRedirectPage: React.FC = () => {
    useEffect(() => {
        const redirectUrl = new URL('/auth/discord', API_ENDPOINT);
        window.location.replace(redirectUrl);
    }, []);
    return null;
};
