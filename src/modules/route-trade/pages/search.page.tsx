import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchFilter } from '../components';
import { parseSearchPayload, stringifySearchPayload } from '../utils';

const PARAM_PAYLOAD = 'p';

export const SearchPage: React.FC = () => {
    const [params, setParams] = useSearchParams();

    const stringifiedPayload = params.get(PARAM_PAYLOAD);

    const payload = React.useMemo(() => {
        return parseSearchPayload(stringifiedPayload);
    }, [stringifiedPayload]);

    const setPayload = React.useCallback(
        (payload: API.SearchPayload) => {
            setParams({
                [PARAM_PAYLOAD]: stringifySearchPayload(payload),
            });
        },
        [setParams]
    );

    const handleSearch = React.useCallback(
        (payload: API.SearchPayload) => {
            setPayload(payload);
        },
        [setPayload]
    );

    return (
        <React.Fragment>
            <SearchFilter
                payload={payload}
                onSearch={handleSearch}
            />
        </React.Fragment>
    );
};
