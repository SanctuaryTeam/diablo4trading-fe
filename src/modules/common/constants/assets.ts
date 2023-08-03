import itemSocketTypeIconDefensive from '@assets/game/2DUIItemComponents/1031070640.webp';
import itemSocketTypeIconUtility from '@assets/game/2DUIItemComponents/1031570266.webp';
import itemSocketTypeIconOffensive from '@assets/game/2DUIItemComponents/2364632900.webp';
import itemSocketTypeIconUniversal from '@assets/game/2DUIItemComponents/376327111.webp';
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

export const GAME_SPINNER_ICON = loadingSpinner;
