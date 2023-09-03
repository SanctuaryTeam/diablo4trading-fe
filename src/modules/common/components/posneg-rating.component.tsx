import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Box, Checkbox } from '@mui/material';
import React from 'react';

interface PosNegRatingInputProps {
    value: boolean;
    onChange: (newValue: boolean) => void;
}

export const PosNegRatingInput: React.FC<PosNegRatingInputProps> = ({ onChange, value }) => {
    const handleThumbsUpChange = () => {
        onChange(!value);
    };

    return (
        <Box>
            <Checkbox
                color='success'
                onChange={handleThumbsUpChange}
                checked={value}
                icon={<ThumbUpAltOutlinedIcon />}
                checkedIcon={<ThumbUpAltOutlinedIcon />}
            />
            <Checkbox
                onChange={handleThumbsUpChange}
                checked={!value}
                icon={<ThumbDownAltOutlinedIcon />}
                checkedIcon={<ThumbDownAltOutlinedIcon />}
            />
        </Box>
    );
};
