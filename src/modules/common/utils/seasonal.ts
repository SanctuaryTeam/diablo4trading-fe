import { Game } from '@diablosnaps/common';

export function isSeasonal(
    serverType: Game.ServerType,
    itemType?: Game.ItemType,
) {
    if (
        !itemType
        || itemType !== Game.ItemType.Amulet
            && itemType !== Game.ItemType.Ring
    ) {
        return false;
    }
    return serverType === Game.ServerType.Seasonal
        || serverType === Game.ServerType.SeasonalHardcore;
}
