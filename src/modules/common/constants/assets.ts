import classIconBarbarian from '@assets/game/2DUI_ClassIcons/1080583445.webp';
import classIconSorcerer from '@assets/game/2DUI_ClassIcons/1081209621.webp';
import classIconDruid from '@assets/game/2DUI_ClassIcons/1302501686.webp';
import classIconNecromancer from '@assets/game/2DUI_ClassIcons/1313874421.webp';
import classIconRogue from '@assets/game/2DUI_ClassIcons/1318981920.webp';
import loadingSpinner from '@assets/game/2DUI_LoadingWidget/1264894272.webp';
import itemTypeIconHelm from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/2061009597.webp';
import itemTypeIconRing from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/2061373383.webp';
import itemTypeIconAmulet from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/2202388031.webp';
import itemTypeIconShield from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/2900456848.webp';
import itemTypeIconChestArmor from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/3580974264.webp';
import itemTypeIconBoots from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/3582054718.webp';
import itemTypeIconGloves from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/3588665509.webp';
import itemTypeIconLegs from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/3598153405.webp';
import itemTypeIconWeapon from '@assets/game/2DUI_PaperDoll_EmptySlotIcons/3602502790.webp';
import serverTypeSeasonal from '@assets/game/2DUI_Social_ServerType/1780021540.webp';
import serverTypeEternal from '@assets/game/2DUI_Social_ServerType/395747417.webp';
import serverTypeSeasonalHardcore from '@assets/game/2DUI_Social_ServerType/470588524.webp';
import serverTypeHardcore from '@assets/game/2DUI_Social_ServerType/904762742.webp';
import tooltipItemAmulet from '@assets/game/2DUI_TooltipItem_Amulet.webp';
import tooltipItemAxe from '@assets/game/2DUI_TooltipItem_Axe.webp';
import tooltipItemBoots from '@assets/game/2DUI_TooltipItem_Boots.webp';
import tooltipItemBow from '@assets/game/2DUI_TooltipItem_Bow.webp';
import tooltipItemChestArmor from '@assets/game/2DUI_TooltipItem_ChestArmor.webp';
import {
    default as tooltipItemCrossbow,
    default as tooltipItemCrossbow2H,
} from '@assets/game/2DUI_TooltipItem_Crossbow.webp';
import tooltipItemDagger from '@assets/game/2DUI_TooltipItem_Dagger.webp';
import tooltipItemFocus from '@assets/game/2DUI_TooltipItem_Focus.webp';
import tooltipItemGloves from '@assets/game/2DUI_TooltipItem_Gloves.webp';
import tooltipItemHelm from '@assets/game/2DUI_TooltipItem_Helm.webp';
import tooltipItemMace from '@assets/game/2DUI_TooltipItem_Mace.webp';
import tooltipItemLegs from '@assets/game/2DUI_TooltipItem_Pants.webp';
import tooltipItemPolearm from '@assets/game/2DUI_TooltipItem_Polearm.webp';
import tooltipItemRing from '@assets/game/2DUI_TooltipItem_Ring.webp';
import tooltipItemScythe from '@assets/game/2DUI_TooltipItem_Scythe.webp';
import tooltipItemShield from '@assets/game/2DUI_TooltipItem_Shield.webp';
import tooltipItemStaff from '@assets/game/2DUI_TooltipItem_Staff.webp';
import tooltipItemSword from '@assets/game/2DUI_TooltipItem_Sword.webp';
import tooltipItemAxe2H from '@assets/game/2DUI_TooltipItem_TwoHandedAxe.webp';
import tooltipItemMace2H from '@assets/game/2DUI_TooltipItem_TwoHandedMace.webp';
import tooltipItemScythe2H from '@assets/game/2DUI_TooltipItem_TwoHandedScythe.webp';
import tooltipItemSword2H from '@assets/game/2DUI_TooltipItem_TwoHandedSword.webp';
import tooltipItemWand from '@assets/game/2DUI_TooltipItem_Wand.webp';
import itemSocketTypeIconDefensive from '@assets/game/2DUIItemComponents/1031070640.webp';
import itemSocketTypeIconUtility from '@assets/game/2DUIItemComponents/1031570266.webp';
import itemSocketTypeIconOffensive from '@assets/game/2DUIItemComponents/2364632900.webp';
import itemSocketTypeIconUniversal from '@assets/game/2DUIItemComponents/376327111.webp';
import { Game } from '@diablosnaps/common';

export const GAME_SERVER_TYPE_ICONS: Record<Game.ServerType, string> = {
    [Game.ServerType.Eternal]: serverTypeEternal,
    [Game.ServerType.Hardcore]: serverTypeHardcore,
    [Game.ServerType.Seasonal]: serverTypeSeasonal,
    [Game.ServerType.SeasonalHardcore]: serverTypeSeasonalHardcore,
};

