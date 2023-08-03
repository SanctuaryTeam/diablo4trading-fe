import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Typography } from '@mui/material';

interface UserRatingProps {
    rating: number;
    score: number;
}

// there is also https://mui.com/material-ui/react-rating/
export const UserRating: React.FC<UserRatingProps> = ({ rating, score }) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
    const emptyStars = Math.max(0, 5 - Math.ceil(rating / 2));

    return (
        <Box sx={{ display: 'flex' }}>
            {Array.from({ length: fullStars }).map((_, index) => (
                <StarIcon
                    fontSize='small'
                    color='secondary'
                    key={index}
                />
            ))}
            {hasHalfStar && (
                <StarHalfIcon
                    fontSize='small'
                    color='secondary'
                />
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <StarOutlineIcon
                    fontSize='small'
                    color='secondary'
                    key={index}
                />
            ))}
            <Typography>({score})</Typography>
        </Box>
    );
};
