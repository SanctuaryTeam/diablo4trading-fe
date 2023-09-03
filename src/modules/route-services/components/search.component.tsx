import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Redux } from '@modules/redux';
import { Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import 'react-virtualized/styles.css';
import { ServiceSelectors } from '@modules/redux/slices';
import { API } from '@sanctuaryteam/shared';
import { useSelector } from 'react-redux';
import { SearchResult } from '.';

const Root = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(-0.5),
}));

interface SearchResultsProps {
    params: API.ServiceGetSearchQuery;
}

export const Search: React.FC<SearchResultsProps> = ({
    params,
}) => {
    const { i18n } = useLingui();

    const { isError } = Redux.useServiceSearchQuery(params);
    const listings = useSelector(ServiceSelectors.getListings);

    return (
        <Root>
            {/* TODO: Insert Loading module */}
            {listings.map(listing => (
                <SearchResult
                    key={listing?.id}
                    user={listing?.user?.battleNetTag}
                    id={listing?.id}
                    lastUpdated={new Date(listing?.updatedAt).toLocaleString()}
                    title={listing?.title}
                    content={listing?.content}
                    tags={API.numberToTags(listing?.tags)}
                />
            ))}
            <Snackbar
                open={isError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity='error'>
                    {t(i18n)`Unable to fetch search results.`}
                </Alert>
            </Snackbar>
        </Root>
    );
};
