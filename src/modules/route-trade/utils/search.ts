import { API } from '@sanctuaryteam/shared';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

type KEY =
    | keyof API.SearchPayload
    | keyof API.SearchPayload['query']
    | keyof API.SearchPayload['query']['item']
    | keyof API.SearchPayload['query']['seasonal']
    | keyof API.SearchPayload['query']['affix']
    | keyof API.SearchPayload['query']['affix']['options'][0]
    | keyof API.SearchPayload['sort'];

const TABLE: Record<KEY, string> = {
    query: 'q',
    sort: 's',
    item: 'i',
    seasonal: 's',
    affix: 'a',
    options: 'o',
    id: 'i',
    minValue: 'm',
    count: 'c',
    type: 't',
    minPower: 'p',
    maxRequiredLevel: 'l',
    classRestriction: 'c',
    socketType: 's',
    field: 'f',
    direction: 'd',
};

const REVERSE_TABLE: Record<string, KEY> = Object.fromEntries(
    Object.entries(TABLE).map(([k, v]) => [v, k as KEY])
);

export function parseSearchPayload(stringified: string): API.SearchPayload {
    if (!stringified?.length) {
        return {};
    }
    try {
        const minified = decompressFromEncodedURIComponent(stringified);
        const payload = JSON.parse(minified, (_, value: unknown) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                const replacement: Record<string, unknown> = {};
                for (const [k, v] of Object.entries(value)) {
                    const key = REVERSE_TABLE[k];
                    if (!key) {
                        console.warn(`Unknown key ${k} in minifed payload`);
                        continue;
                    }
                    replacement[key] = v;
                }
                return replacement;
            }
            return value;
        }) as API.SearchPayload;
        return payload;
    } catch (error) {
        console.warn('Failed to parse search payload', error);
        return {};
    }
}

export function stringifySearchPayload(payload: API.SearchPayload): string {
    const minified = JSON.stringify(payload, (_, value: unknown) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            const replacement: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(value)) {
                const key = TABLE[k as keyof typeof TABLE];
                if (!key) {
                    console.warn(`Unknown key ${k} in payload`);
                    continue;
                }
                replacement[key] = v;
            }
            return replacement;
        }
        return value;
    });
    return compressToEncodedURIComponent(minified);
}
