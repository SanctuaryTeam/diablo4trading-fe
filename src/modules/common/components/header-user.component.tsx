import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Redux } from '@modules/redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const HeaderUser: React.FC = () => {
    const { i18n } = useLingui();
    const navigate = useNavigate();

    const user = useSelector(Redux.AuthSelectors.getUser) ?? null;
    if (!user) {
        return (
            <Button
                startIcon={<AccountCircleIcon />}
                onClick={() => navigate('/auth/discord')}
            >
                {t(i18n)`Login`}
            </Button>
        );
    }

    const handleUserRedirect = () => {
        // todo: show profile dialog
    };

    return (
        <Button
            startIcon={<AccountCircleIcon />}
            onClick={handleUserRedirect}
        >
            {user.battleNetTag}
        </Button>
    );
};
