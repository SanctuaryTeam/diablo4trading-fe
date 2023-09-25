import { Game } from '@diablosnaps/common';
import { Common } from '@modules/common';
import { ListingNewItemFormValue } from './listing-new-3_item.types';

export function isListingNewItemFormValid(
    form: ListingNewItemFormValue,
    serverType?: Game.ServerType,
): boolean {
    const power = form.power ?? NaN;
    const requiredLevel = form.requiredLevel ?? NaN;

    if (!form.variant || !Object.values(Game.ItemVariant).includes(form.variant)) {
        return false;
    }
    if (!form.quality || !Object.values(Game.ItemQuality).includes(form.quality)) {
        return false;
    }
    if (!form.type || !Object.values(Game.ItemType).includes(form.type)) {
        return false;
    }
    if (isNaN(power) || power < 0 || power > 1000) {
        return false;
    }
    if (isNaN(requiredLevel) || requiredLevel < 0 || requiredLevel > 80) {
        return false;
    }
    if (form.classRestriction !== undefined && !Object.values(Game.Class).includes(form.classRestriction)) {
        return false;
    }

    // seasonal
    if (
        Common.isSeasonal(serverType, form.type)
        && (!form.socketType || !Object.values(Game.ItemSocketType).includes(form.socketType))
    ) {
        return false;
    }

    // affixes
    const isAffixValid = (affix: Partial<Game.ItemAffix>): boolean => {
        if (affix.id === undefined) {
            return false;
        }

        const value = affix.value ?? NaN;

        if (isNaN(value) || value < 0) {
            return false;
        }
        return true;
    };

    if (
        !form.inherentAffixes
        || (form.inherentAffixes.length === 0 || form.inherentAffixes.filter(isAffixValid).length < 1)
    ) {
        return false;
    }

    if (
        !form.affixes || (form.affixes.length === 0 || form.affixes.filter(isAffixValid).length < 2)
    ) {
        return false;
    }

    return true;
}
