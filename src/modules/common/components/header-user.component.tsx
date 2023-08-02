import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useAuth } from '../providers';
import { useNavigate } from 'react-router-dom';

export const HeaderUser: React.FC = (

) => {
    const navigate = useNavigate();
    const { i18n } = useLingui();

    const { user, login } = useAuth();
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
}
