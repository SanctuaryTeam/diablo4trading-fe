import { Game } from '@diablosnaps/common';
import { Common } from '@modules/common';
import { ListingNewItemFormValue } from './listing-new-3_item.types';

export function isListingNewItemFormValid(
    form: ListingNewItemFormValue,
    serverType: Game.ServerType,
): boolean {
    // item
    if (form.variant !== undefined && !Object.values(Game.ItemVariant).includes(form.variant)) {
        return false;
    }
    if (!Object.values(Game.ItemQuality).includes(form.quality)) {
        return false;
    }
    if (!Object.values(Game.ItemType).includes(form.type)) {
        return false;
    }
    if (isNaN(form.power) || form.power < 0 || form.power > 1000) {
        return false;
    }
    if (isNaN(form.requiredLevel) || form.requiredLevel < 0 || form.requiredLevel > 80) {
        return false;
    }
    if (form.classRestriction !== undefined && !Object.values(Game.Class).includes(form.classRestriction)) {
        return false;
    }

    // seasonal
    if (Common.isSeasonal(serverType, form.type)) {
        if (!Object.values(Game.ItemSocketType).includes(form.socketType)) {
            return false;
        }
    }

    // affixes
    const isAffixValid = (affix: Partial<Game.ItemAffix>): boolean => {
        if (affix.id === undefined) {
            return false;
        }
        if (isNaN(affix.value) || affix.value < 0) {
            return false;
        }
        return true;
    };
    if ((form.inherentAffixes || []).length === 0 || form.inherentAffixes.filter(isAffixValid).length < 1) {
        return false;
    }
    if ((form.affixes || []).length === 0 || form.affixes.filter(isAffixValid).length < 2) {
        return false;
    }

    return true;
}
