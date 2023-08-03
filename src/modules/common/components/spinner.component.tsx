import { styled } from '@mui/material/styles';
import { GAME_SPINNER_ICON } from '../constants';

const Circle = styled('img')(() => ({
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
}));

interface SpinnerProps {
    size?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 16 }) => {
    return (
        <Circle
            src={GAME_SPINNER_ICON}
            sx={(theme) => ({
                width: theme.spacing(size),
                height: theme.spacing(size),
            })}
        />
    );
};
