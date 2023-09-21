import { Game } from '@diablosnaps/common';

export interface ListingsDataGridRow {
    id: string;
    serverType: Game.ServerType;
    itemQuality: Game.ItemQuality;
    itemType?: Game.ItemType;
    itemTypeLine: string;
    itemPower?: number;
    itemAffixes: string[];
    expiresAt?: Date;
}

export type ListingsDataGridColumn = keyof ListingsDataGridRow;
