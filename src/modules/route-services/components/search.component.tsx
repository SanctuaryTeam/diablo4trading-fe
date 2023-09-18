import { Redux } from '@modules/redux';
import { styled } from '@mui/material/styles';
import React from 'react';
import 'react-virtualized/styles.css';
import { ServiceSelectors } from '@modules/redux/slices';
import { API } from '@sanctuaryteam/shared';
import { useSelector } from 'react-redux';
import { ServiceListing } from '.';

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
    Redux.useServiceSearchQuery(params);
    const listings = useSelector(ServiceSelectors.getListings);

    return (
        <Root>
            {listings.map(listing => (
                <ServiceListing
                    key={listing?.id}
                    realmType={listing?.realmType}
                    battleNetTag={listing?.user?.battleNetTag}
                    userId={listing?.userId}
                    id={listing?.id}
                    lastUpdated={new Date(listing?.updatedAt).toLocaleString()}
                    title={listing?.title}
                    content={listing?.content}
                    tags={API.numberToTags(listing?.tags)}
                />
            ))}
        </Root>
    );
};
