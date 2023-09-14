import { Game } from '@diablosnaps/common';
import { ListingNewParamsFormValue } from './listing-new-2_params.types';

export const isListingNewParamsFormValid = (
    form: ListingNewParamsFormValue,
): boolean => form.language !== undefined && form.serverType !== undefined && Object.values(Game.Language).includes(form.language)
        && Object.values(Game.ServerType).includes(form.serverType);

