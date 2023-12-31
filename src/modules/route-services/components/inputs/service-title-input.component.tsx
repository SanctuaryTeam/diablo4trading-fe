import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

interface ServiceTitleProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    helperText?: string;
    disabled?: boolean;
}

export const ServiceTitleInput: React.FC<ServiceTitleProps> = ({
    value,
    onChange,
    label,
    helperText,
    disabled,
}) => {
    const [textValue, setTextValue] = React.useState<string>(value);
    useEffect(() => {
        setTextValue(value);
    }, [value]);

    const setValue = () => {
        onChange(textValue);
    };

    return (
        <TextField
            value={textValue}
            label={label}
            helperText={helperText}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={() => {
                setValue();
            }}
            disabled={disabled}
        />
    );
};
