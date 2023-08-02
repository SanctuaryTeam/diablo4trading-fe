// src/components/DiscordAuthRedirect.tsx
import React, { useEffect } from 'react';
import { discordAuthRedirectUrl } from '../../store/api.service';

const DiscordAuthRedirect: React.FC = () => {
    useEffect(() => {
        window.location.replace(discordAuthRedirectUrl);
    });

    return <></>;
};

export default DiscordAuthRedirect;
