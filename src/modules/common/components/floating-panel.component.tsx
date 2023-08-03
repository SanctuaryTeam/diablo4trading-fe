import { Box } from '@mui/material';

interface FloatingPanelProps {
    children?: React.ReactNode;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '70%',
                height: 'min-content',
                padding: 2,
            }}
        >
            {children}
        </Box>
    );
};
