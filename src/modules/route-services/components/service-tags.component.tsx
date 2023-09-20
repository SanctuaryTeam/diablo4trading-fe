import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Divider, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';

interface ServiceTagsProps {
    selectedTags: number[];
    onSelectTags: (newTags: number[]) => void;
}

export const ServiceTags: React.FC<ServiceTagsProps> = ({ selectedTags, onSelectTags }) => {
    const { i18n } = useLingui();
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <React.Fragment>
            <ToggleButtonGroup
                value={selectedTags}
                onChange={(_, newTags: number[]) => onSelectTags(newTags)}
                aria-label={t(i18n)`Service Types`}
                orientation={`${matches ? `horizontal` : `vertical`}`}
            >
                <ToggleButton value={API.TAGS.POWERLEVELING}>{t(i18n)`Powerleveling`}</ToggleButton>
                <ToggleButton value={API.TAGS.BOSS_HELP}>{t(i18n)`Boss Help`}</ToggleButton>
                <ToggleButton value={API.TAGS.UBER_LILITH}>{t(i18n)`Uber Lilith`}</ToggleButton>
                <ToggleButton value={API.TAGS.CAPSTONE_BOOST}>{t(i18n)`Capstone Boost`}</ToggleButton>
                <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />
                <ToggleButton value={API.TAGS.EUROPE}>{t(i18n)`Europe`}</ToggleButton>
                <ToggleButton value={API.TAGS.ASIA}>{t(i18n)`Asia`}</ToggleButton>
                <ToggleButton value={API.TAGS.AMERICA}>{t(i18n)`America`}</ToggleButton>
            </ToggleButtonGroup>
        </React.Fragment>
    );
};
