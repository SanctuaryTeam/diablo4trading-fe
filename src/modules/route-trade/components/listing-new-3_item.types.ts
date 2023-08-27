import { Game } from '@diablosnaps/common';

export interface ListingNewItemFormAffix {
    id?: Game.AffixId;
    value?: number;
}

export interface ListingNewItemFormValue {
    variant?: Game.ItemVariant;
    quality?: Game.ItemQuality;
    type?: Game.ItemType;
    power?: number;
    requiredLevel?: number;
    classRestriction?: Game.Class;
    inherentAffixes?: Partial<Game.ItemAffix>[];
    affixes?: Partial<Game.ItemAffix>[];
    socketType?: Game.ItemSocketType;
}
