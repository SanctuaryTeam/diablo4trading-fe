import TooltipCommonBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Common.webp';
import TooltipMagicBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Magic.webp';
import TooltipRareBackground from '@assets/game/2DUI_TooltipBackgroundRarity_Rare.webp';
import TooltipBase from '@assets/game/2DUI_TooltipBase.webp';
import TooltipFrame from '@assets/game/2DUI_TooltipFrame.webp';
import TooltipHeaders from '@assets/game/2DUI_TooltipHeaders.webp';
import TooltipBulletPoint from '@assets/game/2DUIFontIcon/2627966652.webp';
import { Game } from '@diablosnaps/common';
import { styled } from '@mui/material/styles';
import reactStringReplace from 'react-string-replace';
import { GAME_ITEM_TYPE_TOOLTIP_ICONS } from '../constants';
import { useAssets } from '../providers';

function replaceVariables(
    template: string,
    variables: Record<string, string>,
) {
    return template
        .replace(/\{([^}]+)\}/g, (_, key: string) => {
            const value = variables[key.toLocaleLowerCase()];
            return value === undefined ? `{${key}}` : `${value}`;
        });
}

const Tooltip = styled('div')(({ theme }) => ({
    position: 'relative',
    zIndex: 0,
    margin: '16px',
    padding: '28px 24px',
    maxWidth: 324,

    color: theme.palette.item.text,
    fontSize: 18,
    lineHeight: '22px',
    textShadow: '0 0 2px #000',

    borderImage: `url(${TooltipBase}) 76 fill / 38px stretch`,
    '&::after, &::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
    },
    '&::after': {
        borderImage: `url(${TooltipFrame}) 124 / 62px / 12px round`,
    },

    '&::before': {
        zIndex: -1,
        borderImage: `url(${TooltipRareBackground}) 128 fill / 64px stretch`,
    },
    [`&[data-quality="${Game.ItemQuality.Magic}"]`]: {
        '&::before': {
            borderImage: `url(${TooltipMagicBackground}) 128 fill / 64px stretch`,
        },
    },
    [`&[data-quality="${Game.ItemQuality.Common}"]`]: {
        '&::before': {
            borderImage: `url(${TooltipCommonBackground}) 128 fill / 64px stretch`,
        },
    },

    '& ul': {
        margin: 0,
        padding: theme.spacing(0, 1),
        '& li': {
            listStyle: 'none',
            background: `url(${TooltipBulletPoint}) no-repeat 0 10px`,
            backgroundSize: 8,
            paddingLeft: 14,
            margin: '2px 0',
        },
    },
}));

const Icon = styled('div')(() => ({
    position: 'absolute',
    zIndex: 1,
    top: -6,
    right: 12,
    width: 70,
    height: 105,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
}));

const TypeLine = styled('div')(({ theme }) => ({
    fontSize: 22,
    lineHeight: '26px',
    color: theme.palette.item.rare,
    paddingRight: 64,
    [`&[data-quality="${Game.ItemQuality.Magic}"]`]: {
        color: theme.palette.item.magic,
    },
    [`&[data-quality="${Game.ItemQuality.Common}"]`]: {
        color: theme.palette.item.common,
    },
}));

const Power = styled('div')(() => ({}));

const Number = styled('span')(({ theme }) => ({
    color: theme.palette.item.number,
}));

const Separator = styled('div')(() => ({
    backgroundImage: `url(${TooltipHeaders})`,
    width: 276,
    maxWidth: '100%',
    height: 8,
    backgroundPositionY: -24,
    margin: '6px auto',
    '&[data-left]': {
        backgroundPositionY: -32,
        marginLeft: 0,
    },
}));

const Extras = styled('div')(() => ({
    fontSize: 16,
    lineHeight: '20px',
    textAlign: 'right',
    marginTop: 6,
}));

interface ItemTooltipProps {
    item: Game.Item;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({
    item,
}) => {
    const { language, translations, affixes } = useAssets();

    const label = Game.getItemTypeLine(
        // @ts-ignore
        item.variant, // Fix upstream
        item.quality,
        item.type,
        language,
        translations,
    );

    const highlightNumbers = (text: string) => {
        return reactStringReplace(text, /(\d+)/g, (value, index) => {
            return <Number key={index}>{value}</Number>;
        });
    };

    const itemPowerValue = String(isNaN(item.power ?? NaN) ? 1 : item.power);
    const itemPower = replaceVariables(translations[language]['UIItemPower'], {
        s1: itemPowerValue,
    }).trim();

    const requiredLevel = item.requiredLevel && item.requiredLevel > 0
        ? replaceVariables(translations[language]['RequiredLevel'], {
            value: `${item.requiredLevel}`,
        }).trim()
        : undefined;

    const classRestriction = item.classRestriction?.length ?? 0 > 0
        // @ts-ignore
        ? Game.getCharacterClassText(item.classRestriction, language, translations) // Fix upstream
        : undefined;

    const renderAffixes = (entries: Game.ItemAffix[]) => {
        return (
            <ul>
                {entries.map((entry, index) => {
                    const entryValue = isNaN(entry.value ?? NaN) ? '?' : `${entry.value}`;
                    const affixText = Game.getItemAffixText(
                        entry.id,
                        language,
                        Game.AffixType.Basic,
                        -1,
                        -1,
                        affixes,
                        entryValue,
                    ).replace(/\{([^}]+)\}/g, '#');
                    return <li key={index}>
                        {highlightNumbers(
                            affixText
                        )}
                    </li>
                })}
            </ul>
        );
    };

    return (
        <Tooltip data-quality={item.quality}>
            {item.type && (
                <Icon style={item.type && { backgroundImage: `url(${GAME_ITEM_TYPE_TOOLTIP_ICONS[item.type]})` }} />
            )}
            <TypeLine data-quality={item.quality}>{label}</TypeLine>
            <Power>{highlightNumbers(itemPower)}</Power>
            <Separator data-left />
            {item.inherentAffixes && item.inherentAffixes.length > 0 && (
                <>
                    {renderAffixes(item.inherentAffixes)}
                    <Separator />
                </>
            )}
            {item.affixes && item.affixes.length > 0 && renderAffixes(item.affixes)}
            {(requiredLevel !== undefined || classRestriction !== undefined) && (
                <Extras>
                    {requiredLevel !== undefined && <Number>{requiredLevel}</Number>}
                    {classRestriction !== undefined && <div>{classRestriction}</div>}
                </Extras>
            )}
        </Tooltip>
    );
};
