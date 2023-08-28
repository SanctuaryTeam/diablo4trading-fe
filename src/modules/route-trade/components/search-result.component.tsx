import { Game } from '@diablosnaps/common';
import { Common } from '@modules/common';
import { Card } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { API } from '@sanctuaryteam/shared';
import React from 'react';

const Root = styled('div')(({ theme }) => ({
    paddingBottom: theme.spacing(2),
}));

interface SearchResultProps {
    item: Game.Item;
    listing: API.TradeListing;
    even: boolean;
}

export const SearchResult: React.FC<SearchResultProps> = ({
    item,
    even,
}) => {
    return (
        <Root>
            <Card
                sx={{
                    p: 2,
                    backgroundImage: theme =>
                        even
                            ? `linear-gradient(
                                ${alpha(theme.palette.common.white, 0.02)}, ${alpha(theme.palette.common.white, 0.02)}
                              )`
                            : undefined,
                }}
            >
                <Common.ItemTooltip item={item} />
            </Card>
        </Root>
    );
};
