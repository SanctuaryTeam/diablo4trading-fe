import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

const toString = (value: number) => (value === undefined ? '' : value.toString());

interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    label?: string;
    helperText?: string;
    min?: number;
    max?: number;
    required?: boolean;
    disabled?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
    value,
    onChange,
    label,
    helperText,
    min,
    max,
    required,
    disabled,
}) => {
    const [textValue, setTextValue] = React.useState<string>(toString(value));
    useEffect(() => {
        setTextValue(toString(value));
    }, [value]);

    const setValue = (next: number) => {
        if (next === value) {
            setTextValue(toString(value));
            return;
        }
        onChange(next);
    };

    return (
        <TextField
            value={textValue}
            label={label}
            helperText={helperText}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={() => {
                const numericValue = parseInt(textValue);
                if (isNaN(numericValue)) {
                    setValue(undefined);
                    return;
                }
                if (min !== undefined && numericValue < min) {
                    setValue(min);
                    return;
                }
                if (max !== undefined && numericValue > max) {
                    setValue(max);
                    return;
                }
                setValue(numericValue);
            }}
            required={required}
            disabled={disabled}
        />
    );
};
