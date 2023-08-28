import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { Search, SearchFilter } from '../components';

export const SearchPage: React.FC = () => {
    const [params, setParams] = React.useState<API.ServiceGetSearchQuery>(null);

    return (
        <React.Fragment>
            <SearchFilter // TODO: Implement this mostly working setup for using shared interfaces.
                onSearch={setParams}
            />
            {params ? <Search params={params} /> : <></>}
        </React.Fragment>
    );
};