export const GAME_CLASS_ICONS: Record<Game.Class, string> = {
    [Game.Class.Barbarian]: classIconBarbarian,
    [Game.Class.Druid]: classIconDruid,
    [Game.Class.Necromancer]: classIconNecromancer,
    [Game.Class.Rogue]: classIconRogue,
    [Game.Class.Sorcerer]: classIconSorcerer,
};

export const GAME_ITEM_SOCKET_TYPE_ICONS: Record<Game.ItemSocketType, string> = {
    [Game.ItemSocketType.Utility]: itemSocketTypeIconUtility,
    [Game.ItemSocketType.Offensive]: itemSocketTypeIconOffensive,
    [Game.ItemSocketType.Defensive]: itemSocketTypeIconDefensive,
    [Game.ItemSocketType.Universal]: itemSocketTypeIconUniversal,
};

export const GAME_ITEM_TYPE_ICONS: Record<Game.ItemType, string> = {
    [Game.ItemType.Axe]: itemTypeIconWeapon,
    [Game.ItemType.Axe2H]: itemTypeIconWeapon,
    [Game.ItemType.Bow]: itemTypeIconWeapon,
    [Game.ItemType.Crossbow]: itemTypeIconWeapon,
    [Game.ItemType.Crossbow2H]: itemTypeIconWeapon,
    [Game.ItemType.Dagger]: itemTypeIconWeapon,
    [Game.ItemType.Focus]: itemTypeIconWeapon,
    [Game.ItemType.Mace]: itemTypeIconWeapon,
    [Game.ItemType.Mace2H]: itemTypeIconWeapon,
    [Game.ItemType.Scythe]: itemTypeIconWeapon,
    [Game.ItemType.Scythe2H]: itemTypeIconWeapon,
    [Game.ItemType.Staff]: itemTypeIconWeapon,
    [Game.ItemType.Sword]: itemTypeIconWeapon,
    [Game.ItemType.Sword2H]: itemTypeIconWeapon,
    [Game.ItemType.Polearm]: itemTypeIconWeapon,
    [Game.ItemType.Wand]: itemTypeIconWeapon,
    [Game.ItemType.Amulet]: itemTypeIconAmulet,
    [Game.ItemType.Boots]: itemTypeIconBoots,
    [Game.ItemType.ChestArmor]: itemTypeIconChestArmor,
    [Game.ItemType.Gloves]: itemTypeIconGloves,
    [Game.ItemType.Helm]: itemTypeIconHelm,
    [Game.ItemType.Legs]: itemTypeIconLegs,
    [Game.ItemType.Ring]: itemTypeIconRing,
    [Game.ItemType.Shield]: itemTypeIconShield,
};

export const GAME_ITEM_TYPE_TOOLTIP_ICONS: Record<Game.ItemType, string> = {
    [Game.ItemType.Axe]: tooltipItemAxe,
    [Game.ItemType.Axe2H]: tooltipItemAxe2H,
    [Game.ItemType.Bow]: tooltipItemBow,
    [Game.ItemType.Crossbow]: tooltipItemCrossbow,
    [Game.ItemType.Crossbow2H]: tooltipItemCrossbow2H,
    [Game.ItemType.Dagger]: tooltipItemDagger,
    [Game.ItemType.Focus]: tooltipItemFocus,
    [Game.ItemType.Mace]: tooltipItemMace,
    [Game.ItemType.Mace2H]: tooltipItemMace2H,
    [Game.ItemType.Scythe]: tooltipItemScythe,
    [Game.ItemType.Scythe2H]: tooltipItemScythe2H,
    [Game.ItemType.Staff]: tooltipItemStaff,
    [Game.ItemType.Sword]: tooltipItemSword,
    [Game.ItemType.Sword2H]: tooltipItemSword2H,
    [Game.ItemType.Polearm]: tooltipItemPolearm,
    [Game.ItemType.Wand]: tooltipItemWand,
    [Game.ItemType.Amulet]: tooltipItemAmulet,
    [Game.ItemType.Boots]: tooltipItemBoots,
    [Game.ItemType.ChestArmor]: tooltipItemChestArmor,
    [Game.ItemType.Gloves]: tooltipItemGloves,
    [Game.ItemType.Helm]: tooltipItemHelm,
    [Game.ItemType.Legs]: tooltipItemLegs,
    [Game.ItemType.Ring]: tooltipItemRing,
    [Game.ItemType.Shield]: tooltipItemShield,
};

export const GAME_SPINNER_ICON = loadingSpinner;
