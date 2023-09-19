import { AuthSelectors, useServiceSearchQuery } from '@modules/redux/slices';
import { ServiceSelectors } from '@modules/redux/slices';
import { Grid } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { ServiceListing } from '../components';

export const ServiceListings: React.FC = () => {
    const serviceGetSearchQuery: API.ServiceGetSearchQuery = {
        userId: useSelector(AuthSelectors.getUserId),
        deleted: false,
        limit: 3,
    };

    useServiceSearchQuery({
        params: serviceGetSearchQuery,
        isUserSearch: true,
    });
    const listings = useSelector(ServiceSelectors.getUserListings);

    return (
        <Grid item xs={12} md={12} sx={{}}>
            {listings
                ? listings.map(listing => (
                    <ServiceListing
                        key={listing?.id}
                        realmType={listing?.realmType}
                        battleNetTag={listing?.user?.battleNetTag}
                        vouchRating={listing?.user?.vouchRating}
                        vouchScore={listing?.user?.vouchScore}
                        userId={listing?.userId}
                        id={listing?.id}
                        lastUpdated={new Date(listing?.updatedAt).toLocaleString()}
                        title={listing?.title}
                        content={listing?.content}
                        tags={API.numberToTags(listing?.tags)}
                    />
                ))
                : <></>}
        </Grid>
    );
};
