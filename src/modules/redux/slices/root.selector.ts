import { RootState } from './root';

export type RootSelector<T> = (state: RootState) => T;

export function createRootSelector<T>(selector: RootSelector<T>): RootSelector<T> {
    return (state: RootState) => selector(state);
}