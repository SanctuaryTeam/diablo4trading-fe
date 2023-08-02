import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDiscordAuthCallbackQuery } from '../../store/api.service';

const DiscordAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code') ?? ''; // Get the 'code' query parameter from the URL
  const discordAuthCallbackQuery = useDiscordAuthCallbackQuery(code);

  useEffect(() => {
    navigate('/');
  }, [discordAuthCallbackQuery])

  return <></>;
};

export default DiscordAuthCallback;
