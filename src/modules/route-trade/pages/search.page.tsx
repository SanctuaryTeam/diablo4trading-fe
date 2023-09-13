import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SearchFilter } from '../components';

const PARAM_PAYLOAD = 'p';

export const SearchPage: React.FC = () => {
    const [params, setParams] = useSearchParams();

    const serializedPayload = params.get(PARAM_PAYLOAD) ?? '';
    const payload = React.useMemo(() => {
        return API.deserializeTradeSearchPayload(serializedPayload);
    }, [serializedPayload]);

    const [timestamp, setTimestamp] = React.useState<number>(NaN);

    const handleSearch = (payload: API.TradeSearchPayload) => {
        // Reset timestamp to force re-render
        setTimestamp(NaN);
        setParams({
            [PARAM_PAYLOAD]: API.serializeTradeSearchPayload(payload),
        });
    };

    return (
        <React.Fragment>
            <SearchFilter
                payload={payload}
                onSearch={handleSearch}
            />
            {serializedPayload?.length > 0 && (
                <Search
                    serializedPayload={serializedPayload}
                    timestamp={timestamp}
                    onTimestampChange={setTimestamp}
                />
            )}
        </React.Fragment>
    );
};
