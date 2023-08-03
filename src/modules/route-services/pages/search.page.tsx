import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Box, Card, Divider, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import SearchResult from "../components/search-result.component";

const TAGS = {
    POWERLEVELING: 1 << 0,
    BOSS_HELP: 1 << 1,
    UBER_LILITH: 1 << 2,
    CAPSTONE_BOOST: 1 << 3,
    EUROPE: 1 << 4,
    ASIA: 1 << 5,
    AMERICA: 1 << 6,
};

export const SearchPage: React.FC = (

) => {
    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);

    const handleTagSelection = (_, newTags: number[]) => {
        setSelectedTags((tags) => newTags);
    };

    const tagsToNumber = React.useMemo(() => selectedTags.reduce((previousValue: number, currentValue: number) => previousValue | currentValue, 0), [selectedTags]);

    const { i18n } = useLingui();

    return (
        <React.Fragment>
            <Card sx={{ p: 2, pt: 0 }}>
                <Box pt={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' color='text.secondary'>
                                {t(i18n)`Services`}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <ToggleButtonGroup
                                value={selectedTags}
                                onChange={handleTagSelection}
                                aria-label={t(i18n)`Service Types`}
                            >
                                <ToggleButton value={TAGS.POWERLEVELING}>{t(i18n)`Powerleveling`}</ToggleButton>
                                <ToggleButton value={TAGS.BOSS_HELP}>{t(i18n)`Boss Help`}</ToggleButton>
                                <ToggleButton value={TAGS.UBER_LILITH}>{t(i18n)`Uber Lilith`}</ToggleButton>
                                <ToggleButton value={TAGS.CAPSTONE_BOOST}>{t(i18n)`Capstone Boost`}</ToggleButton>
                                <ToggleButton value={TAGS.EUROPE}>{t(i18n)`Europe`}</ToggleButton>
                                <ToggleButton value={TAGS.ASIA}>{t(i18n)`Asia`}</ToggleButton>
                                <ToggleButton value={TAGS.AMERICA}>{t(i18n)`America`}</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
            <SearchResult user={"JohnDoe#1234"} lastUpdated={"Today at 10:30 am"} title="⭐WTS⭐T100NM /⭐10mil/5runs ⭐Glyph XP⭐Full Clear-Can Loot⭐" content="-Highest Tier NM drop highest quality item with chance Uber Uber Unique, more glyph exp
-Kill everything easy for you to follow and loot. Sell when full
-Cool Lvling with T100, sure you will find upgrade after runs
-Drop your btag and chill with me "></SearchResult>
        </React.Fragment>
    );
}
