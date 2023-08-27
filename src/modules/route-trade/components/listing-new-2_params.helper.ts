import { Game } from '@diablosnaps/common';
import { ListingNewParamsFormValue } from './listing-new-2_params.types';

export function isListingNewParamsFormValid(
    form: ListingNewParamsFormValue,
): boolean {
    return Object.values(Game.Language).includes(form.language)
        && Object.values(Game.ServerType).includes(form.serverType);
}
