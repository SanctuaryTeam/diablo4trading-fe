import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

interface ServiceTitleProps {
    value?: string;
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
    const [textValue, setTextValue] = React.useState<string | undefined>(value);
    useEffect(() => {
        setTextValue(value);
    }, [value]);

    const setValue = () => {
        textValue && onChange(textValue);
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
