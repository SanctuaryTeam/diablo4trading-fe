import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Rating } from '@mui/material';
import React from 'react';

interface StarRatingInputProps {
    value: number;
    onChange: (newValue: number) => void;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({ onChange, value }) => {
    const handleRatingChange = (newValue: number) => {
        onChange(newValue);
    };

    return (
        <Box>
            <Rating
                name='star-rating'
                value={value}
                precision={0.5}
                onChange={(_event, newValue) => {
                    handleRatingChange(newValue || 0);
                }}
                size='large'
                emptyIcon={<StarOutlineIcon />}
                icon={<StarIcon />}
                readOnly={false}
            />
        </Box>
    );
};
