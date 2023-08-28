import { Grid } from '@mui/material';
import React from 'react';
import { API } from '@sanctuaryteam/shared'
import { useRouteServerType } from '@modules/common/providers';
import { AuthSelectors, useServiceSearchQuery } from '@modules/redux/slices';
import { ServiceSelectors } from '@modules/redux/slices';
import { useSelector } from 'react-redux';
import { ServiceListing } from '../components';

export const ServiceListings: React.FC = () => {
    const [serverType] = useRouteServerType();
    const userId = useSelector(AuthSelectors.getUser) ?? null;

    const serviceGetSearchQuery: API.ServiceGetSearchQuery = {
        serverType,
        userId: parseInt(userId?.id) ?? null,
        deleted: false,
        limit: 3,
    };

    useServiceSearchQuery(serviceGetSearchQuery);
    const listings = useSelector(ServiceSelectors.getUserListings);

    return (
        <Grid item xs={12} md={12} sx={{}}>
            {listings
                ? listings.map(listing => (
                    <ServiceListing
                        key={listing?.id}
                        user={listing?.user.battleNetTag}
                        id={listing?.id}
                        // lastUpdated={'Today at 9:21 pm'}
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
