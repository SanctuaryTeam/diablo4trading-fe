export type StorageKey = 'auth';

export const STORAGE = {
    get: <T>(key: StorageKey) => {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item) as T;
        }
        return null;
    },
    set: <T>(key: StorageKey, value: T) => {
        const item = JSON.stringify(value);
        localStorage.setItem(key, item);
    },
};
