import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Grid, Typography } from '@mui/material';

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
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
    const emptyStars = Math.max(0, 5 - Math.ceil(rating / 2));

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
                                        {Array.from({ length: fullStars }).map((_, index) => (
                                            <StarIcon fontSize='small' color='secondary' key={index} />
                                        ))}
                                        {hasHalfStar && <StarHalfIcon fontSize='small' color='secondary' />}
                                        {Array.from({ length: emptyStars }).map((_, index) => (
                                            <StarOutlineIcon fontSize='small' color='secondary' key={index} />
                                        ))}
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
