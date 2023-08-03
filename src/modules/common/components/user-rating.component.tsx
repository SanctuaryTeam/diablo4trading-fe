import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Typography } from '@mui/material';

interface UserRatingProps {
    rating: number;
    score: number;
}

export const UserRating: React.FC<UserRatingProps> = ({rating, score}) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
    const emptyStars = Math.max(0, 5 - Math.ceil(rating / 2));
  
    return (
      <Box sx={{ display: "flex" }}>
        {[...Array(fullStars)].map((_, index) => (
          <StarIcon fontSize="small" color="secondary" key={index} />
        ))}
        {hasHalfStar && <StarHalfIcon fontSize="small" color='secondary' />}
        {[...Array(emptyStars)].map((_, index) => (
          <StarOutlineIcon fontSize="small" color="secondary" key={index} />
        ))}
        <Typography>
            ({score})
        </Typography>
      </Box>
    );
};
