import React from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { Box, Rating } from '@mui/material';

interface StarRatingInputProps {    
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({ onChange, value }) => {

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <Box>
      <Rating
        name="star-rating"
        value={value}
        precision={0.5}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleRatingChange(event);
        }}
        size="large"
        emptyIcon={<StarOutlineIcon />}
        icon={<StarIcon />}
        readOnly={false}
      />
    </Box>
  );
};