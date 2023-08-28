import React from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Box, Checkbox } from '@mui/material';

interface PosNegRatingInputProps {
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export const PosNegRatingInput: React.FC<PosNegRatingInputProps> = ({ onChange, value }) => {
    const handleThumbsUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e); // Toggle the boolean value
      };

  return (
    <Box>
        <Checkbox color='success' onChange={handleThumbsUpChange} checked={value} icon={<ThumbUpAltOutlinedIcon />} checkedIcon={<ThumbUpAltOutlinedIcon />} />
        <Checkbox onChange={handleThumbsUpChange} checked={!value} icon={<ThumbDownAltOutlinedIcon />} checkedIcon={<ThumbDownAltOutlinedIcon />}
        />
    </Box>
  );
};