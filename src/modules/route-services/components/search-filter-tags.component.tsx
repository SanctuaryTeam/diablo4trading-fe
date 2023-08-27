import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { ServiceTags } from './service-tags.component';

interface SearchFilterTagsProps {
    // value: number;
    onChange: (value: number) => void;
    // disabled?: boolean;
}

export const SearchFilterTags: React.FC<SearchFilterTagsProps> = ({
    // value,
    onChange,
    // disabled,
}) => {
    const { i18n } = useLingui();

    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);

    const handleTagsSelection = (newTags: number[]) => {
        setSelectedTags(() => newTags);
        const newNumber = newTags.reduce((acc, tag) => acc | tag, 0);
        onChange(newNumber);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant='subtitle2' color='text.secondary'>
                    {t(i18n)`Service Tags`}
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <ServiceTags selectedTags={selectedTags} onSelectTags={handleTagsSelection} />
            </Grid>
        </Grid>
    );
};
