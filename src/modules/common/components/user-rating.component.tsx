import { Box, Grid, Rating, Typography } from '@mui/material';

interface UserRatingProps {
    user: string;
    rating: number;
    score: number;
}

// there is also https://mui.com/material-ui/react-rating/
export const UserRating: React.FC<UserRatingProps> = ({
    user,
    rating,
    score,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                mt: 2,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box>
                                    <Typography
                                        variant='subtitle1'
                                        fontWeight='bold'
                                    >
                                        {user}
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Rating name='read-only' value={rating / 2} precision={0.5} readOnly />
                                        <Typography>({score})</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
