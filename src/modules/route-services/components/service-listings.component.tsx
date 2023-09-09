import { useRouteServerType } from '@modules/common/providers';
import { useServiceSearchQuery } from '@modules/redux/slices';
import { ServiceSelectors } from '@modules/redux/slices';
import { Grid } from '@mui/material';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { ServiceListing } from '../components';

interface ServiceListingsProps {
    user: API.AuthUser;
}

export const ServiceListings: React.FC<ServiceListingsProps> = ({ user }) => {
    const serviceGetSearchQuery: API.ServiceGetSearchQuery = {
        userId: user.id,
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
                        battleNetTag={listing?.user?.battleNetTag}
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
